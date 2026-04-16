import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Code, Server, Container, Globe, Sparkles, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    desc: 'Bespoke, high-performance full-stack web applications built with the MERN stack. Focused on scalability, SEO, and premium user experiences.',
    icon: Code,
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'API Engineering',
    desc: 'Robust, secure, and highly documented RESTful APIs. Optimized for performance and reliability using Node.js, Express, and modern middleware.',
    icon: Server,
    color: 'text-cyan-500',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30'
  },
  {
    title: 'DevOps & CI/CD',
    desc: 'Automated deployment pipelines and containerization with Docker. Ensuring smooth, zero-downtime releases and reliable infrastructure management.',
    icon: Container,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    title: 'Cloud Deployment',
    desc: 'Expert deployment and scaling on cloud platforms like Vercel, Render, and AWS. Optimized for high availability and maximum performance.',
    icon: Globe,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30'
  }
]

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-blue-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
           >
             <Sparkles size={14} /> My Expertise
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter mb-8"
           >
             Full Spectrum <span className="gradient-text">Services</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo text-lg tracking-wide"
           >
             I help businesses build, scale, and automate their digital world using the latest technology stacks and engineering best practices.
           </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group p-10 lg:p-14 glass rounded-[3rem] border border-slate-100 dark:border-white/5 flex flex-col lg:flex-row items-center lg:items-start gap-10 hover:shadow-2xl transition-all"
            >
              <div className={`w-24 h-24 shrink-0 flex items-center justify-center rounded-[2rem] ${service.bg} ${service.color} shadow-lg transition-transform group-hover:rotate-12`}>
                <service.icon size={40} />
              </div>
              
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold dark:text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-Ovo text-lg leading-relaxed mb-8">
                  {service.desc}
                </p>
                
                <button className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                  Learn more about process <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 lg:p-20 glass rounded-[4rem] text-center border-2 border-blue-500/20 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />

           <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-8 leading-tight">
             Let's Build Something <br /><span className="gradient-text">Spectacular</span> Together
           </h2>
           <p className="text-slate-500 dark:text-slate-400 font-Ovo text-lg mb-12 max-w-xl mx-auto">
             Available for new and exciting projects. I'm ready to turn your vision into a high-performance reality.
           </p>
           
           <a 
             href="/#contact" 
             className="inline-flex items-center gap-3 px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[2.5rem] font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
           >
             Initialize Contact ⚡
           </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
