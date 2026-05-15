import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CalendarDays, MapPin, ChevronDown } from "lucide-react";
import markWhite from "@/assets/mark-white.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function StoryAccordion({ title, content, imageSrc, isOpen, onClick }: { title: string; content: string; imageSrc: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="w-full mb-5">
      <button
        onClick={onClick}
        className="w-full bg-[#842434] hover:bg-[#6A1D2A] text-white flex items-center justify-between px-6 py-4 rounded-full transition-all duration-300 shadow-md active:scale-[0.98]"
      >
        <span className="font-sans font-semibold text-sm md:text-base tracking-wide text-[#C6A633]">{title}</span>
        <div className="bg-[#C6A633] text-[#842434] w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-inner">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden origin-top"
          >
            <div className="pt-4 pb-2">
              {/* Ticket Shape Card */}
              <div className="bg-white rounded-2xl shadow-lg flex flex-col relative mx-2">
                {/* Image Section */}
                <div className="w-full bg-slate-100 rounded-t-2xl overflow-hidden relative">
                  <img src={imageSrc} className="w-full h-auto block" alt={title} />
                </div>

                {/* Ticket Divider (Dashed line with semi-circle cutouts) */}
                <div className="relative w-full h-8 flex items-center justify-center bg-white">
                  <div className="absolute left-4 right-4 h-[1px] border-t-[2px] border-dashed border-slate-300"></div>
                  {/* Left Cutout */}
                  <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#F9E9E7] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.05)]"></div>
                  {/* Right Cutout */}
                  <div className="absolute -right-4 w-8 h-8 rounded-full bg-[#F9E9E7] shadow-[inset_3px_0_5px_rgba(0,0,0,0.05)]"></div>
                </div>

                {/* Text Section */}
                <div className="px-6 py-8 text-[#5B4F48] font-sans text-sm md:text-base leading-relaxed text-center italic bg-white rounded-b-2xl">"{content}"</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

const giftRecommendations = [
  {
    id: 1,
    name: "Sunny glow",
    description: "Table lamp with soft rounded shape",
    price: 1200000,
    totalStock: 3,
    purchasedCount: 1,
    image: "/images/CMZ_4069.jpg",
    color: "#D34D41",
    link: "https://shopee.co.id",
  },
  {
    id: 2,
    name: "Wave seat",
    description: "Fluted soft smooth curves and a fully kids shape",
    price: 1000000,
    totalStock: 4,
    purchasedCount: 0,
    image: "/images/CMZ_4664.jpg",
    color: "#F7A8B8",
    link: "https://tokopedia.com",
  },
  {
    id: 3,
    name: "Eureka",
    description: "Minimalist table lamp with lindenes effect",
    price: 800000,
    totalStock: 2,
    purchasedCount: 1,
    image: "/images/CMZ_4069.jpg",
    color: "#97C1D9",
    link: "https://shopee.co.id",
  },
  {
    id: 4,
    name: "Vesper lamp",
    description: "Bright orange lamp with modern vibes",
    price: 950000,
    totalStock: 5,
    purchasedCount: 2,
    image: "/images/CMZ_4664.jpg",
    color: "#F5D17E",
    link: "https://tokopedia.com",
  },
  {
    id: 5,
    name: "Bedcover",
    description: "Soft cotton bedcover set",
    price: 2500000,
    totalStock: 4,
    purchasedCount: 0,
    image: "/images/CMZ_4069.jpg",
    color: "#A5C9A1",
    link: "https://tokopedia.com",
  },
  { id: 6, name: "Air Fryer", description: "Digital air fryer 4.5L", price: 850000, totalStock: 2, purchasedCount: 1, image: "/images/CMZ_4664.jpg", color: "#D34D41", link: "https://shopee.co.id" },
  {
    id: 7,
    name: "Coffee Maker",
    description: "Espresso coffee machine",
    price: 650000,
    totalStock: 3,
    purchasedCount: 0,
    image: "/images/CMZ_4069.jpg",
    color: "#97C1D9",
    link: "https://tokopedia.com",
  },
  {
    id: 8,
    name: "Microwave",
    description: "20L digital microwave oven",
    price: 1500000,
    totalStock: 2,
    purchasedCount: 1,
    image: "/images/CMZ_4664.jpg",
    color: "#F7A8B8",
    link: "https://shopee.co.id",
  },
  { id: 9, name: "Blender", description: "Glass jar blender 1.5L", price: 450000, totalStock: 4, purchasedCount: 2, image: "/images/CMZ_4069.jpg", color: "#F5D17E", link: "https://tokopedia.com" },
  {
    id: 10,
    name: "Rice Cooker",
    description: "Smart digital rice cooker",
    price: 750000,
    totalStock: 3,
    purchasedCount: 1,
    image: "/images/CMZ_4664.jpg",
    color: "#A5C9A1",
    link: "https://shopee.co.id",
  },
];

export function LandingPage() {
  const weddingDate = new Date("2026-12-31T08:00:00");
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  const [isOpen, setIsOpen] = useState(false);
  const [isComing, setIsComing] = useState<boolean | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedGiftDetail, setSelectedGiftDetail] = useState<(typeof giftRecommendations)[0] | null>(null);
  const [selectedGiftForm, setSelectedGiftForm] = useState<(typeof giftRecommendations)[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const giftCarouselRef = useRef<HTMLDivElement>(null);
  const [giftScroll, setGiftScroll] = useState({ left: 0, width: 33 });

  const handleGiftScroll = () => {
    if (!giftCarouselRef.current) return;
    const el = giftCarouselRef.current;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    if (scrollWidth > 0) {
      const thumbWidth = (clientWidth / scrollWidth) * 100;
      const thumbLeft = (el.scrollLeft / scrollWidth) * 100;
      setGiftScroll({ left: thumbLeft, width: thumbWidth });
    }
  };

  const galleryImages = [
    { src: "/Gallery/CMZ_3989.jpg", title: "Cinta" },
    { src: "/Gallery/CMZ_4003.jpg", title: "Bahagia" },
    { src: "/Gallery/CMZ_4028.jpg", title: "Selamanya" },
    { src: "/Gallery/CMZ_4050.jpg", title: "Bersama" },
    { src: "/Gallery/CMZ_4051.jpg", title: "Kenangan" },
    { src: "/Gallery/CMZ_4069 (1).jpg", title: "Perjalanan" },
    { src: "/Gallery/CMZ_4130.jpg", title: "Tentang Kita" },
    { src: "/Gallery/CMZ_4152.jpg", title: "Takdir" },
  ];

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const scrollLeft = el.scrollLeft;
    const cardWidth = 240 + 16; // card w-60 (240px) + gap-4 (16px)
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(index, galleryImages.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 240 + 16;
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveSlide(index);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const guestName = searchParams.get("to") || "Tamu Undangan";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Initialize scroll progress for the gift carousel
    handleGiftScroll();
    window.addEventListener("resize", handleGiftScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", handleGiftScroll);
    };
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up animations for general sections
    const fadeUpElements = gsap.utils.toArray(".gsap-fade-up");
    fadeUpElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Scale up animations for specific emphasized sections
    const scaleUpElements = gsap.utils.toArray(".gsap-scale-up");
    scaleUpElements.forEach((el: any) => {
      gsap.fromTo(el,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
    
    // Stagger animations for list items or grouped elements
    const staggerGroups = gsap.utils.toArray(".gsap-stagger-group");
    staggerGroups.forEach((group: any) => {
      const items = group.querySelectorAll(".gsap-stagger-item");
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            scroller: scrollContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: scrollContainerRef });

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#F9E9E7] font-sans">
      {/* LEFT PANEL - Cover on Mobile, Fixed on Desktop */}
      <AnimatePresence>
        {(!isMobile || !isOpen) && (
          <motion.div
            key="left-panel"
            exit={isMobile ? { y: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } } : undefined}
            className={`
              fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#C6A633] overflow-hidden
              lg:relative lg:z-0 lg:flex lg:w-[55%] xl:w-[60%] lg:h-full lg:translate-y-0
            `}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img src="/images/CMZ_4069.jpg" className="w-full h-full object-cover object-center" alt="Hera & Taufik" />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Text Overlay for Left Panel */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 lg:px-16 pb-20">
              <div className="mt-auto mb-16 text-white text-center drop-shadow-xl flex flex-col items-center">
                <p className="font-sans uppercase tracking-[0.2em] text-xs md:text-sm mb-4 font-bold">The Wedding Of</p>
                <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl mb-4 leading-none">
                  Hera &<br />
                  Taufik
                </h1>
                <p className="font-sans font-bold tracking-widest text-sm md:text-base">#meRAyakanTAKdir</p>
              </div>

              {/* Mobile "Open Invitation" Button */}
              {isMobile && (
                <motion.div className="mt-auto mb-12 w-full flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#842434] text-white px-8 py-3.5 rounded-full font-sans text-sm font-semibold tracking-wider shadow-xl transition-transform active:scale-95 flex items-center gap-2"
                  >
                    Buka Undangan
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sunflowers Decorations */}
            <div className="absolute top-[15%] left-[10%] text-5xl md:text-7xl opacity-90 rotate-12 drop-shadow-md">🌻</div>
            <div className="absolute top-[30%] right-[15%] text-4xl md:text-6xl opacity-90 -rotate-12 drop-shadow-md">🌻</div>
            <div className="absolute bottom-[25%] left-[8%] text-4xl md:text-5xl opacity-90 rotate-45 drop-shadow-md">🌻</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT PANEL - Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto relative bg-[#F9E9E7] text-[#1A4A38] scroll-smooth shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-10 flex flex-col [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Language Switcher */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher />
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center justify-start min-h-full py-20 px-6 sm:px-12">
          {/* Top Scalloped Image Frame */}
          <div className="relative w-full max-w-[460px] mx-auto mb-10 px-4 gsap-fade-up">
            {/* Spinning Flowers Decorations for right panel */}
            <div className="absolute top-0 -right-2 text-[#EED372]/60 text-5xl z-10 animate-[spin_10s_linear_infinite]">✽</div>
            <div className="absolute bottom-20 -left-4 text-[#842434]/40 text-4xl z-10 animate-[spin_14s_linear_infinite_reverse]">✽</div>

            {/* Using the pre-cut image instead of CSS mask */}
            <img src="/images/image2.png" className="w-full h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] relative z-0" alt="Hera & Taufik Studio" />
          </div>

          {/* Typography Section */}
          <div className="text-center mb-16 w-full px-4 gsap-fade-up">
            <p className="text-[#2E5B3D] font-sans text-xs md:text-sm tracking-[0.25em] uppercase mb-4">Wedding Invitation</p>
            <h2 className="text-[#842434] font-serif text-6xl md:text-7xl font-semibold mb-4 leading-tight">
              Hera &<br />
              Taufik
            </h2>
            <p className="text-[#2E5B3D] font-sans font-bold text-sm md:text-base tracking-[0.1em] mb-8">#meRAyakanTAKdir</p>

            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-[#842434]/40"></div>
              <div className="text-[#842434] text-xs">♥</div>
              <div className="h-[1px] w-16 bg-[#842434]/40"></div>
            </div>
          </div>
        </div>

        {/* Flexible spacer to ensure minimum gap between content and checkerboard */}
        <div className="flex-grow min-h-16"></div>

        {/* Top Checkerboard border */}
        <div
          className="w-full h-24 shrink-0 z-20"
          style={{
            backgroundImage: "conic-gradient(#1A4A38 90deg, #FFFFFF 90deg 180deg, #1A4A38 180deg 270deg, #FFFFFF 270deg)",
            backgroundSize: "64px 64px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Yellow Quote Card */}
        <div className="w-full bg-[#E5C158] py-20 px-8 relative flex flex-col items-center text-center shrink-0 gsap-fade-up">
          {/* Spinning Flowers */}
          <div className="absolute top-8 left-6 text-[#1A4A38]/20 text-4xl md:text-5xl animate-[spin_8s_linear_infinite]">✽</div>
          <div className="absolute bottom-8 right-6 text-[#842434]/20 text-4xl md:text-5xl animate-[spin_12s_linear_infinite_reverse]">✽</div>

          <h3 className="text-[#1A4A38] font-serif text-3xl md:text-4xl mb-6 font-semibold">“Sebuah Perjalanan Pulang”</h3>
          <p className="text-[#1A4A38] font-serif italic text-lg md:text-xl leading-relaxed max-w-[480px]">
            “Banyak yang bilang bahwa jatuh cinta itu adalah hal yang sederhana. Namun, tetap saling memilih di tengah badai, menjaga disaat rapuh, dan bertahan ketika dunia meminta menyerah - itulah
            cinta yang sesungguhnya”
          </p>
        </div>

        {/* Middle Checkerboard border */}
        <div
          className="w-full h-24 shrink-0 z-20"
          style={{
            backgroundImage: "conic-gradient(#1A4A38 90deg, #FFFFFF 90deg 180deg, #1A4A38 180deg 270deg, #FFFFFF 270deg)",
            backgroundSize: "64px 64px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Our Love Story Section */}
        <div className="flex flex-col items-center justify-start py-16 px-6 sm:px-12 bg-[#F9E9E7] relative shrink-0 overflow-hidden gsap-fade-up">
          {/* Floating Flowers */}
          <div className="absolute top-10 left-10 text-[#EED372]/40 text-6xl animate-[spin_18s_linear_infinite]">✽</div>
          <div className="absolute bottom-10 right-10 text-[#1A4A38]/20 text-5xl animate-[spin_14s_linear_infinite_reverse]">✽</div>
          <div className="absolute top-1/2 -right-4 text-[#842434]/10 text-7xl animate-[spin_20s_linear_infinite]">✽</div>

          <h2 className="text-[#842434] font-serif text-5xl md:text-6xl mb-10 text-center relative z-10">Our Love Story</h2>

          <div className="w-full max-w-[440px] flex flex-col gap-2 mb-20">
            <StoryAccordion
              title="Tentang Bertahan"
              imageSrc="/images/CMZ_4069.jpg"
              isOpen={activeStory === 0}
              onClick={() => setActiveStory(activeStory === 0 ? null : 0)}
              content="Perjalanan kita terlalu panjang untuk sekadar diceritakan dengan kata-kata. Bagi kami, cinta bukan hanya tentang pertemuan awal, melainkan keputusan untuk memilih tetap tinggal saat keadaan terasa sulit. Sebagai dua manusia biasa yang penuh kekurangan, kami belajar bahwa takdir mempertemukan kita bukan hanya untuk singgah, tapi untuk saling menguatkan selamanya"
            />
            <StoryAccordion
              title="Ujian & Bukti"
              imageSrc="/images/CMZ_4664.jpg"
              isOpen={activeStory === 1}
              onClick={() => setActiveStory(activeStory === 1 ? null : 1)}
              content="Perjalanan ini tidak selalu mudah; ada air mata dan keraguan yang menguji keyakinan kami. Namun, kami memilih untuk bertahan karena doa yang tak putus dan hati yang terus memilih untuk berjuang. Kini, segala luka itu bermuara pada restu, mempersatukan dua keluarga dalam harapan yang sama."
            />
            <StoryAccordion
              title="Kisah Dan Keyakinan"
              imageSrc="/images/CMZ_4069.jpg"
              isOpen={activeStory === 2}
              onClick={() => setActiveStory(activeStory === 2 ? null : 2)}
              content="Kami percaya bahwa setiap doa akan dijawab pada waktu terbaik-Nya. Dengan penuh syukur, kami menantikan hari sakral saat dua jiwa dipersatukan dalam ikatan suci."
            />
            <StoryAccordion
              title="Merayakan Takdir Ini"
              imageSrc="/images/CMZ_4664.jpg"
              isOpen={activeStory === 3}
              onClick={() => setActiveStory(activeStory === 3 ? null : 3)}
              content="Sebentar lagi, perjalanan kami akan melangkah ke babak baru, menyatukan dua hati dalam satu tujuan di bawah naungan cinta-Nya. Mohon doa restunya, agar setiap langkah kami ke depan selalu dipeluk oleh lembutnya takdir dan diberkahi kebahagiaan yang takkan lekang oleh waktu."
            />
          </div>
        </div>

        {/* Third Checkerboard border */}
        <div
          className="w-full h-24 shrink-0 z-20"
          style={{
            backgroundImage: "conic-gradient(#1A4A38 90deg, #FFFFFF 90deg 180deg, #1A4A38 180deg 270deg, #FFFFFF 270deg)",
            backgroundSize: "64px 64px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Profile Section */}
        <div className="flex flex-col items-center justify-start py-20 px-6 sm:px-12 bg-[#F9E9E7] relative shrink-0 overflow-hidden gsap-stagger-group">
          {/* Floating Flowers */}
          <div className="absolute top-20 left-1/2 text-[#842434]/10 text-[6rem] animate-[spin_25s_linear_infinite]">✽</div>

          <div className="text-center mb-16 relative z-10 gsap-stagger-item">
            <h2 className="text-[#842434] font-sans text-3xl md:text-4xl uppercase tracking-[0.2em] mb-3 font-bold">The Wedding Of</h2>
            <p className="text-[#2E5B3D] font-sans text-xs md:text-sm italic">We Cordially Invite You To The Our Wedding</p>
          </div>

          {/* Bride Profile */}
          <div className="flex flex-col items-center text-center mb-16 relative z-10 w-full max-w-sm gsap-stagger-item">
            <div className="absolute top-10 -left-12 text-[#EED372]/60 text-5xl animate-[spin_12s_linear_infinite_reverse]">✽</div>

            <img 
              src="/images/Hera.png" 
              className="w-72 h-72 md:w-80 md:h-80 mb-8 object-contain" 
              alt="Hera Nurimani" 
            />

            <h3 className="text-[#842434] font-serif text-3xl md:text-4xl mb-3 font-semibold">Hera Nurimani S.M</h3>
            <div className="text-[#2E5B3D] font-sans text-xs md:text-sm mb-6 leading-relaxed font-medium">
              <p>Putri Dari</p>
              <p>Bpk. alm Maman Kadarusman</p>
              <p>Ibu. Enung Sunarti</p>
            </div>

            <a
              href="https://instagram.com/heranurimani"
              target="_blank"
              rel="noreferrer"
              className="bg-[#842434] hover:bg-[#6A1D2A] text-[#C6A633] px-8 py-3 rounded-full font-sans text-xs md:text-sm font-semibold tracking-widest transition-all shadow-md active:scale-95"
            >
              @heranurimani
            </a>
          </div>

          {/* Divider '&' */}
          <div className="text-[#842434] font-serif text-6xl md:text-7xl mb-16 relative z-10 gsap-stagger-item">&</div>

          {/* Groom Profile */}
          <div className="flex flex-col items-center text-center mb-10 relative z-10 w-full max-w-sm gsap-stagger-item">
            <div className="absolute top-10 -right-12 text-[#1A4A38]/30 text-5xl animate-[spin_10s_linear_infinite]">✽</div>

            <img 
              src="/images/Taufik.png" 
              className="w-72 h-72 md:w-80 md:h-80 mb-8 object-contain" 
              alt="Taufik Nurdiansyah" 
            />

            <h3 className="text-[#842434] font-serif text-3xl md:text-4xl mb-3 font-semibold">Taufik Nurdiansyah S.Kom</h3>
            <div className="text-[#2E5B3D] font-sans text-xs md:text-sm mb-6 leading-relaxed font-medium">
              <p>Putra Dari</p>
              <p>Bpk. Dadi Sutrisna</p>
              <p>Ibu. Siti Solihat</p>
            </div>

            <a
              href="https://instagram.com/itsbeatsbypiko"
              target="_blank"
              rel="noreferrer"
              className="bg-[#842434] hover:bg-[#6A1D2A] text-[#C6A633] px-8 py-3 rounded-full font-sans text-xs md:text-sm font-semibold tracking-widest transition-all shadow-md active:scale-95"
            >
              @itsbeatsbypiko
            </a>
          </div>
        </div>

        {/* Bottom Checkerboard border */}
        <div
          className="w-full h-24 shrink-0 z-20"
          style={{
            backgroundImage: "conic-gradient(#1A4A38 90deg, #FFFFFF 90deg 180deg, #1A4A38 180deg 270deg, #FFFFFF 270deg)",
            backgroundSize: "64px 64px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Save The Date Section */}
        <div className="flex flex-col items-center justify-center py-40 px-6 sm:px-12 bg-[#F9E9E7] relative shrink-0 overflow-hidden gsap-fade-up">
          {/* Floating Flowers */}
          <div className="absolute top-12 left-8 text-[#EED372]/50 text-5xl animate-[spin_10s_linear_infinite]">✽</div>
          <div className="absolute bottom-20 right-6 text-[#842434]/20 text-6xl animate-[spin_15s_linear_infinite_reverse]">✽</div>

          {/* Custom Animation Styles */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes swayLeft {
              0%, 100% { transform: rotate(-12deg) scale(1.1); }
              50% { transform: rotate(-5deg) scale(1.1); }
            }
            @keyframes swayRight {
              0%, 100% { transform: rotate(12deg) scale(1.1); }
              50% { transform: rotate(5deg) scale(1.1); }
            }
          `}} />

          {/* Wavy Frame Image */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <img src="/assets/frame.png" alt="Frame Decoration" className="w-full h-full object-fill opacity-100" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-[400px]">
            <h2 className="text-[#842434] text-5xl md:text-6xl mb-8 font-bold tracking-wide text-center leading-tight" style={{ fontFamily: "'Cormorant', serif" }}>
              Save The<br />Date
            </h2>

            {/* Countdown timer Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 md:gap-6 mb-8 w-full max-w-[280px] md:max-w-[320px]">
              {/* Sunflower Left */}
              <div className="absolute -left-[4.5rem] top-1/4 z-0 pointer-events-none origin-bottom" style={{ animation: 'swayLeft 4s ease-in-out infinite' }}>
                <svg width="100" height="120" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible drop-shadow-md">
                  <path d="M 40,50 Q 50,80 35,100" fill="none" stroke="#1A4A38" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 42,70 Q 20,75 15,60 Q 25,50 40,60" fill="#6A994E" stroke="#1A4A38" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M 45,85 Q 65,90 70,75 Q 60,65 40,75" fill="#6A994E" stroke="#1A4A38" strokeWidth="1.5" strokeLinejoin="round" />
                  <g transform="translate(40, 40)">
                    {[...Array(12)].map((_, i) => (
                      <path key={i} transform={`rotate(${i * 30})`} d="M 0,0 C 10,-15 10,-30 0,-35 C -10,-30 -10,-15 0,0" fill="#EED372" stroke="#B88A44" strokeWidth="1" />
                    ))}
                    <circle r="14" fill="#5B3A29" />
                    <circle r="10" fill="#4A2A1A" stroke="#3A2216" strokeWidth="1" strokeDasharray="2 2" />
                  </g>
                </svg>
              </div>
              
              {/* Sunflower Right */}
              <div className="absolute -right-[4.5rem] bottom-0 z-0 pointer-events-none origin-bottom" style={{ animation: 'swayRight 4.5s ease-in-out infinite' }}>
                <svg width="100" height="120" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible drop-shadow-md">
                  <path d="M 40,50 Q 30,80 45,100" fill="none" stroke="#1A4A38" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 38,70 Q 60,75 65,60 Q 55,50 40,60" fill="#6A994E" stroke="#1A4A38" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M 35,85 Q 15,90 10,75 Q 20,65 40,75" fill="#6A994E" stroke="#1A4A38" strokeWidth="1.5" strokeLinejoin="round" />
                  <g transform="translate(40, 40)">
                    {[...Array(12)].map((_, i) => (
                      <path key={i} transform={`rotate(${i * 30})`} d="M 0,0 C 10,-15 10,-30 0,-35 C -10,-30 -10,-15 0,0" fill="#EED372" stroke="#B88A44" strokeWidth="1" />
                    ))}
                    <circle r="14" fill="#5B3A29" />
                    <circle r="10" fill="#4A2A1A" stroke="#3A2216" strokeWidth="1" strokeDasharray="2 2" />
                  </g>
                </svg>
              </div>

              {/* Box Components */}
              <div className="bg-white rounded-3xl aspect-[3/4] flex flex-col items-center justify-center border-[3px] border-[#F2D675] shadow-[6px_8px_15px_rgba(0,0,0,0.2)] relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-[#842434] italic font-black text-5xl md:text-6xl mb-1">{days}</span>
                <span className="text-[#1A4A38] italic text-sm md:text-base font-semibold">Days</span>
              </div>
              
              <div className="bg-white rounded-3xl aspect-[3/4] flex flex-col items-center justify-center border-[3px] border-[#F2D675] shadow-[6px_8px_15px_rgba(0,0,0,0.2)] relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-[#842434] italic font-black text-5xl md:text-6xl mb-1">{hours}</span>
                <span className="text-[#1A4A38] italic text-sm md:text-base font-semibold">Hours</span>
              </div>

              <div className="bg-white rounded-3xl aspect-[3/4] flex flex-col items-center justify-center border-[3px] border-[#F2D675] shadow-[6px_8px_15px_rgba(0,0,0,0.2)] relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-[#842434] italic font-black text-5xl md:text-6xl mb-1">{minutes}</span>
                <span className="text-[#1A4A38] italic text-sm md:text-base font-semibold">Minutes</span>
              </div>

              <div className="bg-white rounded-3xl aspect-[3/4] flex flex-col items-center justify-center border-[3px] border-[#F2D675] shadow-[6px_8px_15px_rgba(0,0,0,0.2)] relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-[#842434] italic font-black text-5xl md:text-6xl mb-1">{seconds}</span>
                <span className="text-[#1A4A38] italic text-sm md:text-base font-semibold">Second</span>
              </div>
            </div>

            <button className="bg-[#0E4718] hover:bg-[#0A3311] text-white px-8 py-3.5 mt-4 rounded-full text-sm md:text-base transition-all shadow-[0_4px_10px_rgba(14,71,24,0.3)] active:scale-95 z-10 font-medium tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              Add to Calender
            </button>
          </div>
        </div>

        {/* Gallery Carousel Section */}
        <div className="w-full bg-[#F9E9E7] relative shrink-0 py-16 px-6 overflow-hidden gsap-fade-up">
          {/* Floating Flowers */}
          <div className="absolute top-10 right-10 text-[#842434]/20 text-5xl animate-[spin_12s_linear_infinite_reverse]">✽</div>
          <div className="absolute bottom-10 left-10 text-[#EED372]/40 text-4xl animate-[spin_8s_linear_infinite]">✽</div>

          <h2 className="text-[#842434] font-serif text-4xl md:text-5xl mb-12 font-semibold text-center relative z-10">POTRAITS OF LOVE</h2>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-6 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .snap-x::-webkit-scrollbar { display: none; }
            `,
              }}
            />

            {galleryImages.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedImage(item.src)}
                className="snap-center shrink-0 w-60 bg-white rounded-2xl shadow-lg cursor-zoom-in flex flex-col overflow-hidden border border-[#EED372]/40"
              >
                <div className="w-full h-72 bg-slate-100 overflow-hidden rounded-t-2xl">
                  <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="w-full py-4 px-3 flex items-center justify-center bg-white rounded-b-2xl">
                  <p className="font-sans text-[#5B4F48] text-sm text-center font-medium">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`rounded-full transition-all duration-300 ${activeSlide === idx ? "w-3 h-3 bg-[#1A4A38] scale-110" : "w-2.5 h-2.5 bg-[#C4B8A8] hover:bg-[#9E9183]"}`}
              />
            ))}
          </div>
        </div>

        {/* It's Wedding Day Section */}
        <div className="w-full bg-[#F9DB7A] flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up">
          {/* Top Checkerboard Border (2 Rows) */}
          <div
            className="w-full h-[80px]"
            style={{
              backgroundImage: "conic-gradient(#F9DB7A 90deg, #FFFFFF 90deg 180deg, #F9DB7A 180deg 270deg, #FFFFFF 270deg)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Random Spinning Flowers (More Visible) */}
          <div className="absolute top-[15%] left-[5%] text-[#FFFFFF]/70 text-5xl animate-[spin_10s_linear_infinite] blur-[0.5px]">✽</div>
          <div className="absolute top-[40%] right-[8%] text-[#FFFFFF]/50 text-7xl animate-[spin_15s_linear_infinite_reverse] blur-[1px]">✽</div>
          <div className="absolute bottom-[20%] left-[10%] text-[#FFFFFF]/60 text-6xl animate-[spin_12s_linear_infinite] blur-[0.5px]">✽</div>
          <div className="absolute top-[60%] left-[2%] text-[#FFFFFF]/40 text-4xl animate-[spin_8s_linear_infinite_reverse]">✽</div>
          <div className="absolute bottom-[10%] right-[5%] text-[#FFFFFF]/55 text-5xl animate-[spin_20s_linear_infinite]">✽</div>

          <div className="py-16 px-8 flex flex-col items-center text-center w-full max-w-2xl relative z-10">
            <h2 className="text-[#842434] font-sans text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight">IT'S WEDDING DAY</h2>

            {/* Akad Section (Interlocking Rings) */}
            <div className="flex flex-col items-center mb-12">
              <div className="mb-6 text-[#1A4A38]">
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="30" cy="35" rx="20" ry="15" stroke="currentColor" strokeWidth="4" fill="none" />
                  <ellipse cx="50" cy="25" rx="20" ry="15" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M40 10 Q45 5, 50 10 L45 15 Z" fill="currentColor" />
                </svg>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-[#1A4A38] font-serif italic text-xl mb-1">Sunday</span>
                <span className="text-[#842434] font-sans text-8xl font-black leading-none mb-2" style={{ WebkitTextStroke: "2px #842434" }}>14</span>
                <span className="text-[#1A4A38] font-serif italic text-xl mb-2">June, 2026</span>
                <span className="text-[#842434] font-sans text-2xl font-bold tracking-tight">08.00 - 10.00</span>
              </div>
            </div>

            {/* Resepsi Section (Toasting Glasses) */}
            <div className="flex flex-col items-center mb-12">
              <div className="mb-6 text-[#1A4A38]">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35 50 L25 75 M35 75 L15 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M45 50 L55 75 M45 75 L65 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M25 50 Q20 40 25 20 L45 20 Q50 40 45 50 Z" fill="currentColor" opacity="0.9" />
                  <path d="M55 50 Q60 40 55 20 L35 20 Q30 40 35 50 Z" fill="currentColor" opacity="0.9" />
                  <path d="M40 15 L40 5 M35 10 L45 10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-[#1A4A38] font-sans text-4xl font-black mb-4 uppercase tracking-tighter">Resepsi</h3>
                <span className="text-[#1A4A38] font-serif italic text-xl mb-1">Sunday</span>
                <span className="text-[#842434] font-sans text-8xl font-black leading-none mb-2">14</span>
                <span className="text-[#1A4A38] font-serif italic text-xl mb-4">June, 2026</span>
                <span className="text-[#842434] font-sans text-2xl font-bold tracking-tight mb-8">11.00 - 14.00</span>
              </div>
            </div>

            {/* Location Section */}
            <div className="flex flex-col items-center mb-12">
              <div className="flex items-center gap-2 text-[#842434] mb-4">
                <MapPin className="w-6 h-6 fill-[#842434]" />
                <span className="font-serif italic text-2xl font-bold">Duta Family Estate</span>
              </div>
              <p className="text-[#1A4A38] font-serif italic text-lg md:text-xl max-w-xs leading-relaxed font-medium">
                Sindangpakuon, Kec. Cimanggung, Kabupaten Sumedang, Jawa Barat 45364
              </p>
            </div>

            <a
              href="https://maps.app.goo.gl/..."
              target="_blank"
              rel="noreferrer"
              className="bg-[#054212] hover:bg-[#032a0b] text-[#F9E9E7] px-12 py-4 rounded-full font-sans text-sm font-bold tracking-widest transition-all shadow-[0_4px_0px_#021a07] active:translate-y-[2px] active:shadow-none"
            >
              View Maps
            </a>
          </div>

          {/* Bottom Checkerboard Border (2 Rows) */}
          <div
            className="w-full h-[80px]"
            style={{
              backgroundImage: "conic-gradient(#F9DB7A 90deg, #FFFFFF 90deg 180deg, #F9DB7A 180deg 270deg, #FFFFFF 270deg)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* RSVP Section */}
        <div className="w-full bg-[#F9E9E7] py-24 px-6 flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up">
          {/* Background decorations */}
          <div className="absolute top-20 right-10 text-[#842434]/20 text-6xl animate-[spin_16s_linear_infinite]">✽</div>
          <div className="absolute bottom-40 left-10 text-[#EED372]/50 text-5xl animate-[spin_12s_linear_infinite_reverse]">✽</div>
          <div className="absolute top-1/2 left-4 text-[#1A4A38]/10 text-7xl animate-[spin_20s_linear_infinite]">✽</div>

          {/* RSVP Header */}
          <div className="relative w-full max-w-[400px] flex flex-col items-center mb-16">
            {/* SVG Illustrations */}
            <div className="absolute -top-8 left-0 w-20 h-24 opacity-80 pointer-events-none drop-shadow-sm">
              <svg viewBox="0 0 100 100" fill="none" stroke="#842434" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M 20,80 L 80,80" />
                <path d="M 25,60 L 75,60" />
                <path d="M 35,40 L 65,40" />
                <path d="M 20,80 C 20,85 80,85 80,80 C 80,75 20,75 20,80" />
                <path d="M 25,60 C 25,65 75,65 75,60 L 75,80 C 75,85 25,85 25,80" />
                <path d="M 35,40 C 35,45 65,45 65,40 L 65,60 C 65,65 35,65 35,60" />
                <path d="M 50,40 L 50,25 M 46,25 C 46,20 54,20 54,25 C 54,30 46,30 46,25" />
                <circle cx="30" cy="70" r="4" />
                <circle cx="70" cy="70" r="4" />
                <circle cx="50" cy="70" r="4" />
                <circle cx="40" cy="50" r="3" />
                <circle cx="60" cy="50" r="3" />
              </svg>
            </div>

            <div className="absolute top-16 -right-6 w-24 h-28 opacity-80 pointer-events-none drop-shadow-sm rotate-[15deg]">
              <svg viewBox="0 0 100 100" fill="none" stroke="#842434" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M 45,60 L 40,95 M 50,60 L 50,100 M 55,60 L 60,95" />
                <path d="M 35,75 Q 50,85 65,75" />
                <path d="M 50,80 Q 40,90 35,100" />
                <path d="M 50,80 Q 60,90 65,100" />
                <circle cx="40" cy="40" r="10" />
                <circle cx="60" cy="40" r="10" />
                <circle cx="50" cy="25" r="12" />
                <circle cx="30" cy="55" r="7" />
                <circle cx="70" cy="55" r="7" />
                <circle cx="50" cy="55" r="8" />
              </svg>
            </div>

            <div className="absolute bottom-16 -left-4 w-24 h-24 opacity-80 pointer-events-none drop-shadow-sm -rotate-[10deg]">
              <svg viewBox="0 0 100 100" fill="none" stroke="#842434" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M 20,40 C 20,40 30,70 50,70 L 60,60 C 60,60 40,55 35,30 Z" />
                <path d="M 20,40 L 20,85 M 25,85 L 15,85" />
                <path d="M 35,30 Q 25,30 25,40" />
                <path d="M 35,50 C 35,50 45,80 65,80 L 75,70 C 75,70 55,65 50,40 Z" />
                <path d="M 35,50 L 35,95 M 40,95 L 30,95" />
                <path d="M 50,40 Q 40,40 40,50" />
                <path d="M 18,35 Q 10,25 5,35 Z" />
                <path d="M 33,45 Q 25,35 20,45 Z" />
              </svg>
            </div>

            <div className="flex flex-col items-center justify-center relative z-10 mb-8">
              <div className="flex justify-center gap-4 text-[#842434] font-sans text-[6rem] sm:text-[7rem] font-bold leading-none tracking-tighter">
                <span>R</span>
                <span>S</span>
              </div>
              <div className="flex justify-center gap-4 text-[#842434] font-sans text-[6rem] sm:text-[7rem] font-bold leading-none tracking-tighter">
                <span>V</span>
                <span>P</span>
              </div>
            </div>

            <p className="text-[#842434] font-sans text-sm md:text-base text-center max-w-[300px] font-medium leading-relaxed z-10">
              Kindly RSVP by January 15th, 2026, to help us with the final arrangements for our special day.
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[400px] bg-[#F9E9E7] rounded-[2.5rem] border-[3px] border-[#842434] p-8 sm:p-10 shadow-[6px_8px_0px_#1A4A38] relative flex flex-col items-center z-10">
            <h3 className="text-[#EE7B7B] font-sans text-3xl font-black text-center mb-8 uppercase tracking-tight leading-[1.1]" style={{ textShadow: "2px 2px 0px rgba(132, 36, 52, 0.1)" }}>
              KONFIRMASI
              <br />
              KEHADIRAN
            </h3>

            <div className="flex flex-col gap-6 w-full">
              {/* Question 1: Kehadiran */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-[#1A4A38] font-sans font-medium text-[15px] text-center">Apakah kamu datang?</p>
                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={() => setIsComing(true)}
                    className={`w-full py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all border border-[#1A4A38] ${
                      isComing === true ? "bg-[#1A4A38] text-white shadow-inner" : "bg-[#F9E9E7] text-[#1A4A38] hover:bg-[#1A4A38]/5"
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    onClick={() => setIsComing(false)}
                    className={`w-full py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all border border-[#1A4A38] ${
                      isComing === false ? "bg-[#1A4A38] text-white shadow-inner" : "bg-[#F9E9E7] text-[#1A4A38] hover:bg-[#1A4A38]/5"
                    }`}
                  >
                    Tidak Hadir
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isComing === true && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-6 overflow-hidden">
                    {/* Question 2: Acara */}
                    <div className="flex flex-col items-center gap-4 pt-2">
                      <p className="text-[#1A4A38] font-sans font-medium text-[15px] text-center">Acara mana yang akan Anda hadiri?</p>
                      <div className="flex flex-col w-full gap-3">
                        {["Akad Nikah", "Resepsi", "Hadir Semua"].map((event) => {
                          const isSelected = selectedEvents.includes(event);
                          const toggleEvent = () => {
                            if (event === "Hadir Semua") {
                              if (isSelected) {
                                setSelectedEvents([]);
                              } else {
                                setSelectedEvents(["Akad Nikah", "Resepsi", "Hadir Semua"]);
                              }
                            } else {
                              let updated = selectedEvents.filter((e) => e !== "Hadir Semua");
                              if (updated.includes(event)) {
                                updated = updated.filter((e) => e !== event);
                              } else {
                                updated.push(event);
                              }

                              if (updated.includes("Akad Nikah") && updated.includes("Resepsi")) {
                                updated.push("Hadir Semua");
                              }
                              setSelectedEvents(updated);
                            }
                          };

                          return (
                            <button
                              key={event}
                              onClick={toggleEvent}
                              className={`w-full py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all border border-[#1A4A38] ${
                                isSelected ? "bg-[#1A4A38] text-white shadow-inner" : "bg-transparent text-[#1A4A38] hover:bg-[#1A4A38]/5"
                              }`}
                            >
                              {event}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 3: Jumlah Tamu */}
                    <div className="flex flex-col items-center gap-4 pt-2">
                      <p className="text-[#1A4A38] font-sans font-medium text-[15px] text-center px-4 leading-relaxed">Jumlah tamu yang datang termasuk kamu?</p>
                      <div className="flex items-center justify-between w-full gap-3">
                        <button
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-10 h-10 shrink-0 rounded-full border border-[#1A4A38] text-[#1A4A38] flex items-center justify-center text-xl font-light hover:bg-[#1A4A38]/5 transition-colors"
                        >
                          −
                        </button>
                        <div className="flex-1 h-10 rounded-full border border-[#1A4A38] flex items-center justify-center text-[#1A4A38] font-sans font-semibold text-base bg-white shadow-inner">
                          {guestCount}
                        </div>
                        <button
                          onClick={() => setGuestCount(guestCount + 1)}
                          className="w-10 h-10 shrink-0 rounded-full bg-[#1A4A38] text-white flex items-center justify-center text-xl font-light hover:bg-[#123628] transition-colors shadow-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="w-full bg-[#1A4A38] hover:bg-[#123628] text-white py-4 rounded-full font-sans font-bold text-base tracking-wide transition-all shadow-md active:scale-95 mt-4">
                Konfirmasi
              </button>
            </div>
          </div>
        </div>

        {/* Gift Recommendation Section */}
        <div className="w-full bg-[#F5F1E7] py-24 px-6 flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up">
          {/* Floating Spinning Flowers */}
          <div className="absolute top-10 right-10 text-[#D34D41]/20 text-6xl animate-[spin_14s_linear_infinite_reverse]">✽</div>
          <div className="absolute bottom-20 left-5 text-[#A5C9A1]/30 text-[5rem] animate-[spin_20s_linear_infinite]">✽</div>
          <div className="absolute top-1/2 right-4 text-[#F5D17E]/40 text-5xl animate-[spin_10s_linear_infinite]">✽</div>
          <div className="absolute top-32 left-1/4 text-[#97C1D9]/30 text-4xl animate-[spin_8s_linear_infinite_reverse]">✽</div>

          <div className="w-full max-w-4xl">
            <h2 className="text-[#D34D41] font-serif italic text-4xl md:text-5xl font-bold mb-10 text-left px-2">You might like</h2>
          </div>

          <div
            ref={giftCarouselRef}
            onScroll={handleGiftScroll}
            className="flex gap-6 overflow-x-auto w-full max-w-4xl pb-8 px-2 snap-x snap-mandatory justify-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {giftRecommendations.map((gift) => (
              <div
                key={gift.id}
                className="snap-center shrink-0 w-[260px] flex flex-col relative transition-transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => setSelectedGiftDetail(gift)}
              >
                {/* Top Solid Color Section */}
                <div
                  className="w-full h-64 rounded-[2rem] p-4 flex flex-col items-center justify-center relative transition-shadow duration-300 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: gift.color }}
                >
                  {/* Top left badge */}
                  <div className="absolute top-5 left-5 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full text-[#842434] font-sans text-[10px] font-black tracking-widest uppercase">
                    {gift.totalStock} Left
                  </div>

                  {/* Heart icon */}
                  <button className="absolute top-5 right-5 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#842434] hover:bg-white transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div className="w-40 h-40 mt-4 rounded-full overflow-hidden shadow-2xl border-[4px] border-white/20">
                    <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Bottom Text Section */}
                <div className="w-full mt-4 px-2 flex justify-between items-start gap-3">
                  <div className="flex flex-col flex-1">
                    <div className="text-[#D34D41] font-serif font-bold text-xl leading-tight">
                      {gift.name} <span className="font-sans font-semibold text-[#D34D41]/70 ml-1 text-base tracking-wide">{gift.price / 1000}$</span>
                    </div>
                    <div className="text-[#D34D41]/60 font-sans text-xs mt-1 leading-snug font-medium pr-2">{gift.description}</div>
                  </div>

                  {/* Cart Icon Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGiftDetail(gift);
                    }}
                    className="w-10 h-10 shrink-0 bg-[#D34D41] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar and Show more button */}
          <div className="w-full max-w-4xl px-4 mt-6 flex items-center justify-between gap-6">
            <div className="flex-1 h-1.5 bg-[#D34D41]/20 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 h-full bg-[#D34D41] rounded-full transition-all duration-75 ease-linear"
                style={{
                  width: `${giftScroll.width}%`,
                  left: `${giftScroll.left}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Bottom Checkerboard border */}
        <div
          className="w-full h-24 shrink-0 z-20"
          style={{
            backgroundImage: "conic-gradient(#1A4A38 90deg, #FFFFFF 90deg 180deg, #1A4A38 180deg 270deg, #FFFFFF 270deg)",
            backgroundSize: "64px 64px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Thank You Section */}
        <div className="w-full bg-[#F9E9E7] flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up">
          {/* Floating Spinning Flowers */}
          <div className="absolute top-12 left-8 text-[#EED372] text-3xl animate-[spin_8s_linear_infinite]">✽</div>
          <div className="absolute bottom-16 right-10 text-[#842434]/20 text-6xl animate-[spin_12s_linear_infinite_reverse]">✽</div>
          <div className="absolute top-1/2 left-6 text-[#1A4A38]/10 text-4xl animate-[spin_6s_linear_infinite]">✽</div>
          <div className="absolute top-20 right-16 text-[#EED372]/60 text-5xl animate-[spin_10s_linear_infinite]">✽</div>

          <div className="py-24 px-8 md:px-12 flex flex-col items-center text-center relative z-10">
            <h2 className="text-[#842434] font-serif italic text-4xl md:text-5xl font-black mb-10">Thank You</h2>

            <p className="text-[#1A4A38] font-serif italic text-lg md:text-xl leading-relaxed max-w-md">
              From the bottom of our hearts we just want to thank you for being part of our big day. We are extremely lucky to have each of you in our lives and honored you could be here with us.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="w-full bg-[#1A4A38] pt-16 pb-12 px-8 flex flex-col items-center shrink-0 relative overflow-hidden">
          {/* Floating Spinning Flowers */}
          <div className="absolute top-20 left-6 text-[#EED372]/20 text-5xl animate-[spin_10s_linear_infinite]">✽</div>
          <div className="absolute bottom-40 right-8 text-[#EED372]/10 text-[5rem] animate-[spin_15s_linear_infinite_reverse]">✽</div>
          <div className="absolute top-1/2 -translate-y-1/2 left-[20%] text-[#EED372]/5 text-8xl animate-[spin_20s_linear_infinite]">✽</div>
          <div className="absolute bottom-20 left-12 text-[#F9E9E7]/10 text-3xl animate-[spin_8s_linear_infinite_reverse]">✽</div>
          <div className="absolute top-32 right-1/4 text-[#F9E9E7]/10 text-6xl animate-[spin_12s_linear_infinite]">✽</div>

          {/* Main Brand */}
          <div className="flex items-center gap-3 mb-10 relative z-10">
            <h2 className="text-[#F9E9E7] font-sans text-4xl md:text-5xl font-black uppercase tracking-widest">HERA & TAUFIK</h2>
            <div className="text-[#EED372] text-4xl mt-[-8px] animate-[spin_6s_linear_infinite]">✽</div>
          </div>

          <div className="w-full max-w-sm border-t-[3px] border-dashed border-[#F9E9E7]/20 mb-10"></div>

          {/* Socials */}
          <div className="flex flex-col items-center mb-10">
            <h3 className="text-[#F9E9E7] font-sans font-bold text-lg mb-6 tracking-wide">Our socials</h3>
            <div className="flex gap-4">
              {["ig", "wa", "yt", "tk"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 rounded-full border-[1.5px] border-[#F9E9E7]/40 flex items-center justify-center text-[#F9E9E7] hover:bg-[#F9E9E7] hover:text-[#1A4A38] transition-colors"
                >
                  {social === "ig" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                  {social === "wa" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  )}
                  {social === "yt" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  )}
                  {social === "tk" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="flex flex-col items-center mb-10 text-[#F9E9E7] font-sans">
            <h3 className="font-bold text-lg mb-6 tracking-wide">Our contacts</h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#F9E9E7] text-[#1A4A38] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
              <span className="font-medium text-sm">@hera_taufik</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-[#F9E9E7] text-[#1A4A38] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <span className="font-medium text-sm">wedding@herataufik.com</span>
            </div>

            <p className="text-center text-[13px] font-medium opacity-80 leading-relaxed max-w-xs mt-2">
              Jakarta Selatan, Jalan Kenangan Indah No. 12
              <br />
              Jakarta, Indonesia
            </p>
          </div>

          <div className="w-full max-w-sm border-t-[3px] border-dashed border-[#F9E9E7]/20 mb-8"></div>

          {/* Copyright / Footer Note */}
          <div className="flex flex-col items-center text-[#F9E9E7]/60 font-sans text-xs">
            <div className="flex gap-4 mb-4 font-medium">
              <a href="#" className="hover:text-[#F9E9E7] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#F9E9E7] transition-colors">
                Website Details
              </a>
            </div>
            <p className="font-semibold tracking-wide">© 2026 Hera & Taufik. Powered By Hilmi</p>
          </div>
        </div>
      </div>

      {/* Detail Hadiah Modal */}
      <AnimatePresence>
        {selectedGiftDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-[360px] flex flex-col overflow-hidden relative shadow-2xl border-2 border-[#1A4A38]"
            >
              <button
                onClick={() => setSelectedGiftDetail(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-[#1A4A38] hover:bg-slate-100 rounded-full text-xl"
              >
                ✕
              </button>

              <div className="p-6 pb-0">
                <h3 className="text-[#EE7B7B] font-sans text-2xl font-black uppercase tracking-tight mb-6" style={{ textShadow: "1px 1px 0px rgba(132, 36, 52, 0.1)" }}>
                  DETAIL HADIAH
                </h3>

                <div className="text-[#1A4A38] font-sans mb-4">
                  <p className="font-bold text-lg leading-tight">Alamat Pengiriman</p>
                  <p className="font-semibold text-sm">Jakarta Selatan, Jalan Kenangan</p>
                </div>
              </div>

              <div className="px-6 mb-4">
                <div className="w-full h-48 rounded-xl overflow-hidden border border-[#1A4A38]/10 bg-slate-100">
                  <img src={selectedGiftDetail.image} alt={selectedGiftDetail.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="px-6 flex flex-col gap-3 text-[#1A4A38] font-sans">
                <p className="font-bold text-xl">{selectedGiftDetail.name}</p>
                <p className="font-medium text-sm text-[#1A4A38]/80">{selectedGiftDetail.description}</p>

                <div className="flex justify-between items-center mt-2 font-bold text-base">
                  <span>Harga</span>
                  <span>Rp {selectedGiftDetail.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-base">
                  <span>Jumlah Produk</span>
                  <span>{selectedGiftDetail.totalStock} Produk</span>
                </div>

                <p className="font-medium text-sm mt-2">Sudah ada yang membeli produk sebanyak {selectedGiftDetail.purchasedCount} produk</p>
              </div>

              <div className="p-6 flex flex-col gap-3 mt-2">
                <a
                  href={selectedGiftDetail.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#1A4A38] hover:bg-[#123628] text-white py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md active:scale-95"
                >
                  Beli Hadiah
                </a>
                <button
                  onClick={() => {
                    setSelectedGiftForm(selectedGiftDetail);
                    setSelectedGiftDetail(null);
                  }}
                  className="w-full bg-[#1A4A38] hover:bg-[#123628] text-white py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md active:scale-95"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulir Hadiah Modal */}
      <AnimatePresence>
        {selectedGiftForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-[360px] flex flex-col overflow-hidden relative shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-[#1A4A38]"
            >
              <button onClick={() => setSelectedGiftForm(null)} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-[#1A4A38] hover:bg-slate-100 rounded-full text-xl">
                ✕
              </button>

              <div className="p-6 pb-4">
                <h3 className="text-[#EE7B7B] font-sans text-xl font-black uppercase tracking-tight mb-6 text-center pr-6" style={{ textShadow: "1px 1px 0px rgba(132, 36, 52, 0.1)" }}>
                  FORMULIR HADIAH PERNIKAHAN
                </h3>

                <div className="w-full h-40 rounded-xl overflow-hidden border border-[#1A4A38]/10 bg-slate-100 mb-4">
                  <img src={selectedGiftForm.image} alt={selectedGiftForm.name} className="w-full h-full object-cover object-top" />
                </div>
                <p className="text-[#1A4A38] font-sans font-bold text-xl mb-6">{selectedGiftForm.name}</p>

                <form
                  className="flex flex-col gap-5 text-[#1A4A38] font-sans"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSelectedGiftForm(null);
                    alert("Konfirmasi berhasil disubmit!");
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Nama Pembeli</label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">No. WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="Masukkan Nomor Whatsapp"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Email</label>
                    <input
                      type="email"
                      placeholder="Masukkan Email"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-sm font-semibold">Jumlah produk dibeli</label>
                    <input
                      type="number"
                      min="1"
                      max={selectedGiftForm.totalStock}
                      placeholder="Masukkan Jumlah Produk"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <button type="submit" className="w-full bg-[#1A4A38] hover:bg-[#123628] text-white py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md active:scale-95 mt-2">
                    Konfirmasi Pembelian
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              alt="Enlarged gallery view"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
