import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock3, UserCheck, Users, XCircle } from "lucide-react";
import { AdminResourcePage, type AdminResourceField } from "@/components/admin/admin-resource-page";
import { type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { api, type AdminRsvp, type AdminRsvpPayload } from "@/lib/api";

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

const formatEvents = (events: string[] | null) => {
  if (!events?.length) return "-";
  return events.map((event) => (event === "akad_nikah" ? "Akad Nikah" : "Resepsi")).join(", ");
};

const parseEvents = (value?: string) => (value ? value.split(",").filter(Boolean) : null);

const buildPayload = (form: Record<string, string>): AdminRsvpPayload => ({
  guest_name: form.guest_name,
  phone_number: form.phone_number || null,
  attendance_status: form.attendance_status === "not_attending" ? "not_attending" : "attending",
  events: parseEvents(form.events),
  total_attendees: Number(form.total_attendees || 1),
  notes: form.notes || null,
});

export function RsvpsPage() {
  const queryClient = useQueryClient();
  const { data: rsvps, isLoading } = useQuery({
    queryKey: ["admin-rsvps"],
    queryFn: api.adminRsvps,
  });

  const rows = rsvps ?? [];
  const attendingCount = rows.filter((rsvp) => rsvp.attendance_status === "attending").length;
  const notAttendingCount = rows.filter((rsvp) => rsvp.attendance_status === "not_attending").length;
  const totalGuests = rows.reduce((total, rsvp) => total + (rsvp.attendance_status === "attending" ? rsvp.total_attendees ?? 1 : 0), 0);

  const columns: AdminDataTableColumn<AdminRsvp>[] = [
    {
      header: "Nama Tamu",
      cell: (rsvp) => (
        <div>
          <p className="font-semibold text-slate-900">{rsvp.guest_name}</p>
          <p className="text-xs text-slate-500">{rsvp.phone_number || "-"}</p>
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
      header: "Acara",
      cell: (rsvp) => <span className="text-sm text-slate-600">{formatEvents(rsvp.events)}</span>,
    },
    {
      header: "Jumlah",
      cell: (rsvp) => `${rsvp.total_attendees ?? 1} orang`,
    },
    {
      header: "Masuk",
      cell: (rsvp) => <span className="text-sm text-slate-500">{formatDateTime(rsvp.created_at)}</span>,
    },
  ];

  const fields: AdminResourceField<AdminRsvp>[] = [
    { key: "guest_name", label: "Nama Tamu", required: true, placeholder: "Nama tamu" },
    { key: "phone_number", label: "Nomor WhatsApp", placeholder: "08xxxxxxxxxx" },
    {
      key: "attendance_status",
      label: "Status Kehadiran",
      type: "select",
      required: true,
      defaultValue: "attending",
      options: [
        { label: "Hadir", value: "attending" },
        { label: "Tidak Hadir", value: "not_attending" },
      ],
    },
    {
      key: "events",
      label: "Acara",
      type: "select",
      options: [
        { label: "Akad Nikah", value: "akad_nikah" },
        { label: "Resepsi", value: "resepsi" },
        { label: "Akad Nikah & Resepsi", value: "akad_nikah,resepsi" },
      ],
    },
    { key: "total_attendees", label: "Jumlah Tamu", type: "number", required: true, defaultValue: "1" },
    { key: "notes", label: "Ucapan / Catatan", type: "textarea", placeholder: "Pesan dari tamu" },
  ];

  return (
    <AdminResourcePage
      title="RSVPs"
      description="Kelola konfirmasi kehadiran tamu, jumlah tamu, dan catatan yang masuk."
      icon={Users}
      data={rows}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      searchPlaceholder="Cari nama, nomor, atau catatan..."
      emptyMessage="Belum ada data RSVP."
      getSearchText={(rsvp) => `${rsvp.guest_name} ${rsvp.phone_number ?? ""} ${rsvp.notes ?? ""} ${formatEvents(rsvp.events)}`}
      filters={[
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Hadir", value: "attending" },
            { label: "Tidak Hadir", value: "not_attending" },
          ],
          match: (rsvp, value) => rsvp.attendance_status === value,
        },
      ]}
      stats={[
        { title: "Total RSVP", value: rows.length, description: "Semua konfirmasi masuk.", icon: UserCheck, tone: "blue" },
        { title: "Hadir", value: attendingCount, description: "Tamu yang akan hadir.", icon: CheckCircle2, tone: "green" },
        { title: "Tidak Hadir", value: notAttendingCount, description: "Tamu yang berhalangan.", icon: XCircle, tone: "rose" },
        { title: "Total Tamu", value: totalGuests, description: "Akumulasi tamu hadir.", icon: Clock3, tone: "coral" },
      ]}
      createItem={async (form) => {
        const item = await api.createAdminRsvp(buildPayload(form));
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        return item;
      }}
      updateItem={async (row, form) => {
        const item = await api.updateAdminRsvp(row.id, buildPayload(form));
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        return item;
      }}
      deleteItem={async (row) => {
        await api.deleteAdminRsvp(row.id);
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
      }}
      detailFields={[
        { label: "Nama Tamu", value: (rsvp) => rsvp.guest_name },
        { label: "Nomor WhatsApp", value: (rsvp) => rsvp.phone_number || "-" },
        { label: "Status", value: (rsvp) => getStatusMeta(rsvp.attendance_status).label },
        { label: "Acara", value: (rsvp) => formatEvents(rsvp.events) },
        { label: "Jumlah Tamu", value: (rsvp) => `${rsvp.total_attendees ?? 1} orang` },
        { label: "Ucapan / Catatan", value: (rsvp) => rsvp.notes || "-" },
        { label: "Masuk", value: (rsvp) => formatDateTime(rsvp.created_at) },
      ]}
    />
  );
}
