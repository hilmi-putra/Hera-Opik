import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { weddingData } from "@/lib/data";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function HeroSection({ onOpen, isOpen }: HeroSectionProps) {
  if (isOpen) {
    return (
      <section className="relative h-screen w-full flex items-center justify-center bg-wedding-cream overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={weddingData.coverImage} 
          alt="Cover" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.2em] uppercase mb-4"
          >
            The Wedding Of
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
          >
            {weddingData.groom.name} & {weddingData.bride.name}
          </motion.h1>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 1 }}
             className="absolute bottom-10"
          >
            <ChevronDown className="w-8 h-8 animate-bounce text-white/70" />
          </motion.div>
        </div>
      </section>
    );
  }

  // Cover state (before opening)
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-cream overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <img 
        src={weddingData.coverImage} 
        alt="Cover" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 text-center text-white px-4 max-w-md mx-auto w-full flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-[0.2em] uppercase mb-4"
        >
          Wedding Invitation
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-6xl font-bold mb-8"
        >
          {weddingData.groom.name} & {weddingData.bride.name}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full mb-8"
        >
          <p className="text-sm text-white/80 mb-2">Dear Mr/Mrs/Ms,</p>
          <p className="text-lg font-medium">You are invited!</p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            onClick={onOpen}
            className="bg-white text-wedding-green hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium shadow-xl transition-all"
          >
            Open Invitation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
