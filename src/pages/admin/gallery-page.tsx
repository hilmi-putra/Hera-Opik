import { useQuery } from "@tanstack/react-query";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminGalleryItem } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export function GalleryPage() {
  const { data: gallery, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: api.adminGallery,
  });

  const columns: AdminDataTableColumn<AdminGalleryItem>[] = [
    {
      header: "Media",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-md bg-slate-100">
            <img src={item.media_url} alt={item.caption_id || "Gallery media"} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-medium">{item.caption_id || "-"}</p>
            <p className="max-w-xs truncate text-xs text-muted-foreground">{item.media_url}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Tipe",
      cell: (item) => item.media_type || "image",
    },
    {
      header: "Status",
      cell: (item) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${item.is_active === false ? "bg-slate-50 text-slate-700 ring-slate-200" : "bg-emerald-50 text-emerald-700 ring-emerald-200"}`}>
          {item.is_active === false ? "Nonaktif" : "Aktif"}
        </span>
      ),
    },
    {
      header: "Urutan",
      cell: (item) => item.sort_order ?? 0,
    },
    {
      header: "Dibuat",
      cell: (item) => <span className="text-sm text-muted-foreground">{formatDateTime(item.created_at)}</span>,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminDataTable columns={columns} data={gallery} emptyMessage="Belum ada media gallery." isLoading={isLoading} initialPageSize={10} />
      </CardContent>
    </Card>
  );
}
