import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventSection() {
  return (
    <section className="py-20 px-6 bg-wedding-cream text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-12">Wedding Events</h2>
        
        <div className="space-y-8">
          {weddingData.events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-wedding-green text-wedding-cream p-8 rounded-[40px] shadow-xl relative overflow-hidden"
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-wedding-cream/20 rounded-tl-[40px] m-4" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-wedding-cream/20 rounded-br-[40px] m-4" />
              
              <h3 className="font-display text-2xl font-bold mb-6">{event.title}</h3>
              
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-wedding-pink" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-wedding-pink" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-wedding-pink" />
                  <span>{event.location}</span>
                </div>
                <p className="text-wedding-cream/70 mt-2 px-4">{event.address}</p>
              </div>

              <div className="bg-white p-2 w-32 h-32 mx-auto rounded-xl mb-8">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AttendanceQR" 
                  alt="QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <Button 
                asChild
                className="bg-wedding-cream text-wedding-green hover:bg-wedding-cream/90 rounded-full px-8 py-5"
              >
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Rundown Acara */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold text-wedding-green mb-6">Event Rundown</h3>
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-wedding-green/10 text-left">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-wedding-green/10 last:border-0">
                  <td className="py-4 font-bold text-wedding-green w-1/3">09:00 AM</td>
                  <td className="py-4 text-wedding-green/80">Holy Matrimony</td>
                </tr>
                <tr className="border-b border-wedding-green/10 last:border-0">
                  <td className="py-4 font-bold text-wedding-green w-1/3">11:00 AM</td>
                  <td className="py-4 text-wedding-green/80">Photo Session</td>
                </tr>
                <tr className="border-b border-wedding-green/10 last:border-0">
                  <td className="py-4 font-bold text-wedding-green w-1/3">06:00 PM</td>
                  <td className="py-4 text-wedding-green/80">Wedding Reception</td>
                </tr>
                <tr className="border-b border-wedding-green/10 last:border-0">
                  <td className="py-4 font-bold text-wedding-green w-1/3">08:00 PM</td>
                  <td className="py-4 text-wedding-green/80">After Party</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
