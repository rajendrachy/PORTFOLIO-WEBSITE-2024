import re

with open('src/pages/AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Icons
content = content.replace("Edit\n}", "Edit,\n  Layers,\n  Code,\n  Milestone\n}")

# 2. Add state
content = content.replace("const [form, setForm] = useState({})", "const [form, setForm] = useState({})\n  const [siteConfig, setSiteConfig] = useState({})")

# 3. Update fetchData
fetch_data_old = """  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/api/admin/${activeTab}`)
      setData(prev => ({ ...prev, [activeTab]: res.data }))
    } catch (err) {
      if (err.response?.status === 401) handleLogout()
    } finally {
      setLoading(false)
    }
  }"""
fetch_data_new = """  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'siteConfig') {
        const res = await api.get('/api/admin/site-config')
        setSiteConfig(res.data)
      } else {
        const res = await api.get(`/api/admin/${activeTab}`)
        setData(prev => ({ ...prev, [activeTab]: res.data }))
      }
    } catch (err) {
      if (err.response?.status === 401) handleLogout()
    } finally {
      setLoading(false)
    }
  }"""
content = content.replace(fetch_data_old, fetch_data_new)

# 4. Add handleSiteConfigSubmit
handle_submit_new = """  const handleSiteConfigSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put('/api/admin/site-config', siteConfig)
      alert('Site configuration updated successfully!')
    } catch (err) {
      console.error(err)
      alert('Error updating site config')
    }
  }"""
content = content.replace("const handleLogout = () => {", handle_submit_new + "\n\n  const handleLogout = () => {")

# 5. Add siteConfig render to renderContent
render_site_config = """    if (activeTab === 'siteConfig') {
      return (
        <form onSubmit={handleSiteConfigSubmit} className="space-y-6 max-w-3xl glass p-10 rounded-[3rem] border border-slate-100 dark:border-white/5">
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">Hero Greeting</label>
              <input className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none" value={siteConfig.heroGreeting || ''} onChange={e => setSiteConfig({...siteConfig, heroGreeting: e.target.value})} />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">Hero Title</label>
              <input className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none" value={siteConfig.heroTitle || ''} onChange={e => setSiteConfig({...siteConfig, heroTitle: e.target.value})} />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">Hero Description</label>
              <textarea className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none min-h-[100px]" value={siteConfig.heroDescription || ''} onChange={e => setSiteConfig({...siteConfig, heroDescription: e.target.value})} />
           </div>
           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">Resume Link URL</label>
                <input className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none" value={siteConfig.resumeLink || ''} onChange={e => setSiteConfig({...siteConfig, resumeLink: e.target.value})} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">Contact Button Text</label>
                <input className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none" value={siteConfig.contactText || ''} onChange={e => setSiteConfig({...siteConfig, contactText: e.target.value})} />
             </div>
           </div>
           <button type="submit" className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">Save Global Settings</button>
        </form>
      )
    }

"""
content = content.replace("const items = data[activeTab] || []", render_site_config + "    const items = data[activeTab] || []")

# 6. Sidebar tabs
sidebar_tabs_old = """          {[
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'stats', label: 'Analytics', icon: BarChart3 },
            { id: 'notes', label: 'Studies', icon: FileText },
            { id: 'achievements', label: 'Certificates', icon: Award },
            { id: 'messages', label: 'Inquiries', icon: Mail },
          ].map((item) => ("""
sidebar_tabs_new = """          {[
            { id: 'siteConfig', label: 'Site Config', icon: Settings },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'services', label: 'Services', icon: Code },
            { id: 'skills', label: 'Tech Stack', icon: Layers },
            { id: 'journeys', label: 'Experience', icon: Milestone },
            { id: 'blogs', label: 'Blogs', icon: FileText },
            { id: 'stats', label: 'Analytics', icon: BarChart3 },
            { id: 'notes', label: 'Studies', icon: FileText },
            { id: 'achievements', label: 'Certificates', icon: Award },
            { id: 'messages', label: 'Inquiries', icon: Mail },
          ].map((item) => ("""
content = content.replace(sidebar_tabs_old, sidebar_tabs_new)

# 7. Mobile Nav tabs
mobile_nav_tabs_old = """        {[
          { id: 'projects', icon: Briefcase },
          { id: 'stats', icon: BarChart3 },
          { id: 'notes', icon: FileText },
          { id: 'achievements', icon: Award },
          { id: 'messages', icon: Mail },
        ].map((item) => ("""
mobile_nav_tabs_new = """        {[
          { id: 'siteConfig', icon: Settings },
          { id: 'projects', icon: Briefcase },
          { id: 'services', icon: Code },
          { id: 'skills', icon: Layers },
          { id: 'journeys', icon: Milestone },
          { id: 'blogs', icon: FileText },
          { id: 'stats', icon: BarChart3 },
          { id: 'notes', icon: FileText },
          { id: 'achievements', icon: Award },
          { id: 'messages', icon: Mail },
        ].map((item) => ("""
content = content.replace(mobile_nav_tabs_old, mobile_nav_tabs_new)

# 8. Add New button condition
add_new_old = """{activeTab !== 'messages' && ("""
add_new_new = """{activeTab !== 'messages' && activeTab !== 'siteConfig' && ("""
content = content.replace(add_new_old, add_new_new)

# 9. Dynamic form handling (title label mapping)
title_map_old = """[activeTab === 'stats' ? 'label' : (activeTab === 'messages' ? 'name' : 'title')]"""
title_map_new = """[activeTab === 'stats' ? 'label' : (activeTab === 'messages' ? 'name' : (activeTab === 'skills' ? 'name' : 'title'))]"""
content = content.replace(title_map_old, title_map_new)

with open('src/pages/AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
