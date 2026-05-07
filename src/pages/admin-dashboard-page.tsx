import { useMemo } from "react";
import { useAppContext } from "@/store/app-context";
import { supabase } from "@/lib/supabase";

export function AdminDashboardPage() {
  const { rsvps, wishes, giftRecommendations, maxGuestsPerRsvp, setMaxGuestsPerRsvp } = useAppContext();
  const envReady = useMemo(
    () => Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
    []
  );

  return (
    <div className="grid gap-4">
      <section className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold">System Status</h2>
        <p className="text-sm">Supabase URL: {import.meta.env.VITE_SUPABASE_URL || "Not configured"}</p>
        <p className="text-sm">Supabase Connected: {envReady ? "Ready" : "Missing env vars"}</p>
        <p className="text-sm">Client Initialized: {supabase ? "Yes" : "No"}</p>
      </section>
      <section className="rounded-lg border p-4">
        <h3 className="font-semibold">RSVP Settings</h3>
        <label className="mt-2 block text-sm">Max guests per RSVP</label>
        <input
          type="number"
          min={1}
          className="mt-1 rounded border px-3 py-2"
          value={maxGuestsPerRsvp}
          onChange={(e) => setMaxGuestsPerRsvp(Number(e.target.value))}
        />
      </section>
      <section className="rounded-lg border p-4">
        <h3 className="font-semibold">Overview</h3>
        <p className="text-sm">Total RSVP: {rsvps.length}</p>
        <p className="text-sm">Total Wishes: {wishes.length}</p>
        <p className="text-sm">Claimed Gifts: {giftRecommendations.filter((gift) => gift.claimedByEmail).length}</p>
      </section>
    </div>
  );
}
