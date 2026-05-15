import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { AuthState, AppRole } from "@/types/auth";
import { supabase } from "@/lib/supabase";

interface AuthContextValue extends AuthState {
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchRole(userId: string): Promise<AppRole> {
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single();
  if (error) return "guest";
  return (data?.role as AppRole) ?? "guest";
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({ user: null, role: null, loading: true });

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase Auth Error:", error.message);
        }
        
        const user = data?.session?.user ?? null;
        if (!user) {
          setState({ user: null, role: null, loading: false });
          return;
        }
        
        const role = await fetchRole(user.id);
        setState({ user, role, loading: false });
      } catch (err) {
        console.error("Unexpected Auth Error:", err);
        setState({ user: null, role: null, loading: false });
      }
    };

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_, session) => {
      try {
        const user = session?.user ?? null;
        if (!user) {
          setState({ user: null, role: null, loading: false });
          return;
        }
        const role = await fetchRole(user.id);
        setState({ user, role, loading: false });
      } catch (err) {
        console.error("Unexpected Auth State Change Error:", err);
        setState({ user: null, role: null, loading: false });
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signInWithPassword: async (email, password) => {
        try {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) return { error: error.message };
          return {};
        } catch (err: any) {
          console.error("Sign in error:", err);
          return { error: err?.message || "An unexpected error occurred during sign in." };
        }
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
      refreshRole: async () => {
        if (!state.user) return;
        const role = await fetchRole(state.user.id);
        setState((prev) => ({ ...prev, role }));
      },
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
