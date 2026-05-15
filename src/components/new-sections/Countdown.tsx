import { useState, useEffect } from "react";

export function Countdown() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`12/25/2026`) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-charcoal py-32 px-6">
      <div className="max-w-[800px] mx-auto text-center animate-on-scroll stagger">
        <h2 className="font-serif italic text-4xl md:text-5xl text-cream mb-16">
          Days Until Forever
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div 
              key={unit} 
              className="bg-charcoal border border-border/20 p-6 flex flex-col items-center justify-center relative overflow-hidden group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute bottom-0 w-full h-1 bg-blush transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="font-display text-5xl md:text-6xl font-light text-ivory mb-2">
                {String(value).padStart(2, '0')}
              </div>
              <p className="font-sans text-xs tracking-widest uppercase text-muted">
                {unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
