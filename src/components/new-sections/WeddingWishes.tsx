import { useState } from "react";
import { Heart } from "lucide-react";
import { ScallopDivider } from "../ui/ScallopDivider";

type Wish = {
  id: number;
  name: string;
  message: string;
  timestamp: string;
};

export function WeddingWishes() {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: "Sarah & John", message: "Wishing you a lifetime of love and happiness! Can't wait to celebrate with you both.", timestamp: "2 hours ago" },
    { id: 2, name: "The Smiths", message: "Congratulations on your upcoming wedding! May your journey together be filled with joy.", timestamp: "5 hours ago" },
    { id: 3, name: "Emily R.", message: "So happy for you two! You are the perfect match.", timestamp: "1 day ago" },
    { id: 4, name: "Michael T.", message: "Cheers to the beautiful couple! May your love grow stronger each and every passing year.", timestamp: "2 days ago" }
  ]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    const newWish = {
      id: Date.now(),
      name,
      message,
      timestamp: "Just now"
    };
    
    setWishes([newWish, ...wishes]);
    setName("");
    setMessage("");
  };

  return (
    <section className="bg-cream py-32 px-6 relative">
      <div className="absolute top-0 w-full left-0">
        <ScallopDivider fill="var(--color-charcoal)" className="rotate-180" />
      </div>
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16 animate-on-scroll stagger">
          <p className="font-sans text-[var(--text-sub)] tracking-[var(--tracking-wide)] uppercase text-muted mb-4">
            Guestbook
          </p>
          <h2 className="font-display text-[var(--text-section)] font-light text-charcoal">
            Wedding Wishes
          </h2>
        </div>

        {/* Form */}
        <div className="bg-ivory border border-[rgba(0,0,0,0.05)] shadow-xl p-8 rounded-3xl mb-16 animate-on-scroll relative overflow-hidden">
          <div className="absolute top-0 w-full left-0 h-2 bg-sage" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-border py-3 font-sans text-charcoal focus:outline-none focus:border-sage transition-colors"
            />
            <textarea 
              placeholder="Write your wishes..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              className="w-full bg-transparent border-b border-border py-3 font-sans text-charcoal focus:outline-none focus:border-sage transition-colors resize-none"
            />
            <button 
              type="submit"
              className="self-end bg-charcoal text-cream font-sans uppercase tracking-wider text-sm py-3 px-8 rounded-full transition-all duration-300 hover:bg-sage"
            >
              Send Wish
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="flex flex-col gap-6 h-[500px] overflow-y-auto no-scrollbar pr-2 pb-8">
          {wishes.map((wish, index) => (
            <div 
              key={wish.id}
              className="bg-white border border-[rgba(0,0,0,0.05)] shadow-md p-6 rounded-[20px] animate-in slide-in-from-bottom-8 fade-in duration-500 relative"
              style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-display text-2xl text-charcoal font-semibold italic">{wish.name}</h4>
                <div className="flex items-center gap-1 text-muted text-xs font-sans">
                  <Heart size={12} className="text-blush fill-[var(--color-blush)]" />
                  {wish.timestamp}
                </div>
              </div>
              <p className="font-sans text-charcoal leading-relaxed">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
