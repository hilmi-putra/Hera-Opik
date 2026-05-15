import { useState } from "react";
import { Check } from "lucide-react";

export function RSVP() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="bg-cream">
      <div className="flex flex-col md:flex-row w-full min-h-[80vh]">
        {/* Left Side - Blush Background with Photo */}
        <div className="w-full md:w-1/2 bg-blush-light p-12 md:p-24 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blush rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center animate-on-scroll">
            <h2 className="font-display text-[var(--text-section)] text-charcoal mb-6">
              Will You<br/>Join Us?
            </h2>
            <p className="font-serif italic text-xl text-charcoal/80 mb-12">
              Kindly RSVP by November 25, 2026
            </p>
          </div>

          <div className="w-full max-w-[400px] aspect-[4/5] rounded-t-full overflow-hidden border-8 border-cream shadow-xl animate-on-scroll">
            <img 
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop" 
              alt="Couple RSVP" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-cream p-8 md:p-24 flex items-center justify-center">
          <div className="w-full max-w-[500px] animate-on-scroll">
            {isSubmitted ? (
              <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-lg">
                  <Check size={40} />
                </div>
                <h3 className="font-display text-4xl mb-4 text-charcoal">Thank you!</h3>
                <p className="font-sans text-muted">
                  See you there 🌸
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block font-sans text-sm tracking-wide uppercase text-muted mb-2">Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm tracking-wide uppercase text-muted mb-2">Phone / WhatsApp</label>
                  <input 
                    type="tel" 
                    required 
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="Your contact number"
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm tracking-wide uppercase text-muted mb-4">Will you attend?</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setAttendance("yes")}
                      className={`flex-1 py-4 rounded-full font-sans uppercase tracking-wider text-sm transition-all duration-300 ${
                        attendance === "yes" 
                          ? "bg-charcoal text-cream" 
                          : "border border-border text-charcoal hover:border-charcoal"
                      }`}
                    >
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance("no")}
                      className={`flex-1 py-4 rounded-full font-sans uppercase tracking-wider text-sm transition-all duration-300 ${
                        attendance === "no" 
                          ? "bg-charcoal text-cream" 
                          : "border border-border text-charcoal hover:border-charcoal"
                      }`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm tracking-wide uppercase text-muted mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-transparent border border-border rounded-2xl p-4 font-sans text-charcoal focus:outline-none focus:border-charcoal transition-colors resize-none"
                    placeholder="Leave a message for the couple..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={!attendance}
                  className="w-full bg-charcoal text-cream font-sans uppercase tracking-wider text-sm py-5 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  Send RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
