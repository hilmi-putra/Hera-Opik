import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export function FooterSection() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-wedding-cream overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <img 
        src={weddingData.coverImage} 
        alt="Footer Cover" 
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />
      
      <div className="relative z-20 text-center text-white px-6 w-full max-w-md mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="font-serif italic text-xl mb-4">"Thank you for being part of our story"</p>
          <h2 className="font-display text-5xl font-bold mb-4">
            {weddingData.groom.name} & {weddingData.bride.name}
          </h2>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="w-full h-px bg-white/20 mb-8"
        />

        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="text-xs text-white/50 tracking-widest uppercase"
        >
          Created by Katsudoto Studio
        </motion.p>
      </div>
    </section>
  );
}
