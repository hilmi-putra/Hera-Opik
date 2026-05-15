import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 bg-wedding-pink/20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-8">Save The Date</h2>
        
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-wedding-pink mb-8">
          <div className="flex justify-between items-center max-w-xs mx-auto">
            {timeUnits.map((unit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-wedding-pink/30 rounded-2xl mb-2 text-wedding-green font-display font-bold text-xl sm:text-2xl">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-wedding-green/70">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <p className="font-serif text-lg italic text-wedding-green/80">
          We are eagerly waiting for our special day to arrive!
        </p>
      </motion.div>
    </section>
  );
}
