import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import notesIcon from '../assets/images/notes.png'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/notes`)
        if (res.data.length === 0) {
           // Fallback to initial seeds if DB is empty
           setNotes([
              {
                title: 'DBMS',
                fullTitle: 'Database Management Systems',
                desc: 'Normalisation, SQL, Transactions, Indexing, and Architecture.',
                link: 'https://drive.google.com/drive/folders/1Hn4OHvxm87ChwT8Tc5WN9zC59y5mQpoO?usp=drive_link',
                color: 'border-blue-500/20'
              },
              {
                title: 'OOPS',
                fullTitle: 'Object Oriented Programming',
                desc: 'Inheritance, Polymorphism, Abstraction, and Encapsulation with examples.',
                link: 'https://drive.google.com/drive/folders/14yjanLg_bU-KmocNjgDMQu_GAOHRMl43?usp=drive_link',
                color: 'border-blue-500/20'
              }
           ])
        } else {
           setNotes(res.data)
        }
      } catch (err) {
        console.error('Error fetching notes:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  if (loading && notes.length === 0) return null

  return (
    <div id="notes" className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-muted uppercase tracking-[0.2em]">Study Resources</h4>
        <h2 className="text-center font-Ovo gradient-text mb-16 uppercase tracking-tighter">Handwritten Notes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <motion.div
              key={note._id || index}
              whileHover={{ y: -8 }}
              className={`p-10 glass rounded-[2.5rem] border ${note.color || 'border-slate-100 dark:border-white/5'} hover:shadow-2xl transition-all h-full flex flex-col justify-between`}
            >
              <div>
                <img src={notesIcon} alt="Notes" className="w-12 mb-6" />
                <h3 className="text-xl font-bold dark:text-white mb-2">{note.title}</h3>
                <h4 className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-6">{note.fullTitle || 'Academic Resource'}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-Ovo leading-relaxed mb-10">
                  {note.desc || note.description}
                </p>
              </div>
              <a
                href={note.link}
                target={note.link !== '#' ? '_blank' : undefined}
                rel="noreferrer"
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-center rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:shadow-xl transition-all active:scale-95"
              >
                Access Knowledge Base
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
