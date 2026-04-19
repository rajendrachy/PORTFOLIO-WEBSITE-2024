import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/images/logo.png'

export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~1.3s
    const steps = 60
    const interval = 1300 / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      // Eased progress: fast at start, slows near end
      const eased = Math.round((1 - Math.pow(1 - current / steps, 2)) * 100)
      setProgress(eased)

      if (current >= steps) {
        clearInterval(timer)
        // Small pause at 100% then fade out
        setTimeout(() => {
          setVisible(false)
          setTimeout(() => onComplete?.(), 500)
        }, 200)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, hsl(221,83%,10%) 0%, hsl(251,44%,4%) 60%, #000 100%)',
          }}
        >
          {/* Ambient orbs */}
          <div
            className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, hsla(221,83%,53%,0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, hsla(188,78%,41%,0.14) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Centre content */}
          <div className="relative flex flex-col items-center gap-6 select-none">
            {/* Logo with pulse ring */}
            <div className="relative">
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, hsla(221,83%,53%,0.5) 0%, transparent 70%)',
                }}
              />
              <motion.img
                src={logo}
                alt="Rajendra Logo"
                initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-20 h-20 object-contain relative z-10 drop-shadow-2xl"
              />
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1
                className="text-4xl font-black tracking-tighter text-white uppercase leading-none"
                style={{ letterSpacing: '-0.03em', fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}
              >
                Rajendra
              </h1>
              <p
                className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: 'hsla(221,83%,70%,0.9)' }}
              >
                Software Engineer
              </p>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-64 flex flex-col gap-2"
            >
              {/* Track */}
              <div
                className="w-full h-[3px] rounded-full overflow-hidden"
                style={{ background: 'hsla(0,0%,100%,0.08)' }}
              >
                {/* Fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg, hsl(221,83%,53%), hsl(188,78%,41%))',
                    boxShadow: '0 0 12px hsla(221,83%,53%,0.8)',
                    transition: 'width 0.07s linear',
                  }}
                />
              </div>

              {/* Percentage */}
              <div className="flex justify-between items-center">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'hsla(0,0%,100%,0.3)' }}
                >
                  Loading
                </span>
                <span
                  className="text-[10px] font-bold tabular-nums"
                  style={{ color: 'hsla(221,83%,70%,0.8)' }}
                >
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white"
          >
            Portfolio · 2024
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
