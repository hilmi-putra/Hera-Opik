import { useQuery } from "@tanstack/react-query";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminRsvp } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getStatusMeta = (status: string) => {
  if (status === "attending") return { label: "Hadir", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  if (status === "declined" || status === "not_attending") return { label: "Tidak Hadir", className: "bg-rose-50 text-rose-700 ring-rose-200" };
  return { label: "Pending", className: "bg-amber-50 text-amber-700 ring-amber-200" };
};

export function RsvpsPage() {
  const { data: rsvps, isLoading } = useQuery({
    queryKey: ["admin-rsvps"],
    queryFn: api.adminRsvps,
  });

  const columns: AdminDataTableColumn<AdminRsvp>[] = [
    {
      header: "Nama Tamu",
      cell: (rsvp) => (
        <div>
          <p className="font-medium">{rsvp.guest_name}</p>
          <p className="text-xs text-muted-foreground">{rsvp.phone_number || "-"}</p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (rsvp) => {
        const status = getStatusMeta(rsvp.attendance_status);
        return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>;
      },
    },
    {
      header: "Jumlah",
      cell: (rsvp) => `${rsvp.total_attendees ?? 1} orang`,
    },
    {
      header: "Ucapan",
      cell: (rsvp) => <p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">{rsvp.notes || "-"}</p>,
    },
    {
      header: "Masuk",
      cell: (rsvp) => <span className="text-sm text-muted-foreground">{formatDateTime(rsvp.created_at)}</span>,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>RSVPs</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminDataTable columns={columns} data={rsvps} emptyMessage="Belum ada data RSVP." isLoading={isLoading} initialPageSize={10} />
      </CardContent>
    </Card>
  );
}
