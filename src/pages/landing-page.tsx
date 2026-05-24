import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, ChevronDown, Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

gsap.registerPlugin(ScrollTrigger);

type LoveStoryItem = {
  title: string;
  content: string;
  imageSrc: string;
  frameColor: string;
  imagePosition?: string;
};

const loveStoryItems: LoveStoryItem[] = [
  {
    title: "Tentang Bertahan",
    imageSrc: "/Gallery/Our Love Story/Rectangle 4626.png",
    frameColor: "#D95649",
    imagePosition: "center",
    content:
      "Perjalanan kita terlalu panjang untuk sekadar diceritakan dengan kata-kata. Bagi kami, cinta bukan hanya tentang pertemuan awal, melainkan keputusan untuk memilih tetap tinggal saat keadaan terasa sulit. Sebagai dua manusia biasa yang penuh kekurangan, kami belajar bahwa takdir mempertemukan kita bukan hanya untuk singgah, tapi untuk saling menguatkan selamanya",
  },
  {
    title: "Ujian & Bukti",
    imageSrc: "/Gallery/Our Love Story/Rectangle 4626 (1).png",
    frameColor: "#F1D56F",
    imagePosition: "center",
    content:
      "Perjalanan ini tidak selalu mudah; ada air mata dan keraguan yang menguji keyakinan kami. Namun, kami memilih untuk bertahan karena doa yang tak putus dan hati yang terus memilih untuk berjuang. Kini, segala luka itu bermuara pada restu, mempersatukan dua keluarga dalam harapan yang sama.",
  },
  {
    title: "Kisah & Keyakinan",
    imageSrc: "/Gallery/Our Love Story/Rectangle 4626 (3).png",
    frameColor: "#94CFE2",
    imagePosition: "center",
    content:
      "Kami percaya bahwa setiap doa akan dijawab pada waktu terbaik-Nya. Dengan penuh syukur, kami menantikan hari sakral saat dua jiwa dipersatukan dalam ikatan suci.",
  },
  {
    title: "Merayakan Takdir Ini",
    imageSrc: "/Gallery/Our Love Story/Rectangle 4626 (2).png",
    frameColor: "#9DCB9C",
    imagePosition: "center",
    content:
      "Sebentar lagi, perjalanan kami akan melangkah ke babak baru, menyatukan dua hati dalam satu tujuan di bawah naungan cinta-Nya. Mohon doa restunya, agar setiap langkah kami ke depan selalu dipeluk oleh lembutnya takdir dan diberkahi kebahagiaan yang takkan lekang oleh waktu.",
  },
];

function StoryDropdown({
  stories,
  activeIndex,
  isOpen,
  onToggle,
  onSelect,
}: {
  stories: LoveStoryItem[];
  activeIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (index: number) => void;
}) {
  const activeStory = stories[activeIndex];

  return (
    <div className="relative z-20 mx-auto w-full max-w-[300px]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex h-7 w-full items-center justify-between rounded-full border border-[#1A4A38] bg-[#F4DA76] px-4 text-[#1A4A38] shadow-[0_1px_0_rgba(26,74,56,0.28)] transition-all duration-300 hover:bg-[#F7E28D] active:scale-[0.98]"
      >
        <span className="truncate pr-3 font-serif text-[13px] font-semibold italic leading-none">{activeStory.title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-0 w-0 shrink-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-[#1A4A38]"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 6 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full flex flex-col gap-1"
          >
            {stories.map((story, index) => (
              <button
                key={story.title}
                type="button"
                onClick={() => onSelect(index)}
                className={`flex h-7 w-full items-center justify-between rounded-full border border-[#1A4A38] px-4 text-left font-serif text-[13px] font-semibold italic leading-none shadow-[0_1px_0_rgba(26,74,56,0.2)] transition-colors ${index === activeIndex ? "bg-[#F7E28D] text-[#842434]" : "bg-[#F4DA76] text-[#1A4A38] hover:bg-[#F7E28D]"
                  }`}
              >
                <span className="truncate pr-3">{story.title}</span>
                {index === activeIndex && <span className="size-2 rounded-full bg-[#1A4A38]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StoryCard({ story }: { story: LoveStoryItem }) {
  return (
    <motion.article
      key={story.title}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full text-center"
    >
      <div className="mx-auto w-full max-w-[430px]">
        <div
          className="rounded-[38px] p-5 shadow-[0_16px_30px_rgba(132,36,52,0.14)]"
          style={{ backgroundColor: story.frameColor }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-[26px] bg-[#F9E9E7]">
            <img
              src={story.imageSrc}
              alt={story.title}
              className="h-full w-full object-cover"
              style={{ objectPosition: story.imagePosition ?? "center" }}
            />
          </div>
        </div>

        <h3 className="mt-5 font-serif text-[32px] font-semibold leading-none text-[#D95649]">{story.title}</h3>
        <p className="mx-auto mt-4 max-w-[360px] font-sans text-[14px] leading-relaxed text-[#D95649]">"{story.content}"</p>
      </div>
    </motion.article>
  );
}

function AnimatedStarburst({
  className = "",
  color,
  size,
  delay = 0,
  duration = 7,
  rotate = 0,
}: {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
  duration?: number;
  rotate?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, color }}
      initial={false}
      animate={{
        rotate: [rotate, rotate + 360],
        scale: [1, 1.12, 0.94, 1.08, 1],
        y: [0, -7, 3, -4, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg viewBox="0 0 100 100" className={size ? "h-full w-full" : "h-[1em] w-[1em]"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 5L58 28L79 14L72 39L96 43L74 55L90 77L64 70L50 95L39 70L14 85L28 60L4 52L30 42L18 17L42 30L50 5Z"
          fill="currentColor"
        />
        <path d="M82 8L86 17L95 20L86 23L82 32L78 23L69 20L78 17L82 8Z" fill="currentColor" fillOpacity="0.62" />
        <path d="M17 72L20 80L28 83L20 86L17 94L14 86L6 83L14 80L17 72Z" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </motion.span>
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

const toGoogleCalendarDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const getRemainingGiftStock = (gift: Pick<GiftItem, "totalStock" | "purchasedCount">) => Math.max(gift.totalStock - gift.purchasedCount, 0);

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

interface GiftItem {
  id: number;
  name: string;
  description: string;
  price: number;
  totalStock: number;
  purchasedCount: number;
  image: string | null;
  color: string;
  link: string;
}

interface WishItem {
  id: number;
  name: string;
  message: string;
  status: string;
  date: string;
}

const BANK_ACCOUNTS = [
  {
    id: "danamon",
    name: "BANK DANAMON",
    code: "011",
    accountNumber: "10461670343",
    accountName: "Hera Nurimani"
  },
  {
    id: "bca",
    name: "BANK BCA",
    code: "014",
    accountNumber: "1234567890",
    accountName: "Hera Nurimani"
  }
];

export function LandingPage() {
  const weddingDate = new Date("2026-06-14T00:00:00+07:00");
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);
  const calendarStart = new Date("2026-06-14T08:00:00+07:00");
  const calendarEnd = new Date("2026-06-14T14:00:00+07:00");
  const googleCalendarHref = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: "The Wedding of Hera & Taufik",
    dates: `${toGoogleCalendarDate(calendarStart)}/${toGoogleCalendarDate(calendarEnd)}`,
    details: "Akad Nikah 08.00-10.00 WIB dan Resepsi 11.00-14.00 WIB.",
    location: "Duta Family Estate, Sindangpakuon, Kec. Cimanggung, Kabupaten Sumedang, Jawa Barat 45364",
  }).toString()}`;

  const [selectedBankId, setSelectedBankId] = useState("danamon");
  const [isOpen, setIsOpen] = useState(false);
  const [isComing, setIsComing] = useState<boolean | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedGiftDetail, setSelectedGiftDetail] = useState<GiftItem | null>(null);
  const [selectedGiftForm, setSelectedGiftForm] = useState<GiftItem | null>(null);
  const [giftRecommendations, setGiftRecommendations] = useState<GiftItem[]>([]);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [claimSubmitting, setClaimSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ title: string, message?: string, variant?: "default" | "destructive" } | null>(null);

  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => setAlertInfo(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpNotes, setRsvpNotes] = useState("");
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(0);
  const [isStoryMenuOpen, setIsStoryMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [galleryProgress, setGalleryProgress] = useState(0);
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
    { src: "/Gallery/CMZ_3989.jpg", title: "Portrait 1" },
    { src: "/Gallery/CMZ_4003.jpg", title: "Portrait 2" },
    { src: "/Gallery/CMZ_4028.jpg", title: "Portrait 3" },
    { src: "/Gallery/CMZ_4050.jpg", title: "Portrait 4" },
    { src: "/Gallery/CMZ_4051.jpg", title: "Portrait 5" },
    { src: "/Gallery/CMZ_4069.jpg", title: "Portrait 6" },
    { src: "/Gallery/CMZ_4130.jpg", title: "Portrait 7" },
    { src: "/Gallery/CMZ_4152.jpg", title: "Portrait 8" },
    { src: "/Gallery/CMZ_4315.jpg", title: "Portrait 9" },
    { src: "/Gallery/CMZ_4354.jpg", title: "Portrait 10" },
    { src: "/Gallery/CMZ_4365.jpg", title: "Portrait 11" },
    { src: "/Gallery/CMZ_4375.jpg", title: "Portrait 12" },
    { src: "/Gallery/CMZ_4478.jpg", title: "Portrait 13" },
    { src: "/Gallery/CMZ_4533.jpg", title: "Portrait 14" },
    { src: "/Gallery/CMZ_4561.jpg", title: "Portrait 15" },
    { src: "/Gallery/CMZ_4602.jpg", title: "Portrait 16" },
    { src: "/Gallery/CMZ_4640.jpg", title: "Portrait 17" },
    { src: "/Gallery/CMZ_4669.jpg", title: "Portrait 18" },
    { src: "/Gallery/CMZ_4673.jpg", title: "Portrait 19" },
    { src: "/Gallery/CMZ_4704.jpg", title: "Portrait 20" },
    { src: "/Gallery/CMZ_4717.jpg", title: "Portrait 21" },
    { src: "/Gallery/CMZ_4719.jpg", title: "Portrait 22" },
  ];

  const handleScroll = () => {
    if (!carouselRef.current || !carouselRef.current.children.length) return;
    const el = carouselRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setGalleryProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    const children = Array.from(el.children) as HTMLElement[];
    const closest = children.reduce(
      (best, child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - viewportCenter);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    );

    setActiveSlide(Math.min(closest.index, galleryImages.length - 1));
  };

  const fetchGifts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/gifts`);
      const json = await res.json();
      if (json.success) {
        setGiftRecommendations(json.data.map((g: any) => ({
          ...g,
          image: g.image || "/images/CMZ_4069.jpg",
        })));
      }
    } catch {
      console.warn("Backend not available, gifts will be empty.");
    }
  }, []);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/wishes`);
      const json = await res.json();
      if (json.success) setWishes(json.data);
    } catch {
      console.warn("Could not fetch wishes.");
    }
  }, []);

  const handleRsvpSubmit = async () => {
    if (!rsvpName.trim()) {
      setShowRsvpModal(true);
      return;
    }
    setRsvpSubmitting(true);
    setRsvpMessage("");
    const events: string[] = [];
    if (selectedEvents.includes("Akad Nikah")) events.push("akad_nikah");
    if (selectedEvents.includes("Resepsi")) events.push("resepsi");
    try {
      const res = await fetch(`${API_URL}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          guest_name: rsvpName,
          attendance_status: isComing ? "attending" : "not_attending",
          events: isComing ? events : null,
          total_attendees: isComing ? guestCount : 1,
          phone_number: rsvpPhone || null,
          notes: rsvpNotes || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRsvpSuccess(true);
        setRsvpMessage("Terima kasih! RSVP Anda berhasil dikirim.");
        setShowRsvpModal(false);
        fetchWishes();
      } else {
        setRsvpMessage(json.message || "Terjadi kesalahan.");
      }
    } catch {
      setRsvpMessage("Gagal mengirim RSVP. Coba lagi nanti.");
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const handleClaimGift = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGiftForm) return;
    const remainingStock = getRemainingGiftStock(selectedGiftForm);
    const requestedQuantity = Number(new FormData(e.currentTarget).get("quantity")) || 1;

    if (remainingStock <= 0) {
      setAlertInfo({ title: "Sold Out", message: "Hadiah ini sudah diklaim oleh tamu lain. Terima kasih atas niat baiknya.", variant: "destructive" });
      setSelectedGiftForm(null);
      return;
    }

    if (requestedQuantity > remainingStock) {
      setAlertInfo({ title: "Stok tidak cukup", message: `Sisa hadiah ini hanya ${remainingStock} produk. Silakan sesuaikan jumlahnya.`, variant: "destructive" });
      return;
    }

    setClaimSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(`${API_URL}/gifts/${selectedGiftForm.id}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          claimed_by: formData.get("claimed_by"),
          claimed_phone: formData.get("claimed_phone"),
          claimed_email: formData.get("claimed_email"),
          quantity: requestedQuantity,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSelectedGiftForm(null);
        setAlertInfo({ title: "Berhasil", message: "Konfirmasi pembelian berhasil!" });
        fetchGifts();
      } else {
        setAlertInfo({ title: "Gagal", message: json.message || "Gagal mengkonfirmasi.", variant: "destructive" });
      }
    } catch {
      setAlertInfo({ title: "Error", message: "Gagal menghubungi server.", variant: "destructive" });
    } finally {
      setClaimSubmitting(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Initialize scroll progress for the gift carousel
    handleGiftScroll();
    window.addEventListener("resize", handleGiftScroll);

    // Fetch gifts and wishes from backend
    fetchGifts();
    fetchWishes();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", handleGiftScroll);
    };
  }, [fetchGifts, fetchWishes]);

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

  const selectedGiftDetailRemainingStock = selectedGiftDetail ? getRemainingGiftStock(selectedGiftDetail) : 0;
  const selectedGiftDetailClaimedCount = selectedGiftDetail ? Math.min(selectedGiftDetail.purchasedCount, selectedGiftDetail.totalStock) : 0;
  const selectedGiftDetailSoldOut = !!selectedGiftDetail && selectedGiftDetailRemainingStock <= 0;
  const selectedGiftFormRemainingStock = selectedGiftForm ? getRemainingGiftStock(selectedGiftForm) : 0;
  const selectedBank = BANK_ACCOUNTS.find((bank) => bank.id === selectedBankId) ?? BANK_ACCOUNTS[0];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#F9E9E7] font-sans relative">
      <AnimatePresence>
        {alertInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-4 right-4 top-4 z-[200] w-auto sm:left-auto sm:right-6 sm:top-6 sm:w-full sm:max-w-sm"
          >
            <Alert variant={alertInfo.variant || "default"} className={alertInfo.variant === "destructive" ? "bg-white shadow-lg" : "bg-white border-[#1A4A38] text-[#1A4A38] shadow-lg"}>
              <AlertTitle className="font-bold">{alertInfo.title}</AlertTitle>
              {alertInfo.message && <AlertDescription>{alertInfo.message}</AlertDescription>}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="relative z-10 w-full h-full flex flex-col justify-start px-8 lg:px-16 pb-20 lg:justify-center">
              <div className="mt-[10vh] mb-0 text-white text-center drop-shadow-xl flex flex-col items-center sm:mt-[12vh] lg:mt-auto lg:mb-16">
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

            {/* Animated Starbursts */}
            <AnimatedStarburst className="top-[15%] left-[10%] opacity-95 drop-shadow-md" color="#F75B42" size={78} rotate={12} />
            <AnimatedStarburst className="top-[30%] right-[15%] opacity-90 drop-shadow-md" color="#F4C848" size={58} delay={0.6} duration={6.2} rotate={-12} />
            <AnimatedStarburst className="bottom-[25%] left-[8%] opacity-95 drop-shadow-md" color="#F75B42" size={54} delay={1.1} duration={7.4} rotate={45} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT PANEL - Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto overflow-x-hidden relative bg-[#F9E9E7] text-[#1A4A38] scroll-smooth shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-10 flex flex-col [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Content Container */}
        <div className="flex flex-col items-center justify-start min-h-full px-3 py-12 sm:px-8 sm:py-14 lg:py-8">
          {/* Top Scalloped Image Frame */}
          <div className="relative w-full max-w-[520px] lg:max-w-[500px] xl:max-w-[520px] mx-auto mb-8 lg:mb-7 px-0 gsap-fade-up">
            {/* Spinning Flowers Decorations for right panel */}
            <div className="absolute top-0 -right-2 text-[#EED372]/60 text-5xl z-10 animate-[spin_10s_linear_infinite]">✽</div>
            <div className="absolute bottom-20 -left-4 text-[#842434]/40 text-4xl z-10 animate-[spin_14s_linear_infinite_reverse]">✽</div>

            {/* Using the pre-cut image instead of CSS mask */}
            <img
              src="/images/image2.png"
              className="w-full h-auto max-h-[46vh] lg:max-h-[47vh] xl:max-h-[49vh] object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] relative z-0"
              alt="Hera & Taufik Studio"
            />
          </div>

          {/* Typography Section */}
          <div className="text-center mb-10 w-full px-4 gsap-fade-up relative overflow-visible">
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes weddingInviteFlowerLeft {
                0%, 100% { transform: rotate(-8deg) translateY(0); }
                50% { transform: rotate(-2deg) translateY(-8px); }
              }
              @keyframes weddingInviteFlowerRight {
                0%, 100% { transform: rotate(8deg) translateY(0); }
                50% { transform: rotate(2deg) translateY(-8px); }
              }
            `,
              }}
            />

            <div className="pointer-events-none absolute -left-7 top-[-18px] z-10 md:left-4 md:top-[-20px]" style={{ animation: "weddingInviteFlowerLeft 4s ease-in-out infinite" }}>
              <svg viewBox="0 0 120 120" className="h-24 w-24 md:h-28 md:w-28 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53 58 C34 70 18 78 2 80" stroke="#1A4A38" strokeWidth="5" strokeLinecap="round" />
                <path d="M24 72 C13 59 16 47 31 50 C39 58 38 69 24 72Z" fill="#6A994E" stroke="#1A4A38" strokeWidth="2" />
                <path d="M34 64 C31 48 40 39 52 49 C55 61 48 70 34 64Z" fill="#6A994E" stroke="#1A4A38" strokeWidth="2" />
                <g transform="translate(67 47)">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <ellipse key={index} cx="0" cy="-22" rx="7" ry="17" fill="#EED372" stroke="#B88A44" strokeWidth="1.4" transform={`rotate(${index * 22.5})`} />
                  ))}
                  <circle r="20" fill="#6B3A1F" stroke="#3A2216" strokeWidth="2" />
                  <circle r="12" fill="#4A2618" stroke="#3A2216" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>
              </svg>
            </div>

            <div className="pointer-events-none absolute -right-7 top-[-18px] z-10 md:right-4 md:top-[-20px]" style={{ animation: "weddingInviteFlowerRight 4.3s ease-in-out infinite" }}>
              <svg viewBox="0 0 120 120" className="h-24 w-24 md:h-28 md:w-28 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M67 58 C86 70 102 78 118 80" stroke="#1A4A38" strokeWidth="5" strokeLinecap="round" />
                <path d="M96 72 C107 59 104 47 89 50 C81 58 82 69 96 72Z" fill="#6A994E" stroke="#1A4A38" strokeWidth="2" />
                <path d="M86 64 C89 48 80 39 68 49 C65 61 72 70 86 64Z" fill="#6A994E" stroke="#1A4A38" strokeWidth="2" />
                <g transform="translate(53 47)">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <ellipse key={index} cx="0" cy="-22" rx="7" ry="17" fill="#EED372" stroke="#B88A44" strokeWidth="1.4" transform={`rotate(${index * 22.5})`} />
                  ))}
                  <circle r="20" fill="#6B3A1F" stroke="#3A2216" strokeWidth="2" />
                  <circle r="12" fill="#4A2618" stroke="#3A2216" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>
              </svg>
            </div>

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
          <p className="text-[#1A4A38] font-sans text-lg md:text-xl leading-relaxed max-w-[480px]">
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
        <div className="flex flex-col items-center justify-start bg-[#F9E9E7] px-8 py-16 sm:px-12 relative shrink-0 overflow-hidden gsap-fade-up">
          {/* Random Spinning Stars (More Visible) */}
          <AnimatedStarburst className="left-[5%] top-[12%] z-0 text-[#D95649]/45 text-6xl" delay={0.1} duration={6.4} />
          <AnimatedStarburst className="right-[7%] top-[22%] z-0 text-[#F4C848]/80 text-7xl blur-[0.3px]" delay={0.7} duration={7.2} />
          <AnimatedStarburst className="bottom-[16%] left-[8%] z-0 text-[#1A4A38]/25 text-5xl" delay={1.2} duration={6.8} />
          <AnimatedStarburst className="bottom-[8%] right-[10%] z-0 text-[#842434]/28 text-6xl" delay={1.7} duration={7.8} />
          <AnimatedStarburst className="left-[28%] top-[44%] z-0 text-[#D95649]/25 text-4xl" delay={2.1} duration={5.8} />

          <h2 className="relative z-10 mb-9 text-center font-serif italic text-5xl font-bold leading-none text-[#842434] sm:text-6xl">Our Love Story</h2>

          <div className="relative z-20 mb-8 w-full">
            <StoryDropdown
              stories={loveStoryItems}
              activeIndex={activeStory ?? 0}
              isOpen={isStoryMenuOpen}
              onToggle={() => setIsStoryMenuOpen((open) => !open)}
              onSelect={(index) => {
                setActiveStory(index);
                setIsStoryMenuOpen(false);
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-[460px]">
            <AnimatePresence mode="wait">
              <StoryCard story={loveStoryItems[activeStory ?? 0]} />
            </AnimatePresence>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center justify-start pt-6 pb-20 px-6 sm:px-12 bg-[#F9E9E7] relative shrink-0 overflow-hidden gsap-stagger-group">
          {/* Floating Flowers */}
          <div className="absolute top-20 left-1/2 text-[#842434]/10 text-[6rem] animate-[spin_25s_linear_infinite]">✽</div>

          <div className="text-center mb-14 relative z-10 gsap-stagger-item">
            <h2 className="font-serif italic text-5xl font-bold leading-none text-[#842434] sm:text-6xl mb-4">The Wedding Of</h2>
            <p className="text-[#2E5B3D] font-sans text-xs md:text-sm italic">We Cordially Invite You To The Our Wedding</p>
          </div>

          {/* Bride Profile */}
          <div className="flex flex-col items-center text-center mb-16 relative z-10 w-full max-w-sm gsap-stagger-item">
            <div className="absolute top-10 -left-12 text-[#EED372]/60 text-5xl animate-[spin_12s_linear_infinite_reverse]">✽</div>

            <img src="/images/Hera.png" className="w-72 h-72 md:w-80 md:h-80 mb-8 object-contain" alt="Hera Nurimani" />

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

            <img src="/images/Taufik.png" className="w-72 h-72 md:w-80 md:h-80 mb-8 object-contain" alt="Taufik Nurdiansyah" />

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

        {/* Save The Date checkerboard edge */}
        <div
          className="w-full h-[76px] shrink-0 z-20"
          style={{
            backgroundImage: "conic-gradient(#F3F0E6 90deg, #FFFFFF 90deg 180deg, #F3F0E6 180deg 270deg, #FFFFFF 270deg)",
            backgroundSize: "76px 76px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Save The Date Section */}
        <div className="flex flex-col items-center justify-center bg-[#F3F0E6] px-7 py-7 relative shrink-0 overflow-hidden gsap-fade-up">
          {/* Random Spinning Flowers (More Visible) */}
          <div className="absolute left-[7%] top-[12%] text-[#EE6E89]/55 text-7xl animate-[spin_12s_linear_infinite] blur-[0.3px]">✽</div>
          <div className="absolute right-[9%] top-[20%] text-[#EED372]/80 text-8xl animate-[spin_16s_linear_infinite_reverse] blur-[0.5px]">✽</div>
          <div className="absolute bottom-[14%] left-[11%] text-[#1A4A38]/35 text-6xl animate-[spin_10s_linear_infinite_reverse]">✽</div>
          <div className="absolute bottom-[8%] right-[15%] text-[#842434]/35 text-7xl animate-[spin_18s_linear_infinite]">✽</div>
          <div className="absolute left-[29%] top-[42%] text-[#EE6E89]/35 text-5xl animate-[spin_9s_linear_infinite]">✽</div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes swayLeft {
              0%, 100% { transform: rotate(-8deg); }
              50% { transform: rotate(-2deg); }
            }
            @keyframes swayRight {
              0%, 100% { transform: rotate(8deg); }
              50% { transform: rotate(2deg); }
            }
          `,
            }}
          />

          <div className="relative z-10 flex min-h-[488px] w-full max-w-[350px] flex-col items-center px-8 pb-9 pt-[54px] md:min-h-[620px] md:max-w-[470px] md:px-12 md:pb-12 md:pt-[70px] lg:min-h-[700px] lg:max-w-[540px] lg:px-14 lg:pb-14 lg:pt-[78px]">
            <div className="absolute inset-0 z-0 flex pointer-events-none" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="-mx-px flex-1 rounded-[42px] bg-[#F3D7CE] md:rounded-[58px] lg:rounded-[66px]" />
              ))}
            </div>

            <h2 className="relative z-20 mb-[18px] text-center font-serif italic text-[28px] font-bold leading-[0.98] tracking-normal text-[#EE6E89] md:mb-7 md:text-[38px] lg:mb-8 lg:text-[43px]">
              Save The
              <br />
              Date
            </h2>

            <div className="relative z-10 mb-[26px] grid w-[172px] grid-cols-2 gap-x-3 gap-y-3 md:mb-9 md:w-[244px] md:gap-x-5 md:gap-y-5 lg:mb-10 lg:w-[284px] lg:gap-x-7 lg:gap-y-7">
              <div
                className="absolute -left-[50px] -top-[11px] z-0 pointer-events-none origin-bottom md:-left-[78px] md:-top-[16px] lg:-left-[92px] lg:-top-[18px]"
                style={{ animation: "swayLeft 4s ease-in-out infinite" }}
              >
                <svg
                  viewBox="0 0 80 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[104px] w-[78px] overflow-visible drop-shadow-sm md:h-[142px] md:w-[106px] lg:h-[164px] lg:w-[124px]"
                >
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

              <div
                className="absolute -right-[53px] top-[92px] z-0 pointer-events-none origin-bottom md:-right-[82px] md:top-[134px] lg:-right-[98px] lg:top-[158px]"
                style={{ animation: "swayRight 4.5s ease-in-out infinite" }}
              >
                <svg
                  viewBox="0 0 80 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[104px] w-[78px] overflow-visible drop-shadow-sm md:h-[142px] md:w-[106px] lg:h-[164px] lg:w-[124px]"
                >
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

              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Second", value: seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="relative z-10 flex h-[98px] w-20 flex-col items-center justify-center rounded-[18px] border-2 border-[#F0D148] bg-[#FFFDF7] font-sans shadow-[5px_6px_0_rgba(86,91,88,0.76)] md:h-[132px] md:w-28 md:rounded-[24px] md:border-[3px] md:shadow-[7px_8px_0_rgba(86,91,88,0.76)] lg:h-[150px] lg:w-32 lg:rounded-[28px] lg:shadow-[8px_9px_0_rgba(86,91,88,0.76)]"
                >
                  <span className="mb-1 text-[31px] font-black leading-none tracking-normal text-[#842434] md:text-[44px] lg:text-[52px]">{unit.value}</span>
                  <span className="text-center text-[12px] font-medium leading-none tracking-normal text-[#075D28] md:text-[15px] lg:text-[16px]">{unit.label}</span>
                </div>
              ))}
            </div>

            <a
              href={googleCalendarHref}
              target="_blank"
              rel="noreferrer"
              className="relative z-20 flex h-[33px] min-w-[154px] items-center justify-center rounded-full bg-[#08663C] px-6 font-sans text-[12px] font-medium tracking-normal text-white shadow-[4px_4px_0_rgba(59,67,63,0.45)] transition-all hover:bg-[#075731] active:translate-y-0.5 active:shadow-[2px_2px_0_rgba(59,67,63,0.45)] md:h-11 md:min-w-[210px] md:text-[15px] lg:h-12 lg:min-w-[230px] lg:text-base"
            >
              Add to Calendar
            </a>
          </div>
        </div>

        {/* Gallery Carousel Section */}
        <div className="w-full bg-[#F3D7CE] relative shrink-0 overflow-hidden gsap-fade-up">
          <div
            className="w-full h-[76px] shrink-0 relative z-20"
            style={{
              backgroundImage: "conic-gradient(#F3D7CE 90deg, #FFFFFF 90deg 180deg, #F3D7CE 180deg 270deg, #FFFFFF 270deg)",
              backgroundSize: "76px 76px",
              backgroundPosition: "0 0",
            }}
          />

          {/* Random Spinning Flowers (More Visible) */}
          <div className="pointer-events-none absolute left-[6%] top-[22%] z-0 text-[#EE6E89]/45 text-6xl animate-[spin_12s_linear_infinite]">✽</div>
          <div className="pointer-events-none absolute right-[7%] top-[24%] z-0 text-[#F4C848]/65 text-7xl animate-[spin_16s_linear_infinite_reverse] blur-[0.4px]">✽</div>
          <div className="pointer-events-none absolute bottom-[20%] left-[9%] z-0 text-[#1A4A38]/25 text-5xl animate-[spin_10s_linear_infinite_reverse]">✽</div>
          <div className="pointer-events-none absolute bottom-[12%] right-[10%] z-0 text-[#842434]/25 text-6xl animate-[spin_18s_linear_infinite]">✽</div>

          <div className="relative z-10 pb-11 pt-12">
            <h2 className="mb-[42px] text-center font-serif italic text-2xl font-bold leading-none text-[#EE6E89] sm:text-6xl">Potraits Of Love</h2>
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="no-scrollbar relative z-10 flex snap-x snap-mandatory items-center gap-3 overflow-x-auto px-[calc(50%_-_118px)] py-7 md:gap-4 md:px-[calc(50%_-_138px)] md:py-8 lg:gap-5 lg:px-[calc(50%_-_154px)] lg:py-9"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {galleryImages.map((item, idx) => (
                <motion.button
                  key={item.src}
                  type="button"
                  animate={{
                    scale: activeSlide === idx ? 1.03 : 0.84,
                    y: activeSlide === idx ? 0 : 14,
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  onClick={() => setSelectedImage(item.src)}
                  className="relative h-[386px] w-[236px] shrink-0 snap-center cursor-zoom-in overflow-hidden rounded-[22px] border-2 border-white bg-slate-200 shadow-[0_14px_28px_rgba(132,36,52,0.14)] md:h-[438px] md:w-[276px] md:rounded-[26px] lg:h-[488px] lg:w-[308px] lg:rounded-[30px]"
                  aria-label={`Open ${item.title}`}
                >
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                  <img src={item.src} loading="lazy" decoding="async" className="relative z-10 h-full w-full object-cover" alt={item.title} />
                </motion.button>
              ))}
            </div>
            <div className="relative z-20 mx-auto mt-1 h-[5px] w-[86%] max-w-[690px] overflow-hidden rounded-full bg-[#EE6E89]/20">
              <div className="h-full rounded-full bg-[#EE6E89] transition-[width] duration-300 ease-out" style={{ width: `${Math.max(8, galleryProgress)}%` }} />
            </div>
          </div>
        </div>

        {/* It's Wedding Day Section */}
        <div className="w-full bg-[#F9DB7A] flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up">
          {/* Random Spinning Stars (More Visible) */}
          <AnimatedStarburst className="top-[14%] left-[5%] z-0 text-white/80 text-5xl blur-[0.3px]" delay={0.15} duration={6.2} />
          <AnimatedStarburst className="top-[38%] right-[8%] z-0 text-white/60 text-7xl blur-[0.5px]" delay={0.75} duration={7.5} />
          <AnimatedStarburst className="bottom-[20%] left-[10%] z-0 text-white/70 text-6xl" delay={1.25} duration={6.8} />
          <AnimatedStarburst className="top-[58%] left-[2%] z-0 text-[#842434]/28 text-4xl" delay={1.7} duration={5.9} />
          <AnimatedStarburst className="bottom-[10%] right-[5%] z-0 text-[#0E5B23]/30 text-5xl" delay={2.05} duration={7.9} />

          {/* Top Checkerboard Border */}
          <div
            className="w-full h-16 shrink-0"
            style={{
              backgroundImage: "conic-gradient(#F9DB7A 90deg, #FFFFFF 90deg 180deg, #F9DB7A 180deg 270deg, #FFFFFF 270deg)",
              backgroundSize: "64px 64px",
              backgroundPosition: "0 0",
            }}
          />

          <div className="relative z-10 flex w-full flex-col items-center px-4 pb-16 pt-8 text-center md:pb-16 md:pt-10">
            <h2 className="mb-7 font-serif italic text-[48px] font-bold leading-[0.9] tracking-tight text-[#842434] md:mb-7 md:text-[60px] lg:text-[64px]">
              It's Wedding
              <br />
              Day
            </h2>

            <div className="relative w-full max-w-[350px] min-h-[730px] px-8 py-12 md:min-h-0 md:max-w-[520px] md:px-14 md:py-16 lg:max-w-[570px] lg:px-16 lg:py-[72px]">
              <div className="absolute inset-0 z-0 flex pointer-events-none" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="-mx-px flex-1 rounded-[28px] bg-[#FFF8E7] md:rounded-[48px] lg:rounded-[54px]" />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center">
                {/* Akad Section (Interlocking Rings) */}
                <div className="flex flex-col items-center">
                  <h3 className="mb-6 font-serif italic text-[28px] font-bold tracking-tight text-[#842434] md:mb-7 md:text-[30px] lg:text-[34px]">Akad Nikah</h3>
                  <img src="/assets/rings.png" alt="Wedding rings" className="mb-2 h-[58px] w-[78px] object-contain md:mb-3 md:h-[60px] md:w-20 lg:h-[66px] lg:w-[88px]" />
                  <span className="mb-2 font-serif text-lg italic text-[#1A4A38] md:text-lg">Sunday</span>
                  <span className="mb-2 font-serif text-7xl font-black leading-none text-[#842434] md:text-8xl lg:text-9xl" style={{ WebkitTextStroke: "1px #842434" }}>
                    14
                  </span>
                  <span className="mb-2 font-serif text-lg italic text-[#1A4A38] md:text-lg">June, 2026</span>
                  <span className="font-sans text-base font-bold tracking-tight text-[#842434] md:text-lg">08.00 - 10.00</span>
                </div>

                {/* Resepsi Section (Toasting Glasses) */}
                <div className="mt-12 flex flex-col items-center md:mt-10">
                  <img src="/assets/party.png" alt="Party celebration" className="mb-2 h-[72px] w-[72px] object-contain md:mb-3 md:h-[78px] md:w-[78px] lg:h-[86px] lg:w-[86px]" />
                  <span className="mb-1 font-serif text-lg italic text-[#1A4A38] md:text-lg">Sunday</span>
                  <h3 className="mb-2 font-serif italic text-[30px] font-bold leading-none tracking-tight text-[#0E5B23] md:text-[34px] lg:text-[38px]">Resepsi</h3>
                  <span className="mb-2 font-serif text-7xl font-black leading-none text-[#842434] md:text-8xl lg:text-9xl">14</span>
                  <span className="mb-2 font-serif text-lg italic text-[#1A4A38] md:text-lg">June, 2026</span>
                  <span className="mb-6 font-sans text-base font-bold tracking-tight text-[#842434] md:mb-5 md:text-lg">11.00 - 14.00</span>
                </div>

                {/* Location Section */}
                <div className="flex max-w-[290px] flex-col items-center md:max-w-[370px]">
                  <div className="mb-1 flex items-center gap-1 text-[#842434] md:mb-2 md:gap-2">
                    <MapPin className="h-5 w-5 fill-[#842434] md:h-5 md:w-5" />
                    <span className="font-serif text-lg font-bold italic md:text-xl">Duta Family Estate</span>
                  </div>
                  <p className="font-serif text-base font-medium italic leading-snug text-[#1A4A38] md:text-lg">Sindangpakuon, Kec. Cimanggung, Kabupaten Sumedang, Jawa Barat 45364</p>
                </div>

                <a
                  href="https://maps.app.goo.gl/GN6VYqoq1bckbU8X8"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 rounded-full bg-[#0E5B23] px-10 py-3 font-sans text-sm font-bold tracking-normal text-[#F9E9E7] shadow-[0_3px_0px_#073412] transition-all hover:bg-[#0A481A] active:translate-y-[2px] active:shadow-none md:mt-8 md:px-12 md:py-3.5 md:text-sm"
                >
                  View Maps
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Checkerboard Border */}
          <div
            className="w-full h-16 shrink-0"
            style={{
              backgroundImage: "conic-gradient(#F9DB7A 90deg, #FFFFFF 90deg 180deg, #F9DB7A 180deg 270deg, #FFFFFF 270deg)",
              backgroundSize: "64px 64px",
              backgroundPosition: "0 0",
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
              <div className="flex justify-center gap-4 text-[#842434] font-serif italic text-[6rem] sm:text-[7rem] font-bold leading-none tracking-tighter">
                <span>R</span>
                <span>S</span>
              </div>
              <div className="flex justify-center gap-4 text-[#842434] font-serif italic text-[6rem] sm:text-[7rem] font-bold leading-none tracking-tighter">
                <span>V</span>
                <span>P</span>
              </div>
            </div>

            <p className="text-[#842434] font-sans text-sm md:text-base text-center max-w-[300px] font-small leading-relaxed z-10">
              Kindly RSVP by January 15th, 2026, to help us with the final arrangements for our special day.
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[400px] bg-[#F9E9E7] rounded-[2.5rem] border-[3px] border-[#842434] p-8 sm:p-10 shadow-[6px_8px_0px_#1A4A38] relative flex flex-col items-center z-10">
            <h3 className="text-[#EE7B7B] font-serif text-3xl font-bold text-center mb-8 tracking-tight leading-[1.1]" style={{ textShadow: "2px 2px 0px rgba(132, 36, 52, 0.1)" }}>
              Konfirmasi
              <br />
              Kehadiran
            </h3>

            <div className="flex flex-col gap-6 w-full">
              {/* Question 1: Kehadiran */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-[#1A4A38] font-sans font-medium text-[15px] text-center">Apakah kamu datang?</p>
                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={() => setIsComing(true)}
                    className={`w-full py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all border border-[#1A4A38] ${isComing === true ? "bg-[#1A4A38] text-white shadow-inner" : "bg-[#F9E9E7] text-[#1A4A38] hover:bg-[#1A4A38]/5"
                      }`}
                  >
                    Hadir
                  </button>
                  <button
                    onClick={() => setIsComing(false)}
                    className={`w-full py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all border border-[#1A4A38] ${isComing === false ? "bg-[#1A4A38] text-white shadow-inner" : "bg-[#F9E9E7] text-[#1A4A38] hover:bg-[#1A4A38]/5"
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
                              className={`w-full py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all border border-[#1A4A38] ${isSelected ? "bg-[#1A4A38] text-white shadow-inner" : "bg-transparent text-[#1A4A38] hover:bg-[#1A4A38]/5"
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
                          onClick={() => setGuestCount(Math.min(3, guestCount + 1))}
                          className="w-10 h-10 shrink-0 rounded-full bg-[#1A4A38] text-white flex items-center justify-center text-xl font-light hover:bg-[#123628] transition-colors shadow-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {rsvpSuccess ? (
                <div className="w-full bg-[#1A4A38]/10 border-2 border-[#1A4A38] text-[#1A4A38] py-4 rounded-full font-sans font-bold text-base text-center">✓ {rsvpMessage}</div>
              ) : (
                <>
                  {rsvpMessage && <p className="text-red-500 text-sm text-center font-medium">{rsvpMessage}</p>}
                  <button
                    onClick={handleRsvpSubmit}
                    disabled={rsvpSubmitting || isComing === null}
                    className="w-full bg-[#1A4A38] hover:bg-[#123628] text-white py-4 rounded-full font-sans font-bold text-base tracking-wide transition-all shadow-md active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {rsvpSubmitting ? "Mengirim..." : "Konfirmasi"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tanda Kasih / Bank Transfer Section */}
        <div className="w-full bg-[#F5F1E7] px-8 py-20 flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up" style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* Random Spinning Stars (More Visible) */}
          <AnimatedStarburst className="top-10 right-8 z-0 text-[#D95649]/35 text-[5rem]" delay={0.2} duration={6.8} />
          <AnimatedStarburst className="bottom-16 left-4 z-0 text-[#A5C9A1]/50 text-[6rem]" delay={0.8} duration={7.6} />
          <AnimatedStarburst className="top-[34%] left-8 z-0 text-[#F4C848]/60 text-5xl" delay={1.25} duration={6.1} />
          <AnimatedStarburst className="bottom-10 right-[18%] z-0 text-[#97C1D9]/40 text-5xl" delay={1.8} duration={7.1} />

          <h2 className="relative z-10 text-[#D95649] font-serif italic text-6xl md:text-7xl font-bold mb-5 text-center leading-none">Tanda Kasih</h2>

          <p className="relative z-10 text-[#D95649] font-sans text-sm md:text-base text-center max-w-[460px] mb-6 leading-snug">
            Atas restu dan kedatangan kamu ke pesta pernikahan kami sudah cukup bagi kami. Jika kamu ingin memberi hadiah, kami menyediakan amplop digital untuk memudahkan kamu.
          </p>

          <div className="relative z-10 w-full max-w-[500px] flex flex-col items-center gap-5">
            {/* Dropdown Select */}
            <div className="w-full max-w-[372px] relative">
              <select
                value={selectedBankId}
                onChange={(e) => setSelectedBankId(e.target.value)}
                className="w-full appearance-none bg-[#F4DA76] border-[1.5px] border-[#1A4A38] text-[#1A4A38] py-2.5 px-6 rounded-full font-serif italic text-xl leading-none shadow-[0_2px_0_rgba(26,74,56,0.18)] focus:outline-none focus:ring-4 focus:ring-[#D95649]/20 cursor-pointer"
              >
                {BANK_ACCOUNTS.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name
                      .toLowerCase()
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-[#1A4A38]">
                <span className="h-0 w-0 border-x-[10px] border-t-[15px] border-x-transparent border-t-[#1A4A38]" />
              </div>
            </div>

            {/* Bank Card */}
            <div className="w-full rounded-[60px] bg-[#D95649] p-[18px] shadow-[0_18px_34px_rgba(132,36,52,0.12)]">
              <div className="bg-white w-full rounded-[44px] flex flex-col items-center justify-center py-8 px-8">
                <h3 className="text-[#D95649] text-2xl md:text-3xl font-serif font-semibold uppercase mb-3 text-center leading-none">
                  {selectedBank.name} ({selectedBank.code})
                </h3>
                <p className="text-[#D95649] font-serif text-2xl md:text-3xl font-semibold mb-1 text-center leading-none">{selectedBank.accountNumber}</p>
                <p className="text-[#D95649] font-serif text-2xl md:text-3xl font-semibold mb-8 text-center leading-none">{selectedBank.accountName}</p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedBank.accountNumber);
                    setAlertInfo({ title: "Berhasil", message: "Nomor rekening berhasil disalin!" });
                  }}
                  className="w-full max-w-[400px] bg-[#A9C9A4] hover:bg-[#9ABF95] text-white py-4 rounded-full flex items-center justify-center gap-2 font-medium text-base transition-colors shadow-[3px_4px_0_rgba(132,36,52,0.16)] active:translate-y-[2px] active:shadow-[1px_2px_0_rgba(132,36,52,0.16)]"
                >
                  <Copy className="h-5 w-5" />
                  Salin Nomor Rekening
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gift Recommendation Section */}
        <div className="w-full bg-[#F5F1E7] py-24 px-6 flex flex-col items-center shrink-0 relative overflow-hidden gsap-fade-up">
          {/* Random Spinning Flowers */}
          <div className="absolute top-10 right-10 text-[#D34D41]/30 text-[6rem] animate-[spin_14s_linear_infinite_reverse]">✽</div>
          <div className="absolute bottom-20 left-5 text-[#A5C9A1]/40 text-[7rem] animate-[spin_20s_linear_infinite]">✽</div>
          <div className="absolute top-1/3 right-1/4 text-[#F5D17E]/50 text-5xl animate-[spin_10s_linear_infinite]">✽</div>
          <div className="absolute top-32 left-1/4 text-[#97C1D9]/40 text-6xl animate-[spin_8s_linear_infinite_reverse]">✽</div>
          <div className="absolute bottom-10 right-1/3 text-[#E87A84]/30 text-[4rem] animate-[spin_12s_linear_infinite]">✽</div>

          <div className="w-full max-w-4xl">
            <h2 className="text-[#D34D41] font-serif italic text-4xl md:text-5xl font-bold mb-10 text-left px-2">Send us a gift</h2>
          </div>

          <div
            ref={giftCarouselRef}
            onScroll={handleGiftScroll}
            className="flex gap-6 overflow-x-auto w-full max-w-4xl pb-8 px-2 snap-x snap-mandatory justify-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {giftRecommendations.map((gift) => {
              const remainingStock = getRemainingGiftStock(gift);
              const claimedCount = Math.min(gift.purchasedCount, gift.totalStock);
              const isSoldOut = remainingStock <= 0;

              return (
                <div
                  key={gift.id}
                  className={`snap-center shrink-0 w-[260px] flex flex-col relative transition-transform ${isSoldOut ? "opacity-85 cursor-not-allowed" : "hover:-translate-y-2 group cursor-pointer"}`}
                  onClick={() => !isSoldOut && setSelectedGiftDetail(gift)}
                  aria-disabled={isSoldOut}
                >
                  {/* Top Solid Color Section */}
                  <div
                    className={`w-full h-64 rounded-[2rem] p-4 flex flex-col items-center justify-center relative transition-shadow duration-300 overflow-hidden ${isSoldOut ? "grayscale-[0.35] ring-1 ring-[#842434]/20" : "group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"}`}
                    style={{ backgroundColor: isSoldOut ? "#D8D2C8" : gift.color }}
                  >
                    {/* Top left badge */}
                    <div
                      className={`absolute top-5 left-5 px-3 py-1 rounded-full font-sans text-[10px] font-black tracking-widest uppercase ${isSoldOut ? "bg-[#842434] text-white shadow-md" : "bg-white/40 backdrop-blur-md text-[#842434]"}`}
                    >
                      {isSoldOut ? "Sold Out" : `${remainingStock} Left`}
                    </div>

                    {claimedCount > 0 && (
                      <div className="absolute bottom-4 left-4 right-4 rounded-full bg-white/70 px-3 py-1.5 text-center font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#842434] backdrop-blur-sm">
                        {claimedCount} diklaim
                      </div>
                    )}

                    {/* Heart icon / Locked icon */}
                    <button
                      disabled={isSoldOut}
                      className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSoldOut ? "bg-black/10 text-black/40 cursor-not-allowed" : "bg-white/40 backdrop-blur-md text-[#842434] hover:bg-white"}`}
                    >
                      {isSoldOut ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                    </button>

                    {/* Product Image */}
                    <div className={`w-40 h-40 mt-4 rounded-full overflow-hidden shadow-2xl border-[4px] border-white/20 ${isSoldOut ? "opacity-55 grayscale" : ""}`}>
                      <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Bottom Text Section */}
                  <div className="w-full mt-4 px-2 flex justify-between items-start gap-3">
                    <div className="flex flex-col flex-1">
                      <div className={`font-serif font-bold text-xl leading-tight ${isSoldOut ? "text-[#842434]/70" : "text-[#D34D41]"}`}>
                        {gift.name}
                        <div className={`font-sans font-semibold mt-1 text-base tracking-wide ${isSoldOut ? "text-[#1A4A38]/60 line-through decoration-[#842434]/50" : "text-[#D34D41]/70"}`}>
                          Rp {gift.price.toLocaleString("id-ID")}
                        </div>
                      </div>
                      <div className={`font-sans text-xs mt-1 leading-snug font-medium pr-2 ${isSoldOut ? "text-[#1A4A38]/65" : "text-[#D34D41]/60"}`}>
                        {isSoldOut
                          ? "Terima kasih, hadiah ini sudah sepenuhnya diklaim oleh tamu terkasih."
                          : claimedCount > 0
                            ? `Sudah diklaim ${claimedCount} produk. Masih tersedia ${remainingStock} untuk tamu berikutnya.`
                            : gift.description}
                      </div>
                    </div>

                    {/* Cart Icon Button / Disabled Button */}
                    <button
                      disabled={isSoldOut}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isSoldOut) setSelectedGiftDetail(gift);
                      }}
                      className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center shadow-lg transition-transform ${isSoldOut ? "bg-[#C7BDB4] text-[#842434]/45 cursor-not-allowed shadow-none" : "bg-[#D34D41] text-white hover:scale-110 cursor-pointer"}`}
                      aria-label={isSoldOut ? `${gift.name} sold out` : `Open ${gift.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
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

            <p className="text-[#1A4A38] font-sans text-lg md:text-xl leading-relaxed max-w-md">
              From the bottom of our hearts we just want to thank you for being part of our big day. We are extremely lucky to have each of you in our lives and honored you could be here with us.
            </p>
          </div>
        </div>

        {/* Wedding Wishes Marquee Section */}
        <div className="w-full bg-[#F5F1E7] py-16 flex flex-col items-center shrink-0 relative overflow-hidden">
          <h2 className="text-[#D05244] font-serif italic text-5xl font-black mb-8 z-10">Ucapan & Harapan</h2>

          <div className="w-full relative overflow-hidden group">
            {/* Left and Right Gradient Fades */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#F5F1E7] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#F5F1E7] to-transparent z-10 pointer-events-none" />

            {wishes.length > 0 ? (
              <div
                className="flex gap-4 px-16 animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap overflow-x-auto no-scrollbar"
                style={{ width: "max-content" }}
              >
                {/* Duplicate the list 3 times for a smooth infinite loop effect */}
                {[...wishes, ...wishes, ...wishes].map((wish, idx) => (
                  <div key={`${wish.id}-${idx}`} className="w-[300px] md:w-[350px] shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-[#842434]/5 flex flex-col whitespace-normal">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-sans font-bold text-[#1A4A38] text-base">{wish.name}</h4>
                        <span className="text-xs text-slate-400 font-medium">{wish.date}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${wish.status === "attending" ? "bg-[#1A4A38]/10 text-[#1A4A38]" : "bg-slate-100 text-slate-500"}`}
                      >
                        {wish.status === "attending" ? "Hadir" : "Tidak Hadir"}
                      </span>
                    </div>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed italic">"{wish.message}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-400 font-sans italic text-sm">Belum ada ucapan.</p>
            )}
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

          {/* Developer Credit */}
          <div className="flex flex-col items-center gap-3 mb-10 relative z-10 text-center">
            <p className="text-[#EED372] font-sans text-xs font-bold uppercase tracking-[0.35em]">Powered By</p>
            <h2 className="text-[#F9E9E7] font-sans text-3xl md:text-4xl font-black uppercase tracking-widest">Hilmi Putra</h2>
          </div>

          <div className="w-full max-w-sm border-t-[3px] border-dashed border-[#F9E9E7]/20 mb-10"></div>

          {/* Contacts */}
          <div className="flex flex-col items-center mb-10 text-[#F9E9E7] font-sans">
            <h3 className="font-bold text-lg mb-6 tracking-wide">Developer Contact</h3>

            <a href="https://www.instagram.com/hilmiabrptra?igsh=MWw2MWE0aHFqODZ0dA==" target="_blank" rel="noreferrer" className="flex items-center gap-3 mb-3 hover:text-[#EED372] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#F9E9E7] text-[#1A4A38] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="font-medium text-sm">@hilmiabrptra</span>
            </a>

            <a href="mailto:hilmip637@gmail.com" className="flex items-center gap-3 mb-8 hover:text-[#EED372] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#F9E9E7] text-[#1A4A38] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <span className="font-medium text-sm">hilmip637@gmail.com</span>
            </a>

            <p className="text-center text-[13px] font-medium opacity-80 leading-relaxed max-w-xs">
              Bandung, Indonesia
            </p>
          </div>

          <div className="w-full max-w-sm border-t-[3px] border-dashed border-[#F9E9E7]/20 mb-8"></div>

          <p className="text-[#F9E9E7]/60 font-sans text-xs font-semibold tracking-wide">2026 Hera & Taufik. Powered by Hilmi</p>
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
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-xl">{selectedGiftDetail.name}</p>
                  {selectedGiftDetailSoldOut && <span className="rounded-full bg-[#842434] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">Sold Out</span>}
                </div>
                <p className="font-medium text-sm text-[#1A4A38]/80">{selectedGiftDetail.description}</p>

                <div className="flex justify-between items-center mt-2 font-bold text-base">
                  <span>Harga</span>
                  <span>Rp {selectedGiftDetail.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-base">
                  <span>Sisa Produk</span>
                  <span>{selectedGiftDetailRemainingStock} Produk</span>
                </div>

                <p className="font-medium text-sm mt-2">
                  {selectedGiftDetailSoldOut
                    ? "Terima kasih, hadiah ini sudah sepenuhnya diklaim oleh tamu terkasih."
                    : selectedGiftDetailClaimedCount > 0
                      ? `Sudah diklaim ${selectedGiftDetailClaimedCount} produk. Kamu masih bisa mengonfirmasi maksimal ${selectedGiftDetailRemainingStock} produk.`
                      : "Hadiah ini masih tersedia untuk dikonfirmasi."}
                </p>
              </div>

              <div className="p-6 flex flex-col gap-3 mt-2">
                <a
                  href={selectedGiftDetail.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={selectedGiftDetailSoldOut}
                  tabIndex={selectedGiftDetailSoldOut ? -1 : 0}
                  onClick={(e) => {
                    if (selectedGiftDetailSoldOut) e.preventDefault();
                  }}
                  className={`w-full py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md ${selectedGiftDetailSoldOut ? "bg-[#C7BDB4] text-[#842434]/50 cursor-not-allowed shadow-none" : "bg-[#1A4A38] hover:bg-[#123628] text-white active:scale-95"}`}
                >
                  Beli Hadiah
                </a>
                <button
                  disabled={selectedGiftDetailSoldOut}
                  onClick={() => {
                    if (selectedGiftDetailSoldOut) return;
                    setSelectedGiftForm(selectedGiftDetail);
                    setSelectedGiftDetail(null);
                  }}
                  className={`w-full py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md ${selectedGiftDetailSoldOut ? "bg-[#C7BDB4] text-[#842434]/50 cursor-not-allowed shadow-none" : "bg-[#1A4A38] hover:bg-[#123628] text-white active:scale-95"}`}
                >
                  {selectedGiftDetailSoldOut ? "Sudah Diklaim" : "Confirm"}
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
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[#1A4A38] font-sans font-bold text-xl">{selectedGiftForm.name}</p>
                    <p className="text-[#842434] font-sans text-xs font-semibold mt-1">Sisa stok: {selectedGiftFormRemainingStock} produk</p>
                  </div>
                  {selectedGiftFormRemainingStock <= 0 && <span className="rounded-full bg-[#842434] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">Sold Out</span>}
                </div>

                <form className="flex flex-col gap-5 text-[#1A4A38] font-sans" onSubmit={handleClaimGift}>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Nama Pembeli</label>
                    <input
                      type="text"
                      name="claimed_by"
                      placeholder="Masukkan Nama"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">No. WhatsApp</label>
                    <input
                      type="tel"
                      name="claimed_phone"
                      placeholder="Masukkan Nomor Whatsapp"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Email</label>
                    <input
                      type="email"
                      name="claimed_email"
                      placeholder="Masukkan Email"
                      required
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-sm font-semibold">Jumlah produk dibeli</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      max={Math.max(1, selectedGiftFormRemainingStock)}
                      placeholder="Masukkan Jumlah Produk"
                      required
                      disabled={selectedGiftFormRemainingStock <= 0}
                      onChange={(e) => {
                        const value = Number(e.currentTarget.value);
                        if (value > selectedGiftFormRemainingStock) {
                          e.currentTarget.value = String(selectedGiftFormRemainingStock);
                        }
                        if (value < 1 && e.currentTarget.value !== "") {
                          e.currentTarget.value = "1";
                        }
                      }}
                      className="w-full py-2 border-b-2 border-slate-300 focus:border-[#1A4A38] outline-none bg-transparent placeholder:text-sm placeholder:text-slate-400 transition-colors"
                    />
                    <p className="text-xs font-medium text-[#842434]/80">
                      {selectedGiftFormRemainingStock <= 0 ? "Terima kasih, hadiah ini sudah sepenuhnya diklaim." : `Maksimal ${selectedGiftFormRemainingStock} produk sesuai sisa stok yang tersedia.`}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={claimSubmitting || selectedGiftFormRemainingStock <= 0}
                    className="w-full bg-[#1A4A38] hover:bg-[#123628] text-white py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md active:scale-95 mt-2 disabled:bg-[#C7BDB4] disabled:text-[#842434]/50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {selectedGiftFormRemainingStock <= 0 ? "Hadiah Sudah Diklaim" : claimSubmitting ? "Mengirim..." : "Konfirmasi Pembelian"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP Form Modal */}
      <AnimatePresence>
        {showRsvpModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A4A38]/30 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-[#F9E9E7] border-b border-[#842434]/10 rounded-t-3xl z-0" />

              <button
                onClick={() => setShowRsvpModal(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-white rounded-full text-[#842434] transition-colors"
              >
                ✕
              </button>

              <div className="p-8 relative z-10">
                <h3 className="text-[#842434] font-serif text-2xl font-bold mb-2 text-center">Lengkapi Data</h3>
                <p className="text-[#1A4A38] text-sm text-center mb-6">Silakan lengkapi data diri Anda sebelum konfirmasi kehadiran.</p>

                <div className="flex flex-col gap-4 text-[#1A4A38] font-sans">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#842434]">Nama Lengkap *</label>
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full py-2.5 px-3 rounded-lg border border-slate-200 focus:border-[#842434] outline-none bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#842434]">No. WhatsApp *</label>
                    <input
                      type="tel"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full py-2.5 px-3 rounded-lg border border-slate-200 focus:border-[#842434] outline-none bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#842434]">Pesan / Doa</label>
                    <textarea
                      value={rsvpNotes}
                      onChange={(e) => setRsvpNotes(e.target.value)}
                      placeholder="Tuliskan pesan atau doa untuk kedua mempelai..."
                      rows={3}
                      className="w-full py-2.5 px-3 rounded-lg border border-slate-200 focus:border-[#842434] outline-none bg-slate-50 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    onClick={handleRsvpSubmit}
                    disabled={!rsvpName.trim() || !rsvpPhone.trim() || rsvpSubmitting}
                    className="w-full bg-[#842434] hover:bg-[#6A1D2A] text-white py-3.5 rounded-xl font-sans font-bold text-center transition-all shadow-md active:scale-95 mt-4 disabled:opacity-50"
                  >
                    {rsvpSubmitting ? "Mengirim..." : "Konfirmasi Kehadiran"}
                  </button>
                </div>
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
