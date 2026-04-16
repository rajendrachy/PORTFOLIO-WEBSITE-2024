import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ExternalLink, ArrowRight, Sparkles, X, LayoutTemplate } from 'lucide-react'

export default function Work() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [previewProject, setPreviewProject] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/admin/projects')
        setProjects(res.data.slice(0, 3)) // Only show top 3 on Home
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading && projects.length === 0) return null

  return (
    <div id="work" className="w-full py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
           >
             <Sparkles size={12} /> Curated Showcase
           </motion.div>
           <h2 className="font-Ovo gradient-text text-4xl md:text-5xl uppercase tracking-tighter mb-4">Latest Work</h2>
           <p className="max-w-xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo">
             A high-end selection of my recent engineering projects, ranging from real-time systems to cloud native solutions.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5"
            >
              {/* Image Layer */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426'})`,
                  backgroundColor: '#0f172a'
                }}
              />
              
              {/* Overlay Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 transition-all duration-500 group-hover:opacity-95" />

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">{project.tech}</span>
                <h3 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter transform transition-all duration-500 group-hover:-translate-y-2">
                  {project.title}
                </h3>
                
                <div className="overflow-hidden">
                   <p className="text-slate-300 text-sm mb-6 leading-relaxed transform transition-all duration-500 translate-y-32 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 line-clamp-3 font-Ovo">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex gap-4 transform transition-all duration-500 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={() => setPreviewProject(project)}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
                  >
                    <LayoutTemplate size={16} /> Live Preview
                  </button>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white border border-white/20 hover:border-white text-white hover:text-slate-900 active:scale-95 transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Preview Modal */}
        <AnimatePresence>
          {previewProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-md"
            >
              <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-white/10">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="font-bold text-sm ml-4 dark:text-white uppercase tracking-tight">{previewProject.title} — Live Demo</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={previewProject.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest hidden sm:block">Open Fullscreen ↗</a>
                    <button 
                      onClick={() => setPreviewProject(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-all text-slate-500 dark:text-slate-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                {/* Embedded iFrame */}
                <div className="flex-1 bg-slate-100 dark:bg-black relative">
                  <iframe 
                    src={previewProject.link}
                    title={previewProject.title}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[2.5rem] font-bold uppercase text-[10px] tracking-[0.2em] hover:shadow-2xl transition-all active:scale-95 shadow-xl group"
          >
            Access Full Archive 
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
