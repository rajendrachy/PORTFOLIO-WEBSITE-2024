import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import robotIcon from '../assets/images/robot-icon.png'

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm Rajendra's AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return

    setMessages(prev => [...prev, { sender: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply || "Sorry, I couldn't process that." }])
    } catch {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Connection lost. Please try again later.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Advanced Floating Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[340px] h-[500px] glass rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-white/10"
          >
            {/* Header */}
            <div className="bg-gray-900 dark:bg-black/40 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center p-2 shadow-inner">
                   <img src={robotIcon} alt="AI" className="w-full invert" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight">AI ASSISTANT</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest">Always Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-2xl leading-none">
                &times;
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-gray-50/50 dark:bg-black/20">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white dark:bg-white/10 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                   <div className="bg-white dark:bg-white/10 px-4 py-3 rounded-2xl flex gap-1 items-center shadow-sm">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-white dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-2 glass p-1 rounded-2xl pl-4 border-gray-200 dark:border-white/10">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me about Rajendra..."
                  className="flex-1 bg-transparent border-none outline-none text-sm dark:text-white"
                />
                <button 
                  onClick={sendMessage}
                  className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg active:scale-95"
                >
                  <span className="material-icons-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-16 h-16 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center shadow-2xl group relative"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-125 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
        <img src={robotIcon} alt="AI" className="w-8 dark:invert group-hover:scale-110 transition-transform" />
      </motion.button>
    </div>
  )
}
