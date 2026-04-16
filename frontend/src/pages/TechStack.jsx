import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Cpu, Zap, Box, Layers, Terminal } from 'lucide-react'

const techStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', cat: 'Frontend' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', cat: 'Backend' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', cat: 'Database' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', cat: 'DevOps' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', cat: 'Cloud' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', cat: 'Tools' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', cat: 'VCS' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', cat: 'VCS', darkInvert: true },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', cat: 'Database' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', cat: 'OS' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', cat: 'Frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', cat: 'Frontend' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', cat: 'Backend', darkInvert: true },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', cat: 'Tools' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', cat: 'Cloud', darkInvert: true },
]

export default function TechStack() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-blue-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
           >
             <Zap size={14} /> My Core Engine
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter mb-8"
           >
             The Modern <span className="gradient-text">Tech Stack</span>
           </motion.h1>
           <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo text-lg tracking-wide">
             A high-performance toolkit used to create, iterate, and deploy production-grade software solutions at scale.
           </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
           {techStack.map((tech, i) => (
             <motion.div
               key={tech.name}
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               whileHover={{ y: -10, rotate: 2 }}
               className="group p-8 glass rounded-[2.5rem] flex flex-col items-center justify-center border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all"
             >
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={`w-full h-full object-contain transition-transform group-hover:scale-110 ${tech.darkInvert ? 'dark:invert dark:brightness-200' : ''}`}
                  />
                </div>
                <h3 className="text-sm font-bold dark:text-white uppercase tracking-widest mb-1">{tech.name}</h3>
                <span className="text-[8px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{tech.cat}</span>
             </motion.div>
           ))}
        </div>

        {/* Feature Sections */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: 'Frontend Mastery', icon: Layers, desc: 'Responsive, accessible, and fast UI development with React and modern CSS.' },
             { title: 'Backend Robustness', icon: Terminal, desc: 'Secure APIs and scalable architectures using Node.js and distributed databases.' },
             { title: 'DevOps & Automation', icon: Cpu, desc: 'Streamlining development cycles with Docker, CI/CD, and cloud native services.' }
           ].map((item, i) => (
             <motion.div
               key={item.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-12 glass rounded-[3rem] border border-slate-100 dark:border-white/5"
             >
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20">
                   <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-Ovo text-sm leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
