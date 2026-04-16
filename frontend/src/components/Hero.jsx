import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import profileImg from '../assets/images/profiles.jpeg'

const strings = ['Full Stack Web Developer', 'Software Engineer']

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)

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
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-110 -z-10" />
        <img
          src={profileImg}
          alt="Rajendra Chaudhary"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl ring-4 ring-white/10"
        />
      </motion.div>

      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3 text-lg md:text-2xl font-Ovo text-gray-500 dark:text-gray-400"
      >
        Hi! I'm <span className="text-gray-900 dark:text-white font-semibold">Rajendra Chaudhary</span> 👋
      </motion.h3>

      <h1 className="h-[80px] md:h-[140px] font-Ovo leading-tight">
        <span className="text-black dark:text-white">{displayText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-10 md:h-14 bg-blue-500 ml-1 translate-y-2 md:translate-y-3"
        />
      </h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-400 font-Ovo leading-relaxed text-sm md:text-base"
      >
        I am a Full Stack Web | Software Developer from Nepal,
        specializing in building scalable, secure web applications and robust infrastructure.
      </motion.p>

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
          Contact me
          <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
        </a>

        <a
          href="/resume.pdf"
          download
          className="w-2/3 sm:w-auto px-8 py-3.5 border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
        >
          Get Resume
          <span className="material-icons-outlined text-sm">download</span>
        </a>

        <Link
          to="/game"
          className="w-2/3 sm:w-auto px-8 py-3.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-200 dark:hover:bg-blue-900/50 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 group"
        >
          Play Game <span className="group-hover:animate-bounce">🎮</span>
        </Link>
      </motion.div>
    </div>
  )
}
