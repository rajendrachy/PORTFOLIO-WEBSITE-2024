import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 1. Basic Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("All fields are required.")
      setStatus('error')
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMessage("Please enter a valid email address.")
      setStatus('error')
      return;
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      // 2. Transmit to Backend (MongoDB storage + Email Notification)
      const dbResponse = await api.post('/api/contact', form)
      const dbOk = dbResponse.status === 200 || dbResponse.status === 201;

      if (dbOk) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        throw new Error("Failed to reach backend storage.")
      }
    } catch (err) {
      console.error(err)
      setErrorMessage("Failed to send message. Please try again later.")
      setStatus('error')
    }
  }

  return (
    <div id="contact" className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-muted">Get in Touch</h4>
        <h2 className="text-center font-Ovo gradient-text mb-16">Contact Me</h2>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 flex flex-col gap-8">
            <h3 className="text-2xl font-bold mb-2">Let's talk about your project</h3>
            <p className="font-Ovo mb-8 text-muted">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Email', value: 'chyrajendra32@gmail.com', href: 'mailto:chyrajendra32@gmail.com', icon: 'alternate_email' },
                { label: 'LinkedIn', value: 'rajendra1617', href: 'https://www.linkedin.com/in/rajendra1617/', icon: 'link' },
                { label: 'GitHub', value: 'rajendrachy', href: 'https://github.com/rajendrachy', icon: 'terminal' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-5 glass rounded-2xl group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="material-icons-outlined text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-muted tracking-widest">{item.label}</h4>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="https://wa.me/919534145947"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center justify-center gap-2 px-8 py-5 bg-green-600 text-white rounded-2xl shadow-xl shadow-green-600/20 font-bold uppercase tracking-widest text-xs"
            >
              💬 WhatsApp Chat
            </motion.a>
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit} className="p-8 md:p-12 glass rounded-[2.5rem] shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest ml-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-6 py-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-black/20 text-foreground outline-none focus:border-blue-600 transition-colors uppercase text-xs font-bold tracking-widest"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest ml-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-black/20 text-foreground outline-none focus:border-blue-600 transition-colors uppercase text-xs font-bold tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3 mb-10">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest ml-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can I help you today?"
                  rows={6}
                  required
                  className="w-full px-6 py-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-black/20 text-foreground outline-none focus:border-blue-600 transition-colors resize-none uppercase text-xs font-bold tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-5 rounded-2xl bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all disabled:opacity-50 active:scale-95 shadow-lg"
              >
                {status === 'sending' ? 'Transmitting...' : 'Transmit Message ⚡'}
              </button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-green-600 dark:text-green-400 text-center font-bold text-xs uppercase tracking-widest">
                  ✅ Message sent successfully
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-red-500 text-center font-bold text-xs uppercase tracking-widest">
                  ❌ {errorMessage || "Failed to send message"}
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
