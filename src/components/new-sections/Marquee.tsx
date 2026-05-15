import { ScallopDivider } from "../ui/ScallopDivider";

export function Marquee() {
  const text = "Ken & Anabelle · 25 December 2026 · With Love · ";
  const repeats = Array(6).fill(text).join("");

  return (
    <div className="bg-charcoal relative pt-20 pb-16">
      <div className="absolute top-0 w-full left-0">
        <ScallopDivider fill="var(--color-cream)" className="rotate-180" />
      </div>

      <div className="w-full overflow-hidden flex whitespace-nowrap bg-charcoal py-6 border-y border-border/20 animate-on-scroll">
        <div className="animate-[marquee_20s_linear_infinite] flex text-cream font-sans text-[0.85rem] tracking-[0.15em] uppercase">
          {repeats}
          {repeats}
        </div>
      </div>
    </div>
  );
}
