import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LiveStreamingSection() {
  return (
    <section className="py-20 px-6 bg-wedding-cream text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-4">Live Streaming</h2>
        <p className="text-sm text-wedding-green/70 mb-8">
          For our family and friends who are unable to attend in person, we invite you to join us virtually.
        </p>
        
        <div className="relative rounded-[32px] overflow-hidden shadow-sm aspect-video group cursor-pointer mb-6 border border-wedding-green/10">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" 
            alt="Live Stream Preview" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
            <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          </div>
        </div>
        
        <Button 
          className="bg-wedding-green hover:bg-wedding-green/90 text-white rounded-full px-8 py-5"
        >
          Watch on YouTube
        </Button>
      </motion.div>
    </section>
  );
}
