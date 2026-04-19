import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return

    // Extract numeric part (e.g. "15+" → 15, "99%" → 99)
    const numeric = parseInt(String(target).replace(/[^0-9]/g, ''), 10)
    if (isNaN(numeric)) {
      setCount(target)
      return
    }

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numeric))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(numeric)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])

  // Re-attach any suffix ("+", "%", "k", etc.)
  const suffix = String(target).replace(/[0-9]/g, '')
  return `${count}${suffix}`
}

// ── Single stat card ───────────────────────────────────────────────────────
const ICONS = ['🚀', '⭐', '💼', '🏆', '📦', '🔧', '🌐', '⚡']

function StatCard({ stat, index, started }) {
  const displayValue = useCountUp(stat.number, 2000, started)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="relative group p-8 glass rounded-[2.5rem] text-center shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden"
    >
      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ boxShadow: 'inset 0 0 30px 0 rgba(59,130,246,0.15)' }} />

      {/* Icon */}
      <div className="text-2xl mb-3 select-none">{ICONS[index % ICONS.length]}</div>

      {/* Animated number */}
      <h3 className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter tabular-nums ${stat.color}`}>
        {displayValue}
      </h3>

      {/* Label */}
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-bold leading-tight">
        {stat.label}
      </p>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-12 rounded-full opacity-60 group-hover:w-24 transition-all duration-500 ${stat.color?.replace('text-', 'bg-') || 'bg-blue-500'}`} />
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Stats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/admin/stats')
        setStats(res.data)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Start animation when section enters the viewport
  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimationStarted(true) },
      { threshold: 0.3 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [loading])

  if (loading || stats.length === 0) return null

  return (
    <div id="stats" ref={sectionRef} className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            📊 By the Numbers
          </span>
          <h4 className="mb-2 text-lg font-Ovo text-muted uppercase tracking-[0.2em]">My Impact</h4>
          <h2 className="font-Ovo gradient-text uppercase tracking-tighter">Data Metrics</h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat._id} stat={stat} index={i} started={animationStarted} />
          ))}
        </div>
      </div>
    </div>
  )
}
