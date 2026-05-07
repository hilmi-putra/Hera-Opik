import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/store/app-context";
import type { AttendanceStatus } from "@/types/domain";

export function RsvpForm() {
  const { addRsvp, maxGuestsPerRsvp } = useAppContext();
  const [name, setName] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>("will_attend");
  const [guestsCount, setGuestsCount] = useState(1);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name) return;
    addRsvp({ name, attendanceStatus, selectedEvents: ["Akad", "Resepsi"], guestsCount });
    toast.success("RSVP submitted");
    setName("");
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">RSVP</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input className="w-full rounded-md border px-3 py-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="w-full rounded-md border px-3 py-2" value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value as AttendanceStatus)}>
          <option value="will_attend">Will Attend</option>
          <option value="unable_to_attend">Unable To Attend</option>
        </select>
        <input
          className="w-full rounded-md border px-3 py-2"
          type="number"
          min={1}
          max={maxGuestsPerRsvp}
          value={guestsCount}
          onChange={(e) => setGuestsCount(Number(e.target.value))}
        />
        <button className="rounded-md bg-slate-900 px-4 py-2 text-white">Submit RSVP</button>
      </form>
    </section>
  );
}
