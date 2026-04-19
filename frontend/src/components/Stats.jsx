import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'

export default function Stats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading || stats.length === 0) return null

  return (
    <div id="stats" className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-muted uppercase tracking-[0.2em]">My Impact</h4>
        <h2 className="text-center font-Ovo gradient-text mb-16 uppercase tracking-tighter">Data Metrics</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat._id}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-10 glass rounded-[2.5rem] text-center shadow-xl border border-gray-100 dark:border-white/5"
            >
              <h3 className={`text-4xl md:text-5xl font-bold mb-3 ${stat.color} tracking-tighter`}>
                {stat.number}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
