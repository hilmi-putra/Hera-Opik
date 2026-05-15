import { useState } from "react";
import { Copy, Check, Video, CreditCard } from "lucide-react";
import { ScallopDivider } from "../ui/ScallopDivider";

export function GiftStream() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative bg-charcoal py-32 px-6">
      <div className="absolute top-0 w-full left-0">
        <ScallopDivider fill="var(--color-cream)" className="rotate-180" />
      </div>

      <div className="max-w-[1000px] mx-auto text-cream">
        <div className="text-center mb-16 animate-on-scroll stagger">
          <p className="font-sans text-[var(--text-sub)] tracking-[var(--tracking-wide)] uppercase text-gold mb-4">
            For Our Guests
          </p>
          <h2 className="font-display text-[var(--text-section)] font-light">
            Share the Joy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Live Streaming */}
          <div className="bg-ivory/10 border border-border/20 p-8 md:p-12 rounded-3xl backdrop-blur-sm animate-on-scroll flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6 text-gold">
              <Video size={28} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-3xl mb-4">Live Streaming</h3>
            <p className="font-sans text-muted mb-8 max-w-[280px]">
              For friends and family who cannot attend in person, we invite you to join our holy matrimony virtually.
            </p>
            
            <button className="w-full mt-auto bg-cream text-charcoal font-sans uppercase tracking-wider text-sm py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-white">
              Join Stream
            </button>
          </div>

          {/* Wedding Gift */}
          <div className="bg-ivory/10 border border-border/20 p-8 md:p-12 rounded-3xl backdrop-blur-sm animate-on-scroll flex flex-col items-center text-center" style={{ transitionDelay: '100ms' }}>
            <div className="w-16 h-16 rounded-full bg-blush/20 flex items-center justify-center mb-6 text-blush">
              <CreditCard size={28} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-3xl mb-4">Wedding Gift</h3>
            <p className="font-sans text-muted mb-8 max-w-[280px]">
              Your blessing is the most meaningful gift. For those who wish to give further, you may transfer via:
            </p>
            
            <div className="w-full bg-charcoal/50 border border-border/30 p-6 rounded-2xl mb-8 flex flex-col items-center">
              <p className="font-sans text-sm tracking-widest uppercase text-muted mb-2">BCA</p>
              <p className="font-sans text-2xl tracking-widest text-cream mb-2">1234 567 890</p>
              <p className="font-sans text-sm text-muted">Ken & Anabelle</p>
            </div>

            <button 
              onClick={handleCopy}
              className="w-full mt-auto border border-cream/30 text-cream font-sans uppercase tracking-wider text-sm py-4 rounded-full transition-all duration-300 hover:bg-cream hover:text-charcoal flex items-center justify-center gap-2"
            >
              {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Number</>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
