import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Gift, MessageSquareHeart, Users } from "lucide-react";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminRsvp, type AdminWish } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getAttendanceMeta = (status: string) => {
  if (status === "attending") return { label: "Hadir", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  if (status === "declined" || status === "not_attending") return { label: "Tidak Hadir", className: "bg-rose-50 text-rose-700 ring-rose-200" };
  return { label: "Pending", className: "bg-amber-50 text-amber-700 ring-amber-200" };
};

export function AdminDashboardPage() {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: api.dashboard,
  });

  const stats = dashboard?.stats;
  const recentRsvps = dashboard?.recentRsvps ?? [];
  const recentWishes = dashboard?.recentWishes ?? [];

  const rsvpColumns: AdminDataTableColumn<AdminRsvp>[] = [
    {
      header: "Nama",
      cell: (rsvp) => (
        <div>
          <p className="font-semibold text-slate-900">{rsvp.guest_name}</p>
          {rsvp.notes && <p className="mt-1 line-clamp-2 text-xs text-slate-500">{rsvp.notes}</p>}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (rsvp) => {
        const status = getAttendanceMeta(rsvp.attendance_status);
        return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>;
      },
    },
    {
      header: "Tamu",
      cell: (rsvp) => `${rsvp.total_attendees ?? 1} orang`,
    },
    {
      header: "Masuk",
      cell: (rsvp) => <span className="text-sm text-slate-500">{formatDateTime(rsvp.created_at)}</span>,
    },
  ];

  const wishColumns: AdminDataTableColumn<AdminWish>[] = [
    {
      header: "Nama",
      cell: (wish) => <p className="font-semibold text-slate-900">{wish.guest_name}</p>,
    },
    {
      header: "Ucapan",
      cell: (wish) => <p className="line-clamp-3 max-w-md text-sm text-slate-500">{wish.message}</p>,
    },
    {
      header: "Status",
      cell: (wish) => {
        const status = getAttendanceMeta(wish.attendance_status);
        return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>;
      },
    },
    {
      header: "Masuk",
      cell: (wish) => <span className="text-sm text-slate-500">{formatDateTime(wish.created_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[#F8E9E7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D65B4C]">Overview</p>
            <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-[#822935]">Admin Dashboard</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Pantau RSVP, ucapan, acara, dan hadiah dari satu layar yang ringan dan mudah dibaca.
          </p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard title="Total RSVPs" value={stats?.rsvpsCount ?? 0} description="Semua konfirmasi yang masuk." icon={Users} tone="blue" />
        <AdminStatCard title="Wishes Received" value={stats?.wishesCount ?? 0} description="Ucapan yang ditulis tamu." icon={MessageSquareHeart} tone="rose" />
        <AdminStatCard title="Events Scheduled" value={stats?.eventsCount ?? 0} description="Agenda acara aktif." icon={CalendarDays} tone="coral" />
        <AdminStatCard title="Gift Items" value={stats?.giftsCount ?? 0} description="Rekomendasi hadiah tersedia." icon={Gift} tone="green" />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="border-[#F8E9E7] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-sans text-lg font-bold text-slate-950">Recent RSVPs</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminDataTable
              columns={rsvpColumns}
              data={recentRsvps}
              emptyMessage="Belum ada RSVP."
              isLoading={isLoading}
              initialPageSize={5}
              rowKey={(row) => row.id}
            />
          </CardContent>
        </Card>

        <Card className="border-[#F8E9E7] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-sans text-lg font-bold text-slate-950">Recent Wishes</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminDataTable
              columns={wishColumns}
              data={recentWishes}
              emptyMessage="Belum ada ucapan."
              isLoading={isLoading}
              initialPageSize={5}
              rowKey={(row) => row.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
