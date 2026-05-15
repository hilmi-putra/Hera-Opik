import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export function GallerySection() {
  return (
    <section className="py-20 px-6 bg-wedding-cream text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-4">Portraits of Love</h2>
        <p className="text-sm text-wedding-green/70 mb-12">Every picture tells a story of our journey together.</p>
        
        <div className="grid grid-cols-2 gap-4">
          {weddingData.gallery.map((image, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
                index % 3 === 0 ? "col-span-2 aspect-video" : "col-span-1 aspect-square"
              }`}
            >
              <img 
                src={image} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
