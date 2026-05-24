import type { AdminUser } from "@/lib/api";

export type AppRole = "admin" | "guest" | null;

export interface AuthState {
  user: AdminUser | null;
  role: AppRole;
  loading: boolean;
}
