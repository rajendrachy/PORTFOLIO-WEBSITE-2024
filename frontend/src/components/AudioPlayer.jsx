import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from 'lucide-react';

// ✅ Direct CDN audio URLs (not /download/ redirect links)
const PLAYLIST = [
  {
    title: "Lofi Study",
    artist: "Pixabay",
    url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
  {
    title: "Chill Lofi Beat",
    artist: "Pixabay",
    url: "https://cdn.pixabay.com/audio/2022/10/25/audio_946b6cebcb.mp3",
  },
  {
    title: "Coffee Lofi",
    artist: "Pixabay",
    url: "https://cdn.pixabay.com/audio/2023/06/19/audio_a1ef06e3cf.mp3",
  },
  {
    title: "Ambient Piano",
    artist: "Pixabay",
    url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3",
  },
  {
    title: "Midnight Jazz",
    artist: "Pixabay",
    url: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
  },
  {
    title: "Synthwave Night",
    artist: "Pixabay",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_270f49b44e.mp3",
  },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleKey, setTitleKey] = useState(0);

  const audioRef = useRef(null);
  // Use a ref to track isPlaying inside effects without stale closures
  const isPlayingRef = useRef(false);

  const currentSong = PLAYLIST[currentIndex];

  // Sync isPlayingRef with isPlaying state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Set volume on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  // When track index changes → load new track → play if we were playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.src = PLAYLIST[currentIndex].url;
    audio.volume = 0.3;
    audio.muted = isMuted;
    audio.load();

    setTitleKey(prev => prev + 1);

    if (isPlayingRef.current) {
      const timer = setTimeout(() => {
        audio.play().catch(err => console.warn('Autoplay blocked:', err));
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => console.warn('Play failed:', err));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(prev => !prev);
    }
  };

  const playNext = () => {
    setCurrentIndex(prev => (prev + 1) % PLAYLIST.length);
  };

  const playPrev = () => {
    setCurrentIndex(prev => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleEnded = () => {
    playNext();
  };

  // Prevent button pointer-down from starting a drag gesture
  const stopDrag = (e) => e.stopPropagation();

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      whileDrag={{ scale: 1.05, boxShadow: '0 28px 56px rgba(0,0,0,0.4)' }}
      className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 px-3 py-3 glass rounded-full shadow-2xl border border-white/20 dark:border-white/10 select-none"
      style={{ touchAction: 'none', cursor: 'grab' }}
    >
      {/* Audio element */}
      <audio ref={audioRef} onEnded={handleEnded} preload="auto" />

      {/* ⠿ Drag handle — 3×2 dot grid */}
      <div
        className="flex flex-col gap-[3px] px-0.5 flex-shrink-0 text-slate-400 dark:text-slate-500 hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
        title="Drag to move"
        style={{ cursor: 'grab' }}
      >
        {[0, 1, 2].map(row => (
          <div key={row} className="flex gap-[3px]">
            <div className="w-[3px] h-[3px] rounded-full bg-current" />
            <div className="w-[3px] h-[3px] rounded-full bg-current" />
          </div>
        ))}
      </div>

      {/* ⏮ Prev */}
      <button
        onPointerDown={stopDrag}
        onClick={playPrev}
        title="Previous song"
        className="w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center justify-center transition-colors rounded-full"
        style={{ cursor: 'pointer' }}
      >
        <SkipBack size={16} fill="currentColor" />
      </button>

      {/* ▶ / ⏸ Play / Pause */}
      <button
        onPointerDown={stopDrag}
        onClick={togglePlay}
        title={isPlaying ? 'Pause' : 'Play'}
        className="w-11 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-blue-500/30 flex-shrink-0"
        style={{ cursor: 'pointer' }}
      >
        {isPlaying
          ? <Pause size={18} fill="currentColor" />
          : <Play size={18} className="ml-0.5" fill="currentColor" />}
      </button>

      {/* ⏭ Next */}
      <button
        onPointerDown={stopDrag}
        onClick={playNext}
        title="Next song"
        className="w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center justify-center transition-colors rounded-full"
        style={{ cursor: 'pointer' }}
      >
        <SkipForward size={16} fill="currentColor" />
      </button>

      {/* Song Info + Visualizer */}
      <div className="flex flex-col pr-1 min-w-0" style={{ maxWidth: '130px' }}>
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Music size={11} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span
              key={titleKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-white truncate"
            >
              {currentSong.title}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Track counter */}
        <span className="text-[9px] text-slate-400 dark:text-slate-500 pl-[19px] mb-0.5">
          {currentIndex + 1} / {PLAYLIST.length}
        </span>

        {/* Animated Equalizer */}
        <div className="flex items-end gap-[2px] h-3 pl-[19px]">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={isPlaying
                ? { height: ['20%', '100%', '40%', '80%', '20%'] }
                : { height: '20%' }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.12,
                ease: 'easeInOut',
              }}
              className="w-1 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
              style={{ minHeight: '3px' }}
            />
          ))}
        </div>
      </div>

      {/* 🔇 / 🔊 Mute */}
      <button
        onPointerDown={stopDrag}
        onClick={toggleMute}
        title={isMuted ? 'Unmute' : 'Mute'}
        className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex-shrink-0"
        style={{ cursor: 'pointer' }}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>
    </motion.div>
  );
}
