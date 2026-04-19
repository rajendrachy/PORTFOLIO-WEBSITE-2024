import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'

export default function Guestbook() {
  const [entries, setEntries] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const res = await api.get('/api/guestbook')
      setEntries(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/guestbook', { name, message })
      setSuccess(true)
      setName('')
      setMessage('')
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      alert('Error submitting message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="guestbook" className="w-full py-24 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-gray-500">Public Ledger</h4>
        <h2 className="text-center font-Ovo gradient-text mb-16">Guestbook 📖</h2>
        
        <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl mb-16 border border-gray-200 dark:border-white/10 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
           <h3 className="text-2xl font-bold dark:text-white mb-6">Leave a trace</h3>
           {success ? (
             <div className="p-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-2xl font-bold text-center">
               Thanks for signing! Your message is waiting for admin approval.
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <input 
                   required
                   type="text" 
                   placeholder="Your Name" 
                   className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                   value={name}
                   onChange={e => setName(e.target.value)}
                 />
               </div>
               <div>
                 <textarea 
                   required
                   placeholder="Your Message (e.g. Love the design!)" 
                   className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none dark:text-white min-h-[120px] focus:ring-2 focus:ring-blue-500 transition-all"
                   value={message}
                   onChange={e => setMessage(e.target.value)}
                 />
               </div>
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
               >
                 {loading ? 'Submitting...' : 'Sign Guestbook'}
               </button>
             </form>
           )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold dark:text-white mb-8 border-b border-gray-200 dark:border-white/10 pb-4">
            Recent Signatures ({entries.length})
          </h3>
          {entries.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No signatures yet. Be the first!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {entries.map(entry => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={entry._id} 
                  className="p-6 glass rounded-3xl border border-gray-200 dark:border-white/10 hover:-translate-y-1 transition-transform"
                >
                  <p className="text-gray-700 dark:text-gray-300 font-Ovo text-lg mb-4">"{entry.message}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm dark:text-white">{entry.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{new Date(entry.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
