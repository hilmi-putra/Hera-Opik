import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Autoplay attempt on mount
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay blocked. Waiting for user interaction.");
        }
      }
    };

    // We can also try to play on the first click anywhere on the document
    // if the user hasn't clicked the vinyl yet.
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        playAudio();
      }
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    playAudio();

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/2112 - Reality Club (Official Lyric Video).mp3" loop />

      <div className="fixed bottom-6 left-6 z-[100] flex items-center justify-center">
        <motion.div
          onClick={togglePlay}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative cursor-pointer group"
        >
          {/* Vinyl Record Outer */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1a1a1a] shadow-2xl flex items-center justify-center relative overflow-hidden border-2 border-black/20"
          >
            {/* Vinyl Grooves Effect */}
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: "repeating-radial-gradient(circle, transparent, transparent 2px, rgba(255,255,255,0.05) 3px, transparent 4px)",
              }}
            />

            {/* Center Label */}
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#842434] border-2 border-[#C6A633] flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/20" />
            </div>

            {/* Reflection Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none" />
          </motion.div>

          {/* Tone Arm (Stylus) */}
          <motion.div animate={{ rotate: isPlaying ? 25 : 0 }} className="absolute -top-1 -right-1 w-8 h-8 pointer-events-none origin-top-right z-20">
            <div className="w-1 h-10 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full rotate-[120deg] origin-top translate-x-4 -translate-y-2 shadow-sm" />
          </motion.div>

          {/* Status Indicator Overlays */}
          <div className="absolute -top-2 -right-2 bg-[#C6A633] text-[#842434] w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-30 group-hover:scale-110 transition-transform">
            {isPlaying ? <Pause className="w-3 h-3 md:w-4 md:h-4 fill-current" /> : <Play className="w-3 h-3 md:w-4 md:h-4 ml-0.5 fill-current" />}
          </div>

          {/* Animated Music Notes when playing */}
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -40, x: -20, rotate: -20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="absolute -top-4 -left-2 text-[#842434] pointer-events-none"
                >
                  <Music className="w-4 h-4" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -50, x: 10, rotate: 20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-8 left-4 text-[#842434] pointer-events-none"
                >
                  <Music className="w-3 h-3" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
