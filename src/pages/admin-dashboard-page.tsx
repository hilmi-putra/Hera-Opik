import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Gift, MessageSquareHeart, Users } from "lucide-react";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminRsvp, type AdminWish } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getAttendanceLabel = (status: string) => {
  if (status === "attending") return "Hadir";
  if (status === "declined" || status === "not_attending") return "Tidak Hadir";
  return "Pending";
};

const getAttendanceClass = (status: string) => {
  if (status === "attending") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "declined" || status === "not_attending") return "bg-rose-50 text-rose-700 ring-rose-200";
  return "bg-amber-50 text-amber-700 ring-amber-200";
};

export function AdminDashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const dashboard = await api.dashboard();
      return dashboard.stats;
    },
  });

  const { data: recentRsvps, isLoading: isRsvpsLoading } = useQuery({
    queryKey: ["dashboard-recent-rsvps"],
    queryFn: async () => {
      const dashboard = await api.dashboard();
      return dashboard.recentRsvps;
    },
  });

  const { data: recentWishes, isLoading: isWishesLoading } = useQuery({
    queryKey: ["dashboard-recent-wishes"],
    queryFn: async () => {
      const dashboard = await api.dashboard();
      return dashboard.recentWishes;
    },
  });

  const cards = [
    { title: "Total RSVPs", value: stats?.rsvpsCount || 0, icon: Users, color: "text-blue-500" },
    { title: "Wishes Received", value: stats?.wishesCount || 0, icon: MessageSquareHeart, color: "text-pink-500" },
    { title: "Events Scheduled", value: stats?.eventsCount || 0, icon: CalendarDays, color: "text-purple-500" },
    { title: "Gift Items", value: stats?.giftsCount || 0, icon: Gift, color: "text-green-500" },
  ];

  const rsvpColumns: AdminDataTableColumn<AdminRsvp>[] = [
    {
      header: "Nama",
      cell: (rsvp) => (
        <div>
          <p className="font-medium">{rsvp.guest_name}</p>
          {rsvp.notes && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{rsvp.notes}</p>}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (rsvp) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getAttendanceClass(rsvp.attendance_status)}`}>
          {getAttendanceLabel(rsvp.attendance_status)}
        </span>
      ),
    },
    {
      header: "Tamu",
      cell: (rsvp) => rsvp.total_attendees ?? 1,
    },
    {
      header: "Masuk",
      cell: (rsvp) => <span className="text-sm text-muted-foreground">{formatDateTime(rsvp.created_at)}</span>,
    },
  ];

  const wishColumns: AdminDataTableColumn<AdminWish>[] = [
    {
      header: "Nama",
      cell: (wish) => <p className="font-medium">{wish.guest_name}</p>,
    },
    {
      header: "Ucapan",
      cell: (wish) => <p className="line-clamp-3 max-w-md text-sm text-muted-foreground">{wish.message}</p>,
    },
    {
      header: "Status",
      cell: (wish) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getAttendanceClass(wish.attendance_status)}`}>
          {getAttendanceLabel(wish.attendance_status)}
        </span>
      ),
    },
    {
      header: "Masuk",
      cell: (wish) => <span className="text-sm text-muted-foreground">{formatDateTime(wish.created_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
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

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent RSVPs</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminDataTable
              columns={rsvpColumns}
              data={recentRsvps}
              emptyMessage="Belum ada RSVP."
              isLoading={isRsvpsLoading}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Wishes</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminDataTable
              columns={wishColumns}
              data={recentWishes}
              emptyMessage="Belum ada ucapan."
              isLoading={isWishesLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
