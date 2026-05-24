import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { api, adminTokenStorage } from "@/lib/api";
import type { AuthState } from "@/types/auth";

interface AuthContextValue extends AuthState {
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({ user: null, role: null, loading: true });

  const loadCurrentUser = async () => {
    const token = adminTokenStorage.get();
    if (!token) {
      setState({ user: null, role: null, loading: false });
      return;
    }

    try {
      const user = await api.me();
      setState({ user, role: user.role, loading: false });
    } catch {
      adminTokenStorage.clear();
      setState({ user: null, role: null, loading: false });
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signInWithPassword: async (email, password) => {
        try {
          const { token, user } = await api.login(email, password);
          adminTokenStorage.set(token);
          setState({ user, role: user.role, loading: false });
          return {};
        } catch (err: any) {
          return { error: err?.message || "Login gagal. Silakan coba lagi." };
        }
      },
      signOut: async () => {
        try {
          await api.logout();
        } catch {
          // Local token cleanup is still required when the backend is unavailable.
        } finally {
          adminTokenStorage.clear();
          setState({ user: null, role: null, loading: false });
        }
      },
      refreshRole: loadCurrentUser,
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
