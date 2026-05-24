import { useMemo, useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  Gift,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareHeart,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/store/auth-context";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Configuration", href: "/admin/config", icon: Settings },
  { name: "Events", href: "/admin/events", icon: CalendarDays },
  { name: "RSVPs", href: "/admin/rsvps", icon: Users },
  { name: "Wishes", href: "/admin/wishes", icon: MessageSquareHeart },
  { name: "Gifts & Banks", href: "/admin/gifts", icon: Gift },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === "/admin") return pathname === href;
  return pathname.startsWith(href);
};

type AdminNavProps = {
  pathname: string;
  onNavigate?: () => void;
};

function AdminNav({ pathname, onNavigate }: AdminNavProps) {
  return (
    <nav className="space-y-1.5">
      {navigation.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition-colors",
              active
                ? "bg-[#822935] text-white shadow-sm shadow-[#822935]/10"
                : "text-slate-600 hover:bg-[#F8E9E7] hover:text-[#822935]"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentPage = useMemo(
    () => navigation.find((item) => isActivePath(location.pathname, item.href)) ?? navigation[0],
    [location.pathname]
  );

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-[#FDF9F8] font-sans text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-[#F8E9E7] bg-white/95 px-4 py-5 shadow-sm lg:flex">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#822935] p-1">
            <img src="/icon.png" alt="logo" className="h-8 w-8 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#822935]">Dashboard Wedding Admin</p>
          </div>
        </div>

        <div className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D65B4C]">Management</div>
        <AdminNav pathname={location.pathname} />

        <div className="mt-auto space-y-3 rounded-3xl bg-[#F8E9E7]/55 p-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="h-10 w-full justify-start rounded-2xl px-3 text-[#822935] hover:bg-white hover:text-[#822935]"
            onClick={() => void signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-75 border-[#F8E9E7] bg-white p-0">
          <div className="flex h-full flex-col px-4 py-5">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <div className="mb-8 flex items-center gap-3 px-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#822935] p-1">
                <img src="/icon.png" alt="logo" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#822935]">Dashboard Wedding Admin</p>
              </div>
            </div>
            <AdminNav pathname={location.pathname} onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[#F8E9E7] bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-2xl text-[#822935] hover:bg-[#F8E9E7] lg:hidden"
                onClick={() => setMobileNavOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="truncate font-sans text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                  {currentPage.name}
                </h1>
                <p className="hidden text-xs font-medium text-slate-500 sm:block">Kelola undangan digital dengan data yang rapi.</p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-10 rounded-2xl border-[#F8E9E7] bg-white px-3 text-[#822935] hover:bg-[#F8E9E7] sm:px-4"
            >
              <Link to="/">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View Website</span>
              </Link>
            </Button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] bg-[#FDF9F8] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
