import { Link, Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-slate-900 p-4 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="font-semibold">Wedding Admin</h1>
          <Link to="/" className="text-sm underline">
            Back to Landing
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
