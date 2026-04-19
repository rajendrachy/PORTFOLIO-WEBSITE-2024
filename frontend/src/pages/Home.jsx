import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import ExploreMore from '../components/ExploreMore'
import LiveProjects from '../components/LiveProjects'
import Journey from '../components/Journey'
import Stats from '../components/Stats'
import Work from '../components/Work'
import Achievements from '../components/Achievements'
import Notes from '../components/Notes'
import GitHub from '../components/GitHub'
import Guestbook from '../components/Guestbook'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AiChat from '../components/AiChat'

// Advanced Scroll Transition Config
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
}

export default function Home({ dark, toggleTheme }) {
  const { t } = useTranslation()
  return (
    <div className="relative">
      {/* Refined Background gradient decoration */}
      <div className="fixed top-0 right-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        {/* Top Right Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full" />
        {/* Bottom Left Glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <Navbar dark={dark} toggleTheme={toggleTheme} />

      <main>
        <section id="top" className="min-h-screen flex items-center justify-center pt-20">
          <Hero />
        </section>

        <motion.section {...fadeInUp}>
          <ExploreMore />
        </motion.section>

        <motion.section {...fadeInUp}>
          <LiveProjects />
        </motion.section>

        {/* Improved Opportunity Banner */}
        <motion.section 
          {...fadeInUp}
          className="py-24 px-6 md:px-[10%] text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-3xl -z-10" />
          <h4 className="text-lg font-Ovo text-gray-500 dark:text-gray-400">Open for Opportunities</h4>
          <h2 className="mt-2 mb-6 font-Ovo gradient-text">
            Let's Build Something Amazing 🚀
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-300">
            I specialize in building scalable full-stack applications and deploying them with modern DevOps practices.
            I'm currently looking for roles where I can contribute to impactful software.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Internship', 'Freelance', 'Full-Time'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium shadow-sm">
                ✔ {tag} Ready
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#contact" className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
              {t('btn_hire_me')} 🚀
            </a>
            <a 
              href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/resume/download`} 
              className="w-full sm:w-auto px-10 py-3.5 border border-gray-300 dark:border-white/20 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              {t('btn_get_resume')} 📄
            </a>
          </div>
        </motion.section>

        <motion.div {...fadeInUp} id="about-wrapper">
          <About />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Journey />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Stats />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Work />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Achievements />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Notes />
        </motion.div>

        <motion.div {...fadeInUp}>
          <GitHub />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Guestbook />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Contact />
        </motion.div>
      </main>

      <Footer />
      <AiChat />
    </div>
  )
}
