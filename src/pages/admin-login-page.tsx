import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth-context";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signInWithPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await signInWithPassword(email, password);
      if (result.error) {
        setError(result.error);
        return;
      }
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold">Admin Login</h1>
      <p className="mt-1 text-sm text-slate-600">Sign in using your Supabase account.</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          className="w-full rounded-md border px-3 py-2"
          placeholder="admin@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full rounded-md border px-3 py-2"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={submitting} className="w-full rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-60">
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
