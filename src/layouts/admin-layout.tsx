import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/store/auth-context";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  CalendarDays, 
  Users, 
  MessageSquareHeart, 
  Gift, 
  Image as ImageIcon,
  LogOut 
} from "lucide-react";

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Configuration', href: '/admin/config', icon: Settings },
  { name: 'Events', href: '/admin/events', icon: CalendarDays },
  { name: 'RSVPs', href: '/admin/rsvps', icon: Users },
  { name: 'Wishes', href: '/admin/wishes', icon: MessageSquareHeart },
  { name: 'Gifts & Banks', href: '/admin/gifts', icon: Gift },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-50 text-slate-900 w-full overflow-hidden">
        <Sidebar>
          <SidebarHeader className="h-16 flex items-center px-4 border-b">
            <h2 className="text-lg font-bold tracking-tight text-primary">Wedding Admin</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                        <Link to={item.href}>
                          <item.icon className="w-4 h-4 mr-2" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">{navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}</h1>
            </div>
            <Button variant="outline" asChild size="sm">
              <Link to="/">View Website</Link>
            </Button>
          </header>

          <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
            <div className="mx-auto max-w-6xl w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
