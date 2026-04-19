import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { ArrowUp, Heart } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/rajendrachy', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rajendra1617/', icon: FaLinkedin },
    { name: 'Twitter', href: 'https://x.com/Rajendrachy32', icon: FaTwitter },
  ]

  const navGroups = [
    { name: 'Core', links: [{ n: 'Home', h: '/' }, { n: 'About', h: '/#about' }, { n: 'Services', h: '/services' }] },
    { name: 'Work', links: [{ n: 'Projects', h: '/projects' }, { n: 'Blog', h: '/blog' }, { n: 'Mini Game', h: '/game' }] },
    { name: 'Support', links: [{ n: 'Tech Stack', h: '/tech-stack' }, { n: 'Why Hire Me', h: '/why-hire-me' }, { n: 'Contact', h: '/#contact' }] }
  ]

  return (
    <footer className="w-full pt-24 pb-12 px-6 md:px-[10%] border-t border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="w-12 h-12" />
              <span className="text-3xl font-black uppercase tracking-tighter dark:text-white">Rajendra</span>
            </Link>
            <p className="max-w-md text-slate-500 dark:text-slate-400 font-Ovo text-lg leading-relaxed">
              Engineering high-performance digital solutions with a focus on MERN stack and Software Engineering excellence. Based in Nepal, serving the global web.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-slate-100 dark:border-white/10 dark:text-white shadow-sm"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-20">
             {navGroups.map((group) => (
               <div key={group.name} className="space-y-6">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">{group.name}</h4>
                 <ul className="space-y-4">
                   {group.links.map((link) => (
                     <li key={link.n}>
                        <Link 
                          to={link.h} 
                          className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          {link.n}
                        </Link>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 flex items-center gap-2">
            © {new Date().getFullYear()} Rajendra Chaudhary <span className="text-slate-200 dark:text-white/10">|</span> 
            {t('footer_handcrafted')} <Heart size={10} className="text-red-500 fill-red-500" /> & React
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 px-8 py-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            Terminal Return <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
