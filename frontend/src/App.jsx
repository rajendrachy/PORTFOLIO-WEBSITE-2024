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
        <Routes>
          <Route path="/" element={<Home dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/game" element={<Game />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/why-hire-me" element={<WhyHireMe />} />
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
