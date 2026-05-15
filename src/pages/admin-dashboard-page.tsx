import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquareHeart, CalendarDays, Gift } from "lucide-react";

export function AdminDashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [rsvps, wishes, events, gifts] = await Promise.all([
        supabase.from('rsvps').select('*', { count: 'exact', head: true }),
        supabase.from('wishes').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('gift_items').select('*', { count: 'exact', head: true })
      ]);

      return {
        rsvpsCount: rsvps.count || 0,
        wishesCount: wishes.count || 0,
        eventsCount: events.count || 0,
        giftsCount: gifts.count || 0,
      };
    }
  });

  const cards = [
    { title: "Total RSVPs", value: stats?.rsvpsCount || 0, icon: Users, color: "text-blue-500" },
    { title: "Wishes Received", value: stats?.wishesCount || 0, icon: MessageSquareHeart, color: "text-pink-500" },
    { title: "Events Scheduled", value: stats?.eventsCount || 0, icon: CalendarDays, color: "text-purple-500" },
    { title: "Gift Items", value: stats?.giftsCount || 0, icon: Gift, color: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent RSVPs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">List of recent RSVPs will appear here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Wishes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">List of recent wishes will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
