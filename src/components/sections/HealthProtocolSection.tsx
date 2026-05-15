import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, UserCheck, Handshake } from "lucide-react";

export function HealthProtocolSection() {
  const protocols = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Wear a Mask",
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Stay Healthy",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Keep Distance",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Use Sanitizer",
    },
  ];

  return (
    <section className="py-16 px-6 bg-wedding-cream text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-2xl font-bold text-wedding-green mb-8">Health Protocols</h2>
        <div className="grid grid-cols-2 gap-6">
          {protocols.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-sm border border-wedding-green/5"
            >
              <div className="text-wedding-pink mb-4">
                {item.icon}
              </div>
              <p className="font-medium text-wedding-green text-sm">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
