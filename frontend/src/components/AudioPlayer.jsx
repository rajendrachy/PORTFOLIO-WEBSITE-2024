import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // You can replace this URL with your own favorite royalty-free track
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set default volume to 30% for a subtle vibe
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 p-3 glass rounded-full shadow-2xl border border-white/20 dark:border-white/10"
    >
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      <button 
        onClick={togglePlay}
        className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-blue-500/30"
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
      </button>

      <div className="flex flex-col pr-2">
        <div className="flex items-center gap-2">
          <Music size={12} className="text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-white">
            Ambient Lofi
          </span>
        </div>
        
        {/* Animated Equalizer Visualizer */}
        <div className="flex items-end gap-[2px] h-3 mt-1">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={isPlaying ? {
                height: ["20%", "100%", "40%", "80%", "20%"]
              } : { height: "20%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              className="w-1 bg-slate-400 dark:bg-slate-500 rounded-t-sm"
              style={{ minHeight: '3px' }}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={toggleMute}
        className="p-2 ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
  );
}
