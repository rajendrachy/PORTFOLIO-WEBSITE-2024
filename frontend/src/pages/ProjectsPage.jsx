import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Briefcase, ExternalLink, Search, Filter } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/admin/projects')
        setProjects(res.data)
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.tech.toLowerCase().includes(filter.toLowerCase()))

  const categories = ['All', 'MERN', 'AI', 'React', 'DevOps']

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-blue-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
           >
             <Briefcase size={14} /> My Work
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter mb-8"
           >
             Full Project <span className="gradient-text">Archive</span>
           </motion.h1>
           <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo text-lg tracking-wide">
             A deep dive into my engineering journey, from real-time communication systems to AI-powered assistants.
           </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                 filter === cat 
                 ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xl scale-105' 
                 : 'bg-white/50 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/10 hover:border-blue-500/50'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Accessing Repository...</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="group glass rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
                     <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{project.tech}</span>
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-10 font-Ovo leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5 flex items-center gap-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-center rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95"
                    >
                      <ExternalLink size={14} /> Live View
                    </a>
                    <button className="w-14 h-14 border border-slate-200 dark:border-white/10 flex items-center justify-center rounded-2xl text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-500/30 transition-all">
                      <FaGithub size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-20 glass rounded-[3rem]">
             <Search size={48} className="mx-auto text-slate-300 mb-6" />
             <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">No matching projects found</h3>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
