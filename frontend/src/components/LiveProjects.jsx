import { motion } from 'framer-motion'

const liveProjects = [
  {
    title: 'Chat Application',
    tech: 'MERN Stack • Real-time Messaging',
    url: 'https://chat-app-rho-pearl.vercel.app/',
  },
  {
    title: 'Home Buyer Portal',
    tech: 'MERN • Govt Scheme Platform',
    url: 'https://home-buyer-portal.vercel.app',
  },
  {
    title: 'AI Virtual Assistant',
    tech: 'MERN + AI Integration',
    url: 'https://virtualassistant-1-41tx.onrender.com/signup',
  },
]

export default function LiveProjects() {
  return (
    <div id="live-projects" className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-gray-500">Experience Live</h4>
        <h2 className="text-center font-Ovo gradient-text mb-4">Interactive Demo</h2>
        <p className="text-center max-w-2xl mx-auto mb-20 font-Ovo text-gray-600 dark:text-gray-400">
          Try out some of my applications instantly. These interactive previews provide a real-time 
          look at functionality and design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 glass rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between min-h-[250px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Server</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">{project.tech}</p>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all active:scale-95"
              >
                Launch Application →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
