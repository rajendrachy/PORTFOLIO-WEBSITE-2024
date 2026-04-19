import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  LogOut, 
  Settings,
  Globe,
  FileText,
  Award,
  Mail,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects')
  const [data, setData] = useState({ projects: [], stats: [], notes: [], achievements: [], messages: [] })
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Generic forms state
  const [form, setForm] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    setForm({})
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/api/admin/${activeTab}`)
      setData(prev => ({ ...prev, [activeTab]: res.data }))
    } catch (err) {
      if (err.response?.status === 401) handleLogout()
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
     await api.post(`/api/admin/${activeTab}`, form)
      setShowAddModal(false)
      fetchData()
      setForm({})
    } catch (err) { 
      console.error(err);
      alert(err.response?.data?.msg || 'Error processing request');
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this record?')) return
    try {
     await api.delete(`/api/admin/${activeTab}/${id}`)
      fetchData()
    } catch (err) { alert('Error deleting') }
  }

  const renderContent = () => {
    if (loading) return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700 dark:text-slate-400">Synchronizing Data...</p>
      </div>
    )

    const items = data[activeTab] || []

    if (items.length === 0) return (
      <div className="text-center py-20 glass rounded-[3rem]">
        <p className="text-slate-700 dark:text-slate-400 font-Ovo tracking-wide">No records found in {activeTab}.</p>
      </div>
    )

    if (activeTab === 'stats') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div 
              layout 
              key={item._id} 
              className="glass p-10 rounded-[3rem] border-slate-100 dark:border-white/5 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-900 shadow-xl">
                      <BarChart3 size={24} />
                   </div>
                   <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                   </button>
                </div>
                <h3 className="text-5xl font-black dark:text-white mb-2 tracking-tighter tabular-nums">{item.number}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <motion.div 
            layout 
            key={item._id} 
            className="group glass p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border-slate-100 dark:border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {activeTab.slice(0, -1)}
                </span>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-3 tracking-tight">{item.title || item.label || item.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 font-Ovo">
                {item.description || item.desc || item.message || item.tech}
              </p>
            </div>
            {item.link || item.pdfLink || item.url ? (
               <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <a href={item.link || item.pdfLink || item.url} target="_blank" className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors">
                    <ExternalLink size={14} /> Open Resource
                  </a>
               </div>
            ) : null}
            {activeTab === 'messages' && <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-2">{item.email}</p>}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors font-Outfit">
      {/* Sidebar */}
      <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 p-10 flex flex-col hidden xl:flex">
        <div className="flex items-center gap-4 mb-14 px-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <span className="block font-bold tracking-tighter text-slate-900 dark:text-white uppercase text-2xl">CORE</span>
            <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] -mt-1">ADMIN HUB</span>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'stats', label: 'Analytics', icon: BarChart3 },
            { id: 'notes', label: 'Studies', icon: FileText },
            { id: 'achievements', label: 'Certificates', icon: Award },
            { id: 'messages', label: 'Inquiries', icon: Mail },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-8 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] transition-all group ${
                activeTab === item.id 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-2xl scale-[1.02]' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className={activeTab === item.id ? 'text-blue-400' : 'group-hover:text-blue-500'} />
                {item.label}
              </div>
              <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-10 flex items-center gap-4 px-8 py-5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-3xl font-bold uppercase tracking-widest text-[11px] transition-all"
        >
          <LogOut size={20} />
          Safe Terminate
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-4 px-8 py-5 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-3xl font-bold uppercase tracking-widest text-[11px] transition-all"
        >
          <Globe size={20} />
          View Live Site
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 lg:p-16 pb-32 xl:pb-16 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
               <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Management Console</h4>
            </div>
            <h1 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter">
              {activeTab}
            </h1>
          </div>
          {activeTab !== 'messages' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full md:w-auto px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl md:rounded-[2rem] font-bold uppercase tracking-widest text-[10px] md:text-xs hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
            >
              <Plus size={20} /> <span className="hidden sm:inline">Deploy New {activeTab.slice(0, -1)}</span>
              <span className="sm:hidden">Add New</span>
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 p-4 flex justify-around items-center xl:hidden z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        {[
          { id: 'projects', icon: Briefcase },
          { id: 'stats', icon: BarChart3 },
          { id: 'notes', icon: FileText },
          { id: 'achievements', icon: Award },
          { id: 'messages', icon: Mail },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-4 rounded-2xl transition-all ${
              activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' 
              : 'text-slate-400'
            }`}
          >
            <item.icon size={20} />
          </button>
        ))}
        <button onClick={handleLogout} className="p-4 text-red-500"><LogOut size={20} /></button>
      </nav>

      {/* Generic Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setShowAddModal(false)}
               className="absolute inset-0"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 40 }}
               className="relative w-full max-w-2xl glass p-10 md:p-14 rounded-[4rem] shadow-2xl overflow-y-auto max-h-[90vh]"
             >
               <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-10">Construct {activeTab.slice(0, -1)}</h2>
               <form onSubmit={handleSubmit} className="space-y-8">
                 {/* Dynamic Form Generation based on tab */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 col-span-2">
                        <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest ml-4">Primary Title / Label</label>
                        <input 
                            className="w-full px-8 py-5 rounded-3xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/20 border-transparent focus:border-blue-600/30 font-bold transition-all"
                            value={form.title || form.label || form.name || ''}
                            onChange={e => setForm({...form, [activeTab === 'stats' ? 'label' : (activeTab === 'messages' ? 'name' : 'title')]: e.target.value})}
                            required
                        />
                    </div>
                    {activeTab === 'projects' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest ml-4">Tech Stack</label>
                            <input className="w-full px-8 py-5 rounded-3xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/20" value={form.tech || ''} onChange={e => setForm({...form, tech: e.target.value})} />
                        </div>
                    )}
                    {activeTab === 'stats' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest ml-4">Metric Value</label>
                            <input className="w-full px-8 py-5 rounded-3xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/20" value={form.number || ''} onChange={e => setForm({...form, number: e.target.value})} />
                        </div>
                    )}
                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest ml-4">Direct Resource Link (URL)</label>
                        <input className="w-full px-8 py-5 rounded-3xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/20" value={form.link || form.pdfLink || ''} onChange={e => setForm({...form, [activeTab === 'achievements' ? 'pdfLink' : 'link']: e.target.value})} />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest ml-4">Technical Overview / Description</label>
                    <textarea 
                        className="w-full px-8 py-5 rounded-3xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/20 min-h-[150px] font-Ovo"
                        value={form.description || form.desc || ''}
                        onChange={e => setForm({...form, [activeTab === 'notes' ? 'desc' : 'description']: e.target.value})}
                        required
                    />
                 </div>

                 <div className="flex flex-col md:flex-row gap-4 pt-6">
                   <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-5 rounded-3xl bg-slate-100 dark:bg-white/5 dark:text-white font-bold uppercase text-[10px] tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">Cancel Request</button>
                   <button type="submit" className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold uppercase text-[10px] tracking-widest shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">Execute Deployment ⚡</button>
                 </div>
               </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
