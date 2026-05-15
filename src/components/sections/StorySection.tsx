import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export function StorySection() {
  return (
    <section className="py-20 px-6 bg-wedding-pink/30 text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-12">Our Love Story</h2>
        
        <div className="space-y-12 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-wedding-green/20 -translate-x-1/2" />
          
          {weddingData.story.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10 bg-white p-6 rounded-3xl shadow-sm border border-wedding-green/10"
            >
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="inline-block px-3 py-1 bg-wedding-pink text-wedding-green text-xs font-bold rounded-full mb-3">
                {item.year}
              </div>
              <h3 className="font-display text-xl font-bold text-wedding-green mb-2">{item.title}</h3>
              <p className="text-sm text-wedding-green/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
