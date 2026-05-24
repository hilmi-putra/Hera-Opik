import { FloralDecor } from "../ui/FloralDecor";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-cream">
      {/* Left side photo */}
      <div className="w-full md:w-[60%] h-[60vh] md:h-screen relative p-4 md:p-8 flex items-center justify-center">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-[12px] border-ivory animate-on-scroll">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop" 
            alt="Couple" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right side text */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-8 py-16 md:p-16 relative">
        <FloralDecor className="absolute top-8 right-8 w-12 h-12 text-gold opacity-50 hidden md:block" />
        <FloralDecor className="absolute bottom-16 left-8 w-12 h-12 text-gold opacity-50 rotate-180 hidden md:block" />

        <div className="animate-on-scroll stagger z-10">
          <p className="font-sans text-[var(--text-sub)] tracking-[var(--tracking-wide)] uppercase text-muted mb-4">
            The Wedding Of
          </p>
          
          <h2 className="font-display text-[clamp(4rem,8vw,8rem)] leading-[0.9] mb-8 text-charcoal font-light">
            Ken<br/>
            <span className="text-blush">&</span> Anabelle
          </h2>
          
          <div className="text-[5rem] md:text-[6rem] leading-none font-serif italic text-blush-light mb-8 md:ml-4">
            KA
          </div>

          <p className="font-serif italic text-2xl text-gold mb-6">
            25 December 2026
          </p>
          
          <hr className="w-16 border-charcoal opacity-20 mb-6" />

          <p className="font-serif italic text-[var(--text-body)] text-muted">
            "I have found the one whom my soul loves."
          </p>
        </div>
      </div>

    </section>
  );
}
