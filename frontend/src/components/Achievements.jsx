import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../utils/api'
import certIcon from '../assets/images/certificate.jpg'

export default function Achievements() {
  const [activeFile, setActiveFile] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get('/api/admin/achievements')
        // If DB is empty, use seed-like defaults but prefix with assets/
        if (res.data.length === 0) {
           setAchievements([
             {
               title: 'Nutanix Cloud Certification',
               desc: 'Awarded for proficiency in Nutanix Cloud Platform fundamentals.',
               pdfLink: '/assets/Nutanix_Certificate.pdf',
               provider: 'Nutanix'
             },
             {
               title: 'Artificial Intelligence',
               desc: 'Comprehensive certification covering AI models and neural networks.',
               pdfLink: '/assets/AI Certificate.pdf',
               provider: 'Coursera/IBM'
             }
           ])
        } else {
           setAchievements(res.data)
        }
      } catch (err) {
        console.error('Error fetching achievements:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  if (loading && achievements.length === 0) return null

  return (
    <div id="achievements" className="w-full py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-muted uppercase tracking-[0.2em]">Milestones</h4>
        <h2 className="text-center font-Ovo gradient-text mb-16 uppercase tracking-tighter">Certifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              whileHover={{ y: -5 }}
              className="group p-8 glass rounded-3xl border border-gray-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <img src={certIcon} alt="Certificate" className="w-12 mb-6 rounded-xl shadow-sm group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                  {cert.provider || 'Verified Achievement'}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-3 dark:text-white leading-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-Ovo mb-8">
                  {cert.desc || cert.description}
                </p>
              </div>
              <button
                onClick={() => setActiveFile(cert.pdfLink || cert.link)}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-[10px] uppercase tracking-widest font-bold active:scale-95 transition-all shadow-lg"
              >
                View Credential
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex justify-center items-center z-[100] p-4 lg:p-10"
            onClick={() => setActiveFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden max-w-6xl w-full h-full shadow-2xl relative border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-20 flex items-center justify-between px-10 border-b border-gray-100 dark:border-white/5">
                <h4 className="font-bold dark:text-white uppercase tracking-widest text-[10px]">Secure Certificate Viewer</h4>
                <button
                  onClick={() => setActiveFile(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 dark:text-white hover:bg-red-500 hover:text-white transition-all font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="h-[calc(100%-160px)] w-full">
                <iframe 
                  src={activeFile} 
                  className="w-full h-full border-0" 
                  title="Certificate Preview" 
                />
              </div>

              <div className="h-20 px-10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest hidden md:block">Verified by Rajendra Chaudhary</p>
                <a
                  href={activeFile}
                  download
                  className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-[10px] tracking-widest font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Download PDF Certificate
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
