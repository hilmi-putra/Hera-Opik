import { motion } from "framer-motion";
import { FloralDecor } from "../ui/FloralDecor";

export function Cover({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  return (
      <motion.div 
        key="cover-page"
        className="fixed inset-0 z-50 w-full h-screen overflow-hidden bg-charcoal flex items-center justify-center"
        exit={{ y: "-100%", transition: { duration: 1, ease: "easeInOut" } }}
      >
        {/* Background with parallax/slow zoom */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />

        {/* Decorative corners */}
        <FloralDecor className="absolute top-8 right-8 w-16 h-16 text-gold opacity-80" />
        <FloralDecor className="absolute bottom-8 left-8 w-16 h-16 text-gold opacity-80 rotate-180" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.p 
            className="font-sans text-[0.85rem] tracking-[0.3em] uppercase text-ivory mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Wedding Invitation
          </motion.p>
          
          <h1 className="font-display text-[var(--text-hero)] text-cream leading-none mb-4 font-light drop-shadow-lg flex gap-[0.1em] flex-wrap justify-center">
            {"Ken & Anabelle".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            className="font-serif italic text-2xl md:text-3xl text-cream mb-12 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Friday, 25 December 2026
          </motion.p>

          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-sm w-full shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="font-sans text-cream mb-2">Dear {guestName},</p>
            <p className="font-sans text-cream mb-8">You are warmly invited.</p>
            
            <button 
              onClick={onOpen}
              className="w-full bg-cream text-charcoal font-sans uppercase tracking-wider text-sm py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,240,232,0.4)]"
            >
              Open Invitation →
            </button>
          </motion.div>
        </div>
      </motion.div>
  );
}
