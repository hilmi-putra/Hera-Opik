import { useState, type FormEvent } from "react";
import { useAppContext } from "@/store/app-context";

export function WishesSection() {
  const { wishes, addWish } = useAppContext();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !message) return;
    addWish(name, message);
    setName("");
    setMessage("");
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Wedding Wishes</h3>
      <form onSubmit={submit} className="mt-4 space-y-2">
        <input className="w-full rounded border px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="w-full rounded border px-3 py-2" placeholder="Write your wish..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Send Wish</button>
      </form>
      <div className="mt-4 space-y-2">
        {wishes.map((wish) => (
          <div key={wish.id} className="rounded border p-2">
            <p className="font-medium">{wish.name}</p>
            <p className="text-sm text-slate-600">{wish.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
