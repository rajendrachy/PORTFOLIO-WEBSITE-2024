import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'

export default function GitHub() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/api/admin/site-config')
        setConfig(res.data)
      } catch (err) {
        console.error('Error fetching github config', err)
      }
    }
    fetchConfig()
  }, [])

  if (!config) return null;

  const username = config.githubUsername || 'rajendrachy';

  return (
    <div id="github" className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h4 className="mb-2 text-lg font-Ovo text-gray-500">Open Source Activity</h4>
        <h2 className="font-Ovo gradient-text mb-4">GitHub Contributions</h2>
        <p className="max-w-2xl mx-auto mb-16 font-Ovo text-gray-600 dark:text-gray-400">
          I'm an active contributor to open-source projects. Explore my coding streaks, metrics, and consistent development activity.
        </p>

        <div className="flex flex-col items-center gap-12 w-full">
          {/* Advanced Stats Cards Row */}
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex-1 min-w-[150px] p-6 glass rounded-2xl shadow-sm border border-gray-200 dark:border-white/10"
            >
              <h3 className="text-3xl font-bold dark:text-white">{config.githubRepos || '60+'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-2">Repositories</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="flex-1 min-w-[150px] p-6 glass rounded-2xl shadow-sm border border-gray-200 dark:border-white/10"
            >
              <h3 className="text-3xl font-bold dark:text-white">{config.githubCommits || '500+'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-2">Total Commits</p>
            </motion.div>
          </div>

          {/* Badges Overlay */}
          <div className="flex flex-wrap justify-center gap-4">
            <img
              src={`https://img.shields.io/github/followers/${username}?label=Followers&style=for-the-badge&color=8a2be2`}
              alt="Followers"
              className="h-7 shadow-sm"
            />
            <img
              src={`https://img.shields.io/github/stars/${username}?label=Stars&style=for-the-badge&color=ffd700`}
              alt="Stars"
              className="h-7 shadow-sm"
            />
          </div>

          {/* GitHub Streak - Scrollable on mobile */}
          <div className="w-full max-w-4xl overflow-x-auto no-scrollbar py-4 px-2">
            <div className="min-w-[500px] flex justify-center">
              <img
                src={`https://streak-stats.demolab.com?user=${username}&theme=tokyonight&hide_border=true&border_radius=15`}
                alt="GitHub Streak"
                className="w-full max-w-3xl rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Tech Ecosystem */}
          <div className="flex flex-wrap justify-center gap-4 py-8 max-w-4xl">
            {['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'Git', 'Docker'].map((tech) => (
              <span key={tech} className="px-5 py-2 glass rounded-full text-sm font-medium dark:text-gray-300">
                {tech}
              </span>
            ))}
          </div>

          {/* Contribution Graph - Scrollable on mobile */}
          <div className="w-full max-w-6xl overflow-x-auto no-scrollbar py-6">
            <div className="min-w-[800px] p-8 glass rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg">
              <h4 className="text-left mb-6 font-semibold dark:text-white">Activity Overview</h4>
              <img
                src={`https://ghchart.rshah.org/${username}`}
                alt="GitHub Contribution Graph"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
