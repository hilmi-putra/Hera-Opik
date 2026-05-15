import type { User } from "@supabase/supabase-js";

export type AppRole = "admin" | "guest" | null;

export interface AuthState {
  user: User | null;
  role: AppRole;
  loading: boolean;
}
