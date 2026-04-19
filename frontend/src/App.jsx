import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Game from './pages/Game'
import Blog from './pages/Blog'
import Services from './pages/Services'
import ProjectsPage from './pages/ProjectsPage'
import TechStack from './pages/TechStack'
import WhyHireMe from './pages/WhyHireMe'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggleTheme = () => setDark(prev => !prev)

  // Protected Route for Admin
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken')
    return token ? children : <Navigate to="/admin/login" />
  }

  return (
    <Router>
      <div className={dark ? 'dark' : ''}>
        <ToastContainer position="bottom-right" theme={dark ? 'dark' : 'light'} />
        <Routes>
          <Route path="/" element={<Home dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/game" element={<Game dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/blog" element={<Blog dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/services" element={<Services dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/projects" element={<ProjectsPage dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/tech-stack" element={<TechStack dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/why-hire-me" element={<WhyHireMe dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}






