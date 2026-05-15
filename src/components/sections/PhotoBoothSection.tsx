import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhotoBoothSection() {
  return (
    <section className="py-20 px-6 bg-wedding-cream text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-4">Wedding Filter</h2>
        <p className="text-sm text-wedding-green/70 mb-8">Capture your moments using our special Instagram filter</p>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-wedding-green/10 mb-8 flex flex-col items-center">
          <div className="w-48 h-64 border-4 border-wedding-pink rounded-[40px] flex items-center justify-center bg-wedding-cream mb-6 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80" 
              alt="Filter Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <Camera className="w-12 h-12 text-wedding-green/50 relative z-10" />
            
            {/* Scallop or decorative frame effect inside */}
            <div className="absolute inset-2 border-2 border-dashed border-wedding-green/30 rounded-[32px] z-10" />
          </div>
          
          <Button className="bg-wedding-green hover:bg-wedding-green/90 text-white rounded-full px-8 py-5">
            Try Instagram Filter
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
