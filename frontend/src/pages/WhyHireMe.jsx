import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Target, Code2, Rocket, CloudLightning, ShieldCheck, Heart, ArrowRight } from 'lucide-react'

const reasons = [
  {
    title: 'Problem Solver',
    desc: "I don't just write code; I architect solutions. I specialize in identifying technical bottlenecks and solving them with efficient, scalable logic.",
    icon: Target,
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Clean Architecture',
    desc: 'Code readability and maintainability are my priorities. I follow DRY, SOLID principles and industry best practices to ensure long-term stability.',
    icon: Code2,
    color: 'text-cyan-500',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30'
  },
  {
    title: 'Rapid Adaptability',
    desc: 'The tech landscape moves fast, and so do I. I pride myself on quickly mastering new frameworks and tools to deliver the best results possible.',
    icon: Rocket,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    title: 'Full-Stack Synergy',
    desc: 'With deep expertise in both Frontend (React) and Backend (Node.js/DevOps), I provide end-to-end development that ensures perfect integration.',
    icon: CloudLightning,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Reliability & Trust',
    desc: 'Consistency is key. I am dedicated to meeting deadlines and maintaining high standards of quality throughout the entire development lifecycle.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Passion Driven',
    desc: 'I genuinely love what I do. Every project is an opportunity to push the boundaries of what is possible in web engineering.',
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-100 dark:bg-red-900/30'
  }
]

export default function WhyHireMe() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-blue-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
           >
             <ShieldCheck size={14} /> Value Proposition
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter mb-8 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-400 bg-clip-text text-transparent"
           >
             Precision. Passion. <br />Performance.
           </motion.h1>
           <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo text-lg tracking-wide">
             Why settle for a developer when you can hire an engineering partner? Here is how I bring direct value to your next project.
           </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-12 glass rounded-[3rem] border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all"
            >
               <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:rotate-12`}>
                  <item.icon size={28} />
               </div>
               <h3 className="text-2xl font-bold dark:text-white mb-4 uppercase tracking-tight">
                  {item.title}
               </h3>
               <p className="text-slate-500 dark:text-slate-400 font-Ovo text-sm leading-relaxed mb-6">
                  {item.desc}
               </p>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 lg:p-20 bg-slate-900 dark:bg-white rounded-[4rem] text-center shadow-2xl relative overflow-hidden group"
        >
            <h2 className="text-3xl md:text-5xl font-black text-white dark:text-slate-950 uppercase tracking-tighter mb-8 text-center">
              Your Vision. My Engineering. <br />Let&apos;s <span className="text-blue-400">Collaborate</span>.
            </h2>
           <a 
             href="/#contact" 
             className="inline-flex items-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-[2.5rem] font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
           >
             Start The Project <ArrowRight size={18} />
           </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
