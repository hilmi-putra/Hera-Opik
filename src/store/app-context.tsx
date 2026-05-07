import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import type { GiftAccount, GiftRecommendation, RSVPEntry, Wish } from "@/types/domain";

interface AppState {
  eventDateIso: string;
  maxGuestsPerRsvp: number;
  giftAccounts: GiftAccount[];
  giftRecipient: { name: string; phone: string; address: string };
  giftRecommendations: GiftRecommendation[];
  rsvps: RSVPEntry[];
  wishes: Wish[];
  addWish: (name: string, message: string) => void;
  addRsvp: (entry: Omit<RSVPEntry, "id">) => void;
  claimGift: (id: string, name: string, email: string) => GiftRecommendation | undefined;
  setMaxGuestsPerRsvp: (max: number) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [eventDateIso] = useState("2026-12-20T09:00:00+07:00");
  const [maxGuestsPerRsvp, setMaxGuestsPerRsvp] = useState(2);
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [giftAccounts] = useState<GiftAccount[]>([
    { id: "bca", bankType: "BCA", accountNumber: "1234567890", accountHolder: "Hera Taufik" },
  ]);
  const [giftRecommendations, setGiftRecommendations] = useState<GiftRecommendation[]>([
    { id: "g1", title: "Premium Dinner Set", purchaseLink: "https://example.com/g1" },
    { id: "g2", title: "Coffee Machine", purchaseLink: "https://example.com/g2" },
  ]);

  const giftRecipient = useMemo(
    () => ({
      name: "Hera Taufik",
      phone: "+62 812 3456 7890",
      address: "Jakarta Selatan, DKI Jakarta, Indonesia",
    }),
    []
  );

  const value: AppState = {
    eventDateIso,
    maxGuestsPerRsvp,
    giftAccounts,
    giftRecipient,
    giftRecommendations,
    rsvps,
    wishes,
    addWish: (name, message) =>
      setWishes((prev) => [...prev, { id: crypto.randomUUID(), name, message }]),
    addRsvp: (entry) => setRsvps((prev) => [...prev, { ...entry, id: crypto.randomUUID() }]),
    claimGift: (id, name, email) => {
      let claimed: GiftRecommendation | undefined;
      setGiftRecommendations((prev) =>
        prev.map((gift) => {
          if (gift.id !== id || gift.claimedByEmail) return gift;
          claimed = { ...gift, claimedByName: name, claimedByEmail: email };
          return claimed;
        })
      );
      return claimed;
    },
    setMaxGuestsPerRsvp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
