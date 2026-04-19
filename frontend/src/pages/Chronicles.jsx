import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChroniclesSection from '../components/Chronicles'

export default function Chronicles({ dark, toggleTheme }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar dark={dark} toggleTheme={toggleTheme} />

      <main className="pt-28">
        <ChroniclesSection />
      </main>

      <Footer />
    </div>
  )
}
