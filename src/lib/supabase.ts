import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Keep app booting for local UI work while showing missing env state in the dashboard.
  console.warn("Supabase environment variables are missing.");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
