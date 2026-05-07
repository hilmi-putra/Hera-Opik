import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/store/app-context";

export function GiftSections() {
  const { giftAccounts, giftRecipient, giftRecommendations, claimGift } = useAppContext();
  const [activeGiftId, setActiveGiftId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied");
  };

  const submitClaim = (e: FormEvent) => {
    e.preventDefault();
    if (!activeGiftId) return;
    const claimed = claimGift(activeGiftId, name, email);
    if (!claimed) {
      toast.error("Already claimed");
      return;
    }
    window.open(claimed.purchaseLink, "_blank");
    setActiveGiftId(null);
    setName("");
    setEmail("");
  };

  return (
    <section className="grid gap-4 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Wedding Gifts</h3>
      {giftAccounts.map((account) => (
        <div key={account.id} className="rounded-md border p-3">
          <p>{account.bankType}</p>
          <p>{account.accountNumber}</p>
          <p>{account.accountHolder}</p>
          <button className="mt-2 rounded border px-3 py-1" onClick={() => copy(account.accountNumber)}>
            Copy Account Number
          </button>
        </div>
      ))}
      <div className="rounded-md border p-3">
        <p>{giftRecipient.name}</p>
        <p>{giftRecipient.phone}</p>
        <p>{giftRecipient.address}</p>
        <button className="mt-2 rounded border px-3 py-1" onClick={() => copy(`${giftRecipient.name} ${giftRecipient.phone} ${giftRecipient.address}`)}>
          Copy Recipient Info
        </button>
      </div>
      <div className="rounded-md border p-3">
        <h4 className="font-medium">Gift Recommendation</h4>
        {giftRecommendations.map((gift) => (
          <div key={gift.id} className="mt-2 flex items-center justify-between rounded border p-2">
            <span>{gift.title}</span>
            {gift.claimedByEmail ? (
              <span className="text-sm text-red-600">Already Claimed</span>
            ) : (
              <button className="rounded border px-2 py-1 text-sm" onClick={() => setActiveGiftId(gift.id)}>
                Claim
              </button>
            )}
          </div>
        ))}
      </div>
      {activeGiftId && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-black/50 p-4">
          <form onSubmit={submitClaim} className="w-full max-w-sm space-y-2 rounded-lg bg-white p-4">
            <h4 className="font-semibold">Claim Gift</h4>
            <input className="w-full rounded border px-3 py-2" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full rounded border px-3 py-2" placeholder="Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="flex gap-2">
              <button className="rounded bg-slate-900 px-3 py-2 text-white">Confirm Claim</button>
              <button type="button" className="rounded border px-3 py-2" onClick={() => setActiveGiftId(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
