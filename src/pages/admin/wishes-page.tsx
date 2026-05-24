import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, MessageCircleHeart, MessageSquareHeart, XCircle } from "lucide-react";
import { AdminResourcePage, type AdminResourceField } from "@/components/admin/admin-resource-page";
import { type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { api, type AdminWish, type AdminWishPayload } from "@/lib/api";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getAttendanceMeta = (status: string) => {
  if (status === "attending") return { label: "Hadir", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  return { label: "Tidak Hadir", className: "bg-rose-50 text-rose-700 ring-rose-200" };
};

const buildPayload = (form: Record<string, string>): AdminWishPayload => ({
  guest_name: form.guest_name,
  message: form.message,
  attendance_status: form.attendance_status === "not_attending" ? "not_attending" : "attending",
});

export function WishesPage() {
  const queryClient = useQueryClient();
  const { data: wishes, isLoading } = useQuery({
    queryKey: ["admin-wishes"],
    queryFn: api.adminWishes,
  });

  const rows = wishes ?? [];
  const attendingCount = rows.filter((wish) => wish.attendance_status === "attending").length;
  const notAttendingCount = rows.filter((wish) => wish.attendance_status !== "attending").length;

  const columns: AdminDataTableColumn<AdminWish>[] = [
    {
      header: "Nama",
      cell: (wish) => <p className="font-semibold text-slate-900">{wish.guest_name}</p>,
    },
    {
      header: "Ucapan",
      cell: (wish) => <p className="line-clamp-3 max-w-xl text-sm leading-6 text-slate-500">{wish.message}</p>,
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

  const fields: AdminResourceField<AdminWish>[] = [
    { key: "guest_name", label: "Nama Tamu", required: true, placeholder: "Nama tamu" },
    {
      key: "attendance_status",
      label: "Status Kehadiran",
      type: "select",
      defaultValue: "attending",
      required: true,
      options: [
        { label: "Hadir", value: "attending" },
        { label: "Tidak Hadir", value: "not_attending" },
      ],
    },
    { key: "message", label: "Ucapan", type: "textarea", required: true, placeholder: "Tulis ucapan tamu" },
  ];

  return (
    <AdminResourcePage
      title="Wishes"
      description="Moderasi dan kelola ucapan yang tampil pada section Wedding Wishes."
      icon={MessageSquareHeart}
      data={rows}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      searchPlaceholder="Cari nama atau isi ucapan..."
      emptyMessage="Belum ada ucapan."
      getSearchText={(wish) => `${wish.guest_name} ${wish.message}`}
      filters={[
        {
          key: "attendance",
          label: "Status",
          options: [
            { label: "Hadir", value: "attending" },
            { label: "Tidak Hadir", value: "not_attending" },
          ],
          match: (wish, value) => wish.attendance_status === value,
        },
      ]}
      stats={[
        { title: "Total Ucapan", value: rows.length, description: "Ucapan dari semua tamu.", icon: MessageCircleHeart, tone: "rose" },
        { title: "Tamu Hadir", value: attendingCount, description: "Ucapan dari tamu hadir.", icon: CheckCircle2, tone: "green" },
        { title: "Berhalangan", value: notAttendingCount, description: "Ucapan dari tamu tidak hadir.", icon: XCircle, tone: "coral" },
      ]}
      createItem={async (form) => {
        const item = await api.createAdminWish(buildPayload(form));
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        queryClient.invalidateQueries({ queryKey: ["admin-rsvps"] });
        return item;
      }}
      updateItem={async (row, form) => {
        const item = await api.updateAdminWish(row.id, buildPayload(form));
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        queryClient.invalidateQueries({ queryKey: ["admin-rsvps"] });
        return item;
      }}
      deleteItem={async (row) => {
        await api.deleteAdminWish(row.id);
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        queryClient.invalidateQueries({ queryKey: ["admin-rsvps"] });
      }}
      detailFields={[
        { label: "Nama Tamu", value: (wish) => wish.guest_name },
        { label: "Status", value: (wish) => getAttendanceMeta(wish.attendance_status).label },
        { label: "Ucapan", value: (wish) => wish.message },
        { label: "Masuk", value: (wish) => formatDateTime(wish.created_at) },
      ]}
    />
  );
}
