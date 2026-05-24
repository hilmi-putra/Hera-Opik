import { useQuery } from "@tanstack/react-query";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminWish } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export function WishesPage() {
  const { data: wishes, isLoading } = useQuery({
    queryKey: ["admin-wishes"],
    queryFn: api.adminWishes,
  });

  const columns: AdminDataTableColumn<AdminWish>[] = [
    {
      header: "Nama",
      cell: (wish) => <p className="font-medium">{wish.guest_name}</p>,
    },
    {
      header: "Ucapan",
      cell: (wish) => <p className="line-clamp-3 max-w-xl text-sm text-muted-foreground">{wish.message}</p>,
    },
    {
      header: "Status",
      cell: (wish) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${wish.attendance_status === "attending" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200"}`}>
          {wish.attendance_status === "attending" ? "Hadir" : "Tidak Hadir"}
        </span>
      ),
    },
    {
      header: "Masuk",
      cell: (wish) => <span className="text-sm text-muted-foreground">{formatDateTime(wish.created_at)}</span>,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishes</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminDataTable columns={columns} data={wishes} emptyMessage="Belum ada ucapan." isLoading={isLoading} initialPageSize={10} />
      </CardContent>
    </Card>
  );
}
