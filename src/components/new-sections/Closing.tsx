import { FloralDecor } from "../ui/FloralDecor";
import { Marquee } from "./Marquee";

export function Closing() {
  return (
    <footer className="bg-cream relative overflow-hidden flex flex-col items-center">
      <div className="w-full">
        <Marquee />
      </div>

      <div className="w-full max-w-[800px] mx-auto text-center py-32 px-6 flex flex-col items-center relative">
        <FloralDecor className="absolute top-16 left-12 w-16 h-16 text-gold opacity-40 rotate-45 hidden md:block" />
        <FloralDecor className="absolute top-32 right-12 w-20 h-20 text-sage opacity-40 -rotate-12 hidden md:block" />

        <div className="animate-on-scroll stagger z-10 w-full flex flex-col items-center">
          <p className="font-sans text-[var(--text-sub)] tracking-[var(--tracking-wide)] uppercase text-muted mb-8">
            Thank You
          </p>

          <div className="text-[6rem] leading-none font-serif italic text-blush-light mb-4">
            KA
          </div>
          
          <h2 className="font-display text-[var(--text-hero)] leading-[0.9] mb-6 text-charcoal font-light">
            Ken & Anabelle
          </h2>
          
          <p className="font-serif italic text-2xl text-charcoal/60 mb-12">
            25 December 2026
          </p>
          
          <p className="font-sans text-muted max-w-md mx-auto mb-24">
            It is an honor and joy for us to share this special day with you. Your presence and blessings mean the world to us.
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="w-full border-t border-border pt-8 flex justify-between items-center text-xs font-sans text-muted uppercase tracking-wider">
          <p>© 2026 Ken & Anabelle</p>
          <p>Made with ❤️ · Katsudoto</p>
        </div>
      </div>
    </footer>
  );
}
