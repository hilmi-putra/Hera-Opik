import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, Image as ImageIcon, Images } from "lucide-react";
import { AdminResourcePage, type AdminResourceField } from "@/components/admin/admin-resource-page";
import { type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { api, type AdminGalleryItem } from "@/lib/api";

const FALLBACK_IMAGE = "/images/CMZ_4069.jpg";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const buildGalleryItem = (form: Record<string, string>, current?: AdminGalleryItem): AdminGalleryItem => ({
  id: current?.id ?? Date.now(),
  media_url: form.media_url || FALLBACK_IMAGE,
  media_type: form.media_type || "image",
  caption_id: form.caption_id || null,
  is_active: form.is_active !== "false",
  sort_order: Number(form.sort_order || 1),
  created_at: current?.created_at ?? new Date().toISOString(),
});

export function GalleryPage() {
  const { data: gallery, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: api.adminGallery,
  });

  const rows = gallery ?? [];
  const activeCount = rows.filter((item) => item.is_active !== false).length;
  const inactiveCount = rows.length - activeCount;

  const columns: AdminDataTableColumn<AdminGalleryItem>[] = [
    {
      header: "Media",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-2xl bg-[#F8E9E7]">
            <img src={item.media_url || FALLBACK_IMAGE} alt={item.caption_id || "Gallery media"} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">{item.caption_id || "Untitled"}</p>
            <p className="max-w-xs truncate text-xs text-slate-500">{item.media_url}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Tipe",
      cell: (item) => <span className="capitalize text-slate-600">{item.media_type || "image"}</span>,
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
      cell: (item) => <span className="text-sm text-slate-500">{formatDateTime(item.created_at)}</span>,
    },
  ];

  const fields: AdminResourceField<AdminGalleryItem>[] = [
    { key: "media_url", label: "URL Media", type: "url", required: true, placeholder: "/Gallery/CMZ_4069.jpg" },
    {
      key: "media_type",
      label: "Tipe Media",
      type: "select",
      defaultValue: "image",
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
      ],
    },
    { key: "caption_id", label: "Caption", placeholder: "Portrait 1" },
    {
      key: "is_active",
      label: "Status",
      type: "select",
      defaultValue: "true",
      options: [
        { label: "Aktif", value: "true" },
        { label: "Nonaktif", value: "false" },
      ],
    },
    { key: "sort_order", label: "Urutan", type: "number", defaultValue: "1" },
  ];

  return (
    <AdminResourcePage
      title="Gallery"
      description="Kelola media galeri, caption, status aktif, dan urutan tampilan."
      icon={Images}
      data={rows}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      searchPlaceholder="Cari caption, url, atau tipe media..."
      emptyMessage="Belum ada media gallery."
      getSearchText={(item) => `${item.caption_id ?? ""} ${item.media_url} ${item.media_type}`}
      filters={[
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Aktif", value: "active" },
            { label: "Nonaktif", value: "inactive" },
          ],
          match: (item, value) => (value === "active" ? item.is_active !== false : item.is_active === false),
        },
      ]}
      stats={[
        { title: "Total Media", value: rows.length, description: "Semua item galeri.", icon: ImageIcon, tone: "coral" },
        { title: "Aktif", value: activeCount, description: "Tampil di undangan.", icon: Eye, tone: "green" },
        { title: "Nonaktif", value: inactiveCount, description: "Disimpan sebagai draft.", icon: EyeOff, tone: "rose" },
      ]}
      createItem={(form) => buildGalleryItem(form)}
      updateItem={(row, form) => buildGalleryItem(form, row)}
      detailFields={[
        { label: "Caption", value: (item) => item.caption_id || "-" },
        { label: "URL Media", value: (item) => item.media_url },
        { label: "Tipe", value: (item) => item.media_type },
        { label: "Status", value: (item) => (item.is_active === false ? "Nonaktif" : "Aktif") },
        { label: "Urutan", value: (item) => item.sort_order },
        { label: "Dibuat", value: (item) => formatDateTime(item.created_at) },
      ]}
    />
  );
}
