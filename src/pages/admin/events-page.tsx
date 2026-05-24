import { useQuery } from "@tanstack/react-query";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminEvent } from "@/lib/api";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date(value));

export function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: api.adminEvents,
  });

  const columns: AdminDataTableColumn<AdminEvent>[] = [
    {
      header: "Acara",
      cell: (event) => (
        <div>
          <p className="font-medium">{event.title_id}</p>
          <p className="text-xs text-muted-foreground">{event.venue_name}</p>
        </div>
      ),
    },
    {
      header: "Tanggal",
      cell: (event) => <span className="text-sm text-muted-foreground">{formatDate(event.event_date)}</span>,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Management</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminDataTable columns={columns} data={events} emptyMessage="Belum ada data acara." isLoading={isLoading} initialPageSize={10} />
      </CardContent>
    </Card>
  );
}
