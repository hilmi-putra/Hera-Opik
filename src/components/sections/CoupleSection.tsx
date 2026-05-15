import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export function CoupleSection() {
  return (
    <section className="py-20 px-6 bg-wedding-cream text-center relative overflow-hidden">
      {/* Decorative top scallop/border could go here */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <p className="font-serif text-sm italic text-wedding-green/80 mb-6 px-4">
          "And over all these virtues put on love, which binds them all together in perfect unity."
          <br /> - Colossians 3:14 -
        </p>
        
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-12">Meet The Couple</h2>

        {/* Groom */}
        <div className="mb-16">
          <div className="relative w-48 h-64 mx-auto mb-6">
            <div className="absolute inset-0 bg-wedding-green rounded-[100px] transform rotate-3" />
            <img 
              src={weddingData.groom.image} 
              alt={weddingData.groom.name} 
              className="absolute inset-0 w-full h-full object-cover rounded-[100px] transform -rotate-3 transition-transform hover:rotate-0 duration-500 shadow-xl"
            />
          </div>
          <h3 className="font-display text-2xl font-bold text-wedding-green mb-2">{weddingData.groom.fullName}</h3>
          <p className="text-sm text-wedding-green/70 mb-1">Son of {weddingData.groom.father} & {weddingData.groom.mother}</p>
          <a href="#" className="text-sm text-wedding-green font-medium hover:underline">{weddingData.groom.instagram}</a>
        </div>

        <div className="text-4xl font-display text-wedding-green/40 mb-16">&</div>

        {/* Bride */}
        <div>
          <div className="relative w-48 h-64 mx-auto mb-6">
            <div className="absolute inset-0 bg-wedding-pink rounded-[100px] transform -rotate-3" />
            <img 
              src={weddingData.bride.image} 
              alt={weddingData.bride.name} 
              className="absolute inset-0 w-full h-full object-cover rounded-[100px] transform rotate-3 transition-transform hover:rotate-0 duration-500 shadow-xl"
            />
          </div>
          <h3 className="font-display text-2xl font-bold text-wedding-green mb-2">{weddingData.bride.fullName}</h3>
          <p className="text-sm text-wedding-green/70 mb-1">Daughter of {weddingData.bride.father} & {weddingData.bride.mother}</p>
          <a href="#" className="text-sm text-wedding-green font-medium hover:underline">{weddingData.bride.instagram}</a>
        </div>
      </motion.div>
    </section>
  );
}
