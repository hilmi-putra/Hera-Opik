import { useTranslation } from "react-i18next";
import { Countdown } from "@/components/countdown";
import { GiftSections } from "@/components/gift-sections";
import { RsvpForm } from "@/components/rsvp-form";
import { WishesSection } from "@/components/wishes";
import { useAppContext } from "@/store/app-context";

export function LandingPage() {
  const { t } = useTranslation();
  const { eventDateIso } = useAppContext();

  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-wider text-slate-500">{t("invitation")}</p>
        <h2 className="text-3xl font-bold">Hera & Taufik</h2>
      </section>
      <Countdown eventDateIso={eventDateIso} />
      <RsvpForm />
      <GiftSections />
      <WishesSection />
    </div>
  );
}
