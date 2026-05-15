import { MapPin, Clock, Heart, GlassWater, PartyPopper } from "lucide-react";
import { ScallopDivider } from "../ui/ScallopDivider";

export function EventDetails() {
  return (
    <section className="relative bg-cream pt-24 pb-32">
      <div className="absolute top-0 w-full left-0">
        <ScallopDivider fill="var(--color-charcoal)" className="rotate-180" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll stagger">
          <p className="font-sans text-[var(--text-sub)] tracking-[var(--tracking-wide)] uppercase text-muted mb-4">
            Join Us
          </p>
          <h2 className="font-display text-[var(--text-section)] font-light text-charcoal">
            Event Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Matrimony */}
          <div className="bg-ivory border border-[rgba(0,0,0,0.08)] rounded-[20px] shadow-[0_4px_40px_rgba(0,0,0,0.06)] overflow-hidden animate-on-scroll transition-transform hover:-translate-y-2 duration-300">
            <div className="h-1 bg-blush w-full" />
            <div className="p-8 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6 text-blush">
                <Heart size={28} strokeWidth={1.5} />
              </div>
              <p className="font-sans text-sm tracking-widest uppercase text-muted mb-4">Holy Matrimony</p>
              <h3 className="font-display text-3xl mb-4 text-charcoal">Friday, 25 Dec 2026</h3>
              
              <div className="flex items-center gap-2 text-charcoal mb-2">
                <Clock size={16} className="text-gold" />
                <span className="font-sans font-medium">09:00 AM - 11:00 AM</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 mt-4 text-muted font-sans text-sm flex-grow">
                <MapPin size={16} className="text-gold mb-1" />
                <p className="font-medium text-charcoal">Jakarta Cathedral</p>
                <p>Jl. Katedral No.7B, Ps. Baru, Sawah Besar, Jakarta Pusat</p>
              </div>

              <a href="#" className="mt-8 font-sans text-sm font-medium text-charcoal border-b border-charcoal pb-1 hover:text-blush hover:border-blush transition-colors">
                Get Directions →
              </a>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-ivory border border-[rgba(0,0,0,0.08)] rounded-[20px] shadow-[0_4px_40px_rgba(0,0,0,0.06)] overflow-hidden animate-on-scroll transition-transform hover:-translate-y-2 duration-300" style={{ transitionDelay: '100ms' }}>
            <div className="h-1 bg-sage w-full" />
            <div className="p-8 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6 text-sage">
                <GlassWater size={28} strokeWidth={1.5} />
              </div>
              <p className="font-sans text-sm tracking-widest uppercase text-muted mb-4">Wedding Reception</p>
              <h3 className="font-display text-3xl mb-4 text-charcoal">Friday, 25 Dec 2026</h3>
              
              <div className="flex items-center gap-2 text-charcoal mb-2">
                <Clock size={16} className="text-gold" />
                <span className="font-sans font-medium">19:00 PM - 22:00 PM</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 mt-4 text-muted font-sans text-sm flex-grow">
                <MapPin size={16} className="text-gold mb-1" />
                <p className="font-medium text-charcoal">Ritz-Carlton Pacific Place</p>
                <p>Sudirman Central Business District (SCBD), Jl. Jend. Sudirman kav 52-53, Jakarta</p>
              </div>

              <a href="#" className="mt-8 font-sans text-sm font-medium text-charcoal border-b border-charcoal pb-1 hover:text-sage hover:border-sage transition-colors">
                Get Directions →
              </a>
            </div>
          </div>

          {/* After Party */}
          <div className="bg-ivory border border-[rgba(0,0,0,0.08)] rounded-[20px] shadow-[0_4px_40px_rgba(0,0,0,0.06)] overflow-hidden animate-on-scroll transition-transform hover:-translate-y-2 duration-300 md:col-span-2 lg:col-span-1" style={{ transitionDelay: '200ms' }}>
            <div className="h-1 bg-gold w-full" />
            <div className="p-8 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6 text-gold">
                <PartyPopper size={28} strokeWidth={1.5} />
              </div>
              <p className="font-sans text-sm tracking-widest uppercase text-muted mb-4">After Party</p>
              <h3 className="font-display text-3xl mb-4 text-charcoal">Friday, 25 Dec 2026</h3>
              
              <div className="flex items-center gap-2 text-charcoal mb-2">
                <Clock size={16} className="text-gold" />
                <span className="font-sans font-medium">22:00 PM - Till Drop</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 mt-4 text-muted font-sans text-sm flex-grow">
                <MapPin size={16} className="text-gold mb-1" />
                <p className="font-medium text-charcoal">The Lounge</p>
                <p>Ritz-Carlton Pacific Place, Level 8</p>
              </div>

              <a href="#" className="mt-8 font-sans text-sm font-medium text-charcoal border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors">
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
