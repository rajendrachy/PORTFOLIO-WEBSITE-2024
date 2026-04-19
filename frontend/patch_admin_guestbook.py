import re

with open('src/pages/AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add MessageSquare icon
content = content.replace("Mail,", "Mail,\n  MessageSquare,")

# 2. Add guestbooks to data state
content = content.replace(
    "projects: [], stats: [], notes: [], achievements: [], messages: []",
    "projects: [], stats: [], notes: [], achievements: [], messages: [], guestbooks: []"
)

# 3. Add to sidebar tabs
sidebar_tabs_old = """          {[
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
sidebar_tabs_new = """          {[
            { id: 'siteConfig', label: 'Site Config', icon: Settings },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'services', label: 'Services', icon: Code },
            { id: 'skills', label: 'Tech Stack', icon: Layers },
            { id: 'journeys', label: 'Experience', icon: Milestone },
            { id: 'blogs', label: 'Blogs', icon: FileText },
            { id: 'guestbooks', label: 'Guestbook', icon: MessageSquare },
            { id: 'stats', label: 'Analytics', icon: BarChart3 },
            { id: 'notes', label: 'Studies', icon: FileText },
            { id: 'achievements', label: 'Certificates', icon: Award },
            { id: 'messages', label: 'Inquiries', icon: Mail },
          ].map((item) => ("""
content = content.replace(sidebar_tabs_old, sidebar_tabs_new)

# 4. Add to mobile nav tabs
mobile_tabs_old = """          {[
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
mobile_tabs_new = """          {[
            { id: 'siteConfig', icon: Settings },
            { id: 'projects', icon: Briefcase },
            { id: 'services', icon: Code },
            { id: 'skills', icon: Layers },
            { id: 'journeys', icon: Milestone },
            { id: 'blogs', icon: FileText },
            { id: 'guestbooks', icon: MessageSquare },
            { id: 'stats', icon: BarChart3 },
            { id: 'notes', icon: FileText },
            { id: 'achievements', icon: Award },
            { id: 'messages', icon: Mail },
          ].map((item) => ("""
content = content.replace(mobile_tabs_old, mobile_tabs_new)

# 5. Add dynamic title matching
title_map_old = """(activeTab === 'skills' ? 'name' : 'title')"""
title_map_new = """(activeTab === 'skills' || activeTab === 'guestbooks' ? 'name' : 'title')"""
content = content.replace(title_map_old, title_map_new)

# 6. Add "approved" checkbox and label to the generic form
generic_form_old = """              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                  {activeTab === 'projects' ? 'Technologies' : (activeTab === 'stats' ? 'Number Value' : 'URL / Link (Optional)')}
                </label>"""
generic_form_new = """              {activeTab === 'guestbooks' && (
                <div className="space-y-2 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                  <input type="checkbox" id="approved" checked={form.approved || false} onChange={e => setForm({...form, approved: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="approved" className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-widest cursor-pointer">Approved for Public Display</label>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                  {activeTab === 'projects' ? 'Technologies' : (activeTab === 'stats' ? 'Number Value' : 'URL / Link (Optional)')}
                </label>"""
content = content.replace(generic_form_old, generic_form_new)

# 7. In renderContent card display, show if it is approved or not for guestbook
card_display_old = """              {item.tech && <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">{item.tech}</p>}"""
card_display_new = """              {item.tech && <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">{item.tech}</p>}
              {activeTab === 'guestbooks' && (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.approved ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {item.approved ? 'Approved' : 'Pending Review'}
                </span>
              )}"""
content = content.replace(card_display_old, card_display_new)

with open('src/pages/AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
