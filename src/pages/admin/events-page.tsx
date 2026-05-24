import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, CalendarDays, Clock3, MapPin } from "lucide-react";
import { AdminResourcePage, type AdminResourceField } from "@/components/admin/admin-resource-page";
import { type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { api, type AdminEvent } from "@/lib/api";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date(value));

const buildEvent = (form: Record<string, string>, current?: AdminEvent): AdminEvent => ({
  id: current?.id ?? `${form.title_id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
  title_id: form.title_id,
  event_date: form.event_date,
  start_time: form.start_time,
  end_time: form.end_time || null,
  venue_name: form.venue_name,
  is_main_event: form.is_main_event !== "false",
  sort_order: Number(form.sort_order || 1),
});

export function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: api.adminEvents,
  });

  const rows = events ?? [];
  const mainEvents = rows.filter((event) => event.is_main_event).length;
  const venues = new Set(rows.map((event) => event.venue_name)).size;
  const nextEvent = rows
    .slice()
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .find((event) => new Date(event.event_date).getTime() >= Date.now());

  const columns: AdminDataTableColumn<AdminEvent>[] = [
    {
      header: "Acara",
      cell: (event) => (
        <div>
          <p className="font-semibold text-slate-900">{event.title_id}</p>
          <p className="text-xs text-slate-500">{event.venue_name}</p>
        </div>
      ),
    },
    {
      header: "Tanggal",
      cell: (event) => <span className="text-sm text-slate-500">{formatDate(event.event_date)}</span>,
    },
    {
      header: "Waktu",
      cell: (event) => `${event.start_time}${event.end_time ? ` - ${event.end_time}` : ""}`,
    },
    {
      header: "Status",
      cell: (event) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${event.is_main_event ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-50 text-slate-700 ring-slate-200"}`}>
          {event.is_main_event ? "Main Event" : "Supporting"}
        </span>
      ),
    },
  ];

  const fields: AdminResourceField<AdminEvent>[] = [
    { key: "title_id", label: "Nama Acara", required: true, placeholder: "Akad Nikah" },
    { key: "event_date", label: "Tanggal", type: "date", required: true },
    { key: "start_time", label: "Jam Mulai", type: "time", required: true },
    { key: "end_time", label: "Jam Selesai", type: "time" },
    { key: "venue_name", label: "Venue", required: true, placeholder: "Nama venue" },
    {
      key: "is_main_event",
      label: "Jenis Acara",
      type: "select",
      defaultValue: "true",
      options: [
        { label: "Main Event", value: "true" },
        { label: "Supporting", value: "false" },
      ],
    },
    { key: "sort_order", label: "Urutan", type: "number", defaultValue: "1" },
  ];

  return (
    <AdminResourcePage
      title="Events"
      description="Atur jadwal, venue, dan urutan acara yang tampil pada undangan."
      icon={CalendarDays}
      data={rows}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      searchPlaceholder="Cari acara, venue, atau tanggal..."
      emptyMessage="Belum ada data acara."
      getSearchText={(event) => `${event.title_id} ${event.venue_name} ${event.event_date}`}
      filters={[
        {
          key: "type",
          label: "Jenis",
          options: [
            { label: "Main Event", value: "main" },
            { label: "Supporting", value: "supporting" },
          ],
          match: (event, value) => (value === "main" ? event.is_main_event : !event.is_main_event),
        },
      ]}
      stats={[
        { title: "Total Acara", value: rows.length, description: "Agenda yang terdaftar.", icon: CalendarCheck, tone: "coral" },
        { title: "Main Event", value: mainEvents, description: "Acara utama undangan.", icon: Clock3, tone: "green" },
        { title: "Venue", value: venues, description: "Lokasi acara unik.", icon: MapPin, tone: "blue" },
        { title: "Acara Berikutnya", value: nextEvent?.title_id ?? "-", description: nextEvent ? formatDate(nextEvent.event_date) : "Belum ada jadwal mendatang.", icon: CalendarDays, tone: "rose" },
      ]}
      createItem={(form) => buildEvent(form)}
      updateItem={(row, form) => buildEvent(form, row)}
      detailFields={[
        { label: "Nama Acara", value: (event) => event.title_id },
        { label: "Tanggal", value: (event) => formatDate(event.event_date) },
        { label: "Waktu", value: (event) => `${event.start_time}${event.end_time ? ` - ${event.end_time}` : ""}` },
        { label: "Venue", value: (event) => event.venue_name },
        { label: "Jenis", value: (event) => (event.is_main_event ? "Main Event" : "Supporting") },
        { label: "Urutan", value: (event) => event.sort_order },
      ]}
    />
  );
}
