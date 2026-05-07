import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useMemo, useState } from "react";

dayjs.extend(utc);

function toIcsDate(input: string) {
  return dayjs(input).utc().format("YYYYMMDDTHHmmss[Z]");
}

export function Countdown({ eventDateIso }: { eventDateIso: string }) {
  const [now, setNow] = useState(dayjs());
  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = useMemo(() => dayjs(eventDateIso).diff(now), [eventDateIso, now]);
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

  const calendarLinks = {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hera%20%26%20Taufik%20Wedding&dates=${toIcsDate(eventDateIso)}/${toIcsDate(dayjs(eventDateIso).add(4, "hour").toISOString())}`,
    yahoo: `https://calendar.yahoo.com/?v=60&title=Hera%20%26%20Taufik%20Wedding&st=${toIcsDate(eventDateIso)}`,
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Save The Date (Asia/Jakarta)</h2>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {[["Days", days], ["Hours", hours], ["Minutes", minutes], ["Seconds", seconds]].map(([label, value]) => (
          <div key={label as string} className="rounded-md bg-slate-100 p-3">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs uppercase">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <a className="rounded-md border px-3 py-2 text-sm" href={calendarLinks.google} target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <a className="rounded-md border px-3 py-2 text-sm" href={calendarLinks.yahoo} target="_blank" rel="noreferrer">
          Add to Yahoo Calendar
        </a>
      </div>
    </section>
  );
}
