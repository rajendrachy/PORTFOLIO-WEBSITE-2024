import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react'
import logo from '../assets/images/logo.png'

export default function Navbar({ dark, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Knowledge', href: '/blog' },
    { name: 'Tech Stack', href: '/tech-stack' },
    { name: 'Contact', href: '/#contact' },
  ]

  const isHome = location.pathname === '/'

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-[10%] ${
        isScrolled ? 'glass py-4 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img src={logo} alt="Logo" className="w-10 group-hover:rotate-[360deg] transition-transform duration-1000" />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-blue-600"
            >
              <Sparkles size={12} />
            </motion.div>
          </div>
          <span className="text-2xl font-black tracking-tighter dark:text-white uppercase">Rajendra</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden xl:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.href.startsWith('/#') && isHome ? (
                 <a 
                   href={link.href}
                   className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                 >
                   {link.name}
                 </a>
              ) : (
                <Link 
                  to={link.href}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    location.pathname === link.href 
                    ? 'text-blue-600 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all dark:text-white shadow-sm"
            aria-label="Toggle Theme"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link 
            to="/admin/dashboard"
            className="hidden lg:flex w-12 h-12 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
            title="Admin Hub"
          >
            <Menu size={20} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden w-12 h-12 flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-slate-900 z-[70] shadow-2xl p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <span className="text-xl font-black uppercase tracking-tighter dark:text-white">Navigation</span>
                 <button 
                   onClick={() => setIsMenuOpen(false)}
                   className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 dark:text-white"
                 >
                   <X size={24} />
                 </button>
              </div>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-black text-slate-900 dark:text-white hover:text-blue-600 transition-colors uppercase tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Link 
                  to="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-[2rem] font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20"
                >
                  Admin Terminal Access
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
