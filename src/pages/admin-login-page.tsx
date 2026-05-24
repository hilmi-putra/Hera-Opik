import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F8] px-4 py-8 font-sans">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-[#822935] hover:bg-[#F8E9E7]">
          <ArrowLeft className="h-4 w-4" />
          Website
        </Link>
        <div className="rounded-full border border-[#F8E9E7] bg-white px-2 py-1 text-sm font-bold text-[#822935] shadow-sm">
          <div className="h-6 w-6 rounded-full bg-[#822935] flex items-center justify-center">
            <img src="/icon.png" alt="logo" className="h-4 w-4 object-contain" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_420px]">
        <div className="hidden lg:block">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D65B4C]">Wedding Admin</p>
          <h1 className="mt-4 max-w-xl font-sans text-5xl font-bold tracking-tight text-[#822935]">
            Dashboard Wedding Admin
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            Masuk untuk mengatur RSVP, ucapan tamu, hadiah, galeri, dan konfigurasi acara dari satu panel yang rapi.
          </p>
        </div>

        <Card className="border-[#F8E9E7] bg-white shadow-xl shadow-[#822935]/5">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-950">Admin Login</h2>
              <p className="mt-2 text-sm text-slate-500">Sign in using your Laravel admin account.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    className="h-11 rounded-2xl border-[#F8E9E7] pl-10 focus-visible:ring-[#D65B4C]"
                    placeholder="admin@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    className="h-11 rounded-2xl border-[#F8E9E7] pl-10 focus-visible:ring-[#D65B4C]"
                    placeholder="********"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

              {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}

              <Button type="submit" disabled={submitting} className="h-11 w-full rounded-2xl bg-[#822935] text-white hover:bg-[#6F2130]">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
