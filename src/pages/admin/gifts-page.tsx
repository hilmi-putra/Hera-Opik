import { useQuery } from "@tanstack/react-query";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminGift } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const formatCurrency = (value: number | null) =>
  typeof value === "number"
    ? new Intl.NumberFormat("id-ID", { currency: "IDR", style: "currency", maximumFractionDigits: 0 }).format(value)
    : "-";

export function GiftsPage() {
  const { data: gifts, isLoading } = useQuery({
    queryKey: ["admin-gifts"],
    queryFn: api.adminGifts,
  });

  const columns: AdminDataTableColumn<AdminGift>[] = [
    {
      header: "Hadiah",
      cell: (gift) => (
        <div>
          <p className="font-medium">{gift.product_name}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">{gift.description || "-"}</p>
        </div>
      ),
    },
    {
      header: "Estimasi",
      cell: (gift) => <span className="font-medium">{formatCurrency(gift.price)}</span>,
    },
    {
      header: "Status",
      cell: (gift) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${gift.availability_status === "fully_claimed" ? "bg-rose-50 text-rose-700 ring-rose-200" : "bg-emerald-50 text-emerald-700 ring-emerald-200"}`}>
          {gift.availability_status === "fully_claimed" ? "Habis" : "Tersedia"}
        </span>
      ),
    },
    {
      header: "Diklaim Oleh",
      cell: (gift) => <span className="text-sm text-muted-foreground">{gift.claimed_by || "-"}</span>,
    },
    {
      header: "Dibuat",
      cell: (gift) => <span className="text-sm text-muted-foreground">{formatDateTime(gift.created_at)}</span>,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gifts Management</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminDataTable columns={columns} data={gifts} emptyMessage="Belum ada data hadiah." isLoading={isLoading} initialPageSize={10} />
      </CardContent>
    </Card>
  );
}
