import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal as TerminalIcon } from 'lucide-react'
import api from '../utils/api'

export default function TerminalMode({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { command: '', output: 'Rajendra Chaudhary OS v1.0.0' },
    { command: '', output: 'Type "help" to see available commands.' }
  ])
  const [input, setInput] = useState('')
  const [projects, setProjects] = useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      fetchProjects()
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const fetchProjects = async () => {
    try {
      const res = await api.get('/api/admin/projects')
      setProjects(res.data)
    } catch (err) {
      console.error('Failed to fetch projects for terminal')
    }
  }

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    let output = ''

    if (trimmed === 'help') {
      output = `Available commands:
  about     - Learn more about me
  projects  - List my recent projects
  contact   - Get my contact info
  clear     - Clear the terminal screen
  gui       - Return to the normal website`
    } else if (trimmed === 'about') {
      output = 'Rajendra Chaudhary is a Full Stack Web Developer from Nepal specializing in scalable MERN stack applications.'
    } else if (trimmed === 'projects') {
      if (projects.length === 0) {
        output = 'Fetching projects... Try again in a moment.'
      } else {
        output = projects.map(p => `- ${p.title} (${p.tech})`).join('\n')
      }
    } else if (trimmed === 'contact') {
      output = 'Email: rajendrachaudhary@example.com\nGitHub: github.com/rajendrachy\nLocation: Nepal'
    } else if (trimmed === 'clear') {
      setHistory([])
      return
    } else if (trimmed === 'gui' || trimmed === 'exit') {
      onClose()
      return
    } else if (trimmed === '') {
      output = ''
    } else {
      output = `Command not found: ${trimmed}. Type "help" for a list of commands.`
    }

    setHistory(prev => [...prev, { command: cmd, output }])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8"
        >
          <div className="w-full max-w-5xl h-full max-h-[80vh] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-2xl flex flex-col overflow-hidden font-mono text-sm sm:text-base">
            
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] border-b border-[#111] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-gray-400">
                <TerminalIcon size={16} />
                <span className="text-xs tracking-wider">rajendra@portfolio:~</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-green-400 space-y-4" onClick={() => inputRef.current?.focus()}>
              {history.map((entry, i) => (
                <div key={i} className="space-y-1">
                  {entry.command && (
                    <div className="flex gap-2">
                      <span className="text-blue-400">rajendra@portfolio:~$</span>
                      <span className="!text-white">{entry.command}</span>
                    </div>
                  )}
                  {entry.output && (
                    <pre className="whitespace-pre-wrap font-mono text-green-400">{entry.output}</pre>
                  )}
                </div>
              ))}
              
              {/* Active Input Line */}
              <form onSubmit={onSubmit} className="flex gap-2 mt-4">
                <span className="text-blue-400">rajendra@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none !text-white font-mono"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={bottomRef} />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
