import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import profileImg from '../assets/images/profiles.jpeg'
import { useTranslation } from 'react-i18next'
import { MapPin, Home, ChevronDown, BookHeart } from 'lucide-react'

const strings = ['Full Stack Web Developer', 'Software Engineer', 'MERN Stack Developer']

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)
  const { t } = useTranslation()

  useEffect(() => {
    const handleTyping = () => {
      const currentString = strings[index % strings.length]
      if (isDeleting) {
        setDisplayText(currentString.substring(0, displayText.length - 1))
        setSpeed(50)
      } else {
        setDisplayText(currentString.substring(0, displayText.length + 1))
        setSpeed(100)
      }

      if (!isDeleting && displayText === currentString) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setIndex(index + 1)
        setSpeed(200)
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index, speed])

  return (
    <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center">

      {/* ── Profile Image ── */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-110 -z-10" />
        <img
          src={profileImg}
          alt="Rajendra Chaudhary"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl ring-4 ring-white/10"
        />
        {/* Online indicator on avatar */}
        <span className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg">
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
        </span>
      </motion.div>

      {/* ── "Open to Work" badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
        className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-full shadow-sm"
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
          Open to Work
        </span>
        <span className="hidden sm:inline-block text-[10px] text-green-600/70 dark:text-green-500/60 font-medium">
          — Internship · Freelance · Full-Time
        </span>
      </motion.div>

      {/* ── Location row ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
      >
        {/* Current location */}
        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <MapPin size={12} className="text-blue-500 flex-shrink-0" />
          <span>Currently in</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            Himachal Pradesh, India 🇮🇳
          </span>
        </span>

        {/* Divider dot */}
        <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />

        {/* Hometown */}
        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Home size={12} className="text-orange-400 flex-shrink-0" />
          <span>Hometown</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            Nepal 🇳🇵
          </span>
        </span>
      </motion.div>

      {/* ── Greeting ── */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-3 text-lg md:text-2xl font-Ovo text-gray-500 dark:text-gray-400"
      >
        {t('hero_hi')} 👋
      </motion.h3>

      {/* ── Typewriter headline ── */}
      <h1 className="h-[80px] md:h-[140px] font-Ovo leading-tight">
        <span className="text-black dark:text-white">{displayText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-10 md:h-14 bg-blue-500 ml-1 translate-y-2 md:translate-y-3"
        />
      </h1>

      {/* ── Description ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-400 font-Ovo leading-relaxed text-sm md:text-base"
      >
        {t('hero_desc')}
      </motion.p>

      {/* ── CTA Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full"
      >
        <a
          href="#contact"
          className="w-2/3 sm:w-auto px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all font-bold text-xs uppercase tracking-widest group"
        >
          {t('nav_contact')}
          <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
        </a>

        <a
          href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/resume/download`}
          className="w-2/3 sm:w-auto px-8 py-3.5 border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
        >
          {t('btn_resume')}
          <span className="material-icons-outlined text-sm">download</span>
        </a>

        <Link
          to="/game"
          className="w-2/3 sm:w-auto px-8 py-3.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-200 dark:hover:bg-blue-900/50 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 group"
        >
          Play Game <span className="group-hover:animate-bounce">🎮</span>
        </Link>

        <Link
          to="/chronicles"
          className="w-2/3 sm:w-auto px-8 py-3.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-violet-200 dark:hover:bg-violet-900/50 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 group"
        >
          My Chronicles <BookHeart size={14} className="group-hover:scale-125 transition-transform" />
        </Link>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-14 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </div>
  )
}
