import { Outlet } from "react-router-dom";
import { LanguageSwitcher } from "@/components/language-switcher";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Hera & Taufik</h1>
        <LanguageSwitcher />
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 pb-20">
        <Outlet />
      </main>
    </div>
  );
}
