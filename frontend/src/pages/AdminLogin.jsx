import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { motion } from 'framer-motion'
import { LogIn, User, Lock, AlertCircle, ArrowLeft } from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/admin/login', { username, password })
      localStorage.setItem('adminToken', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid Credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
          <ArrowLeft size={16} /> Return to Home
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl shadow-xl shadow-blue-500/20 mb-6 text-white">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-Outfit">Admin Control</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-Ovo tracking-wide">Enter credentials to access the bridge</p>
        </div>

        <form onSubmit={handleLogin} className="glass p-10 rounded-[2.5rem] shadow-2xl space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-medium"
            >
              <AlertCircle size={20} />
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em] ml-2">Commander Identity</label>
            <div className="relative">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400" />
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-black/20 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-xs tracking-widest"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em] ml-2">Secure Key</label>
            <div className="relative">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-black/20 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-xs tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all disabled:opacity-50 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Authorize Access ⚡'}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-700 dark:text-slate-400 font-bold uppercase tracking-[0.3em]">
          Restricted Access Area — Unauthorized attempts will be logged
        </p>
      </motion.div>
    </div>
  )
}
