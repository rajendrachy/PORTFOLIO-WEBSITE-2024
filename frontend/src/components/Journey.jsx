import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function Journey() {
  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const res = await api.get('/api/admin/journeys')
        // API returns newest first (createdAt: -1). For a timeline, oldest first is usually better
        setJourneys(res.data.reverse())
      } catch (err) {
        console.error('Error fetching journeys:', err)
      }
    }
    fetchJourneys()
  }, [])

  if (journeys.length === 0) return null

  return (
    <div id="journey" className="w-full px-[12%] py-20 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo text-gray-600 dark:text-white/70">My Academic Journey</h4>
      <h2 className="text-center text-5xl font-Ovo mb-6 dark:text-white">From Nursery to Engineering</h2>
      <p className="text-center max-w-2xl mx-auto mb-16 font-Ovo text-gray-600 dark:text-white/70">
        A journey of growth, learning, and continuous evolution — from early education to becoming a future software engineer.
      </p>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 h-full rounded-full" />

        <div className="space-y-16">
          {journeys.map((item, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            const color = i % 2 === 0 ? 'text-blue-600' : 'text-cyan-600'
            const dot = i % 2 === 0 ? 'bg-blue-600' : 'bg-cyan-500'
            const highlight = i === journeys.length - 1

            return (
              <div key={item._id || i} className="flex flex-col md:flex-row items-center justify-between gap-4">
                {side === 'left' ? (
                  <>
                    <div className={`md:w-5/12 p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:-translate-y-2 hover:scale-105
                      ${highlight
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-white/20'
                        : 'bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20'
                      } backdrop-blur-lg`}>
                      <h3 className={`text-xl font-semibold ${color}`}>{item.title}</h3>
                      <p className="text-gray-600 dark:text-white/80 mt-2 text-sm">{item.desc || item.description}</p>
                    </div>
                    <div className={`w-6 h-6 ${dot} rounded-full border-4 border-white dark:border-black z-10 shrink-0`} />
                    <div className="md:w-5/12" />
                  </>
                ) : (
                  <>
                    <div className="md:w-5/12" />
                    <div className={`w-6 h-6 ${dot} rounded-full border-4 border-white dark:border-black z-10 shrink-0`} />
                    <div className={`md:w-5/12 p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:-translate-y-2 hover:scale-105
                      ${highlight
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-white/20'
                        : 'bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20'
                      } backdrop-blur-lg`}>
                      <h3 className={`text-xl font-semibold ${color}`}>{item.title}</h3>
                      <p className="text-gray-600 dark:text-white/80 mt-2 text-sm">{item.desc || item.description}</p>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
