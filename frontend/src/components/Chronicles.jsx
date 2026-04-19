import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Globe, Cpu, Target, Feather,
  ChevronDown, ChevronUp, Lightbulb, Heart, Compass
} from 'lucide-react'

/* ─── Chapter Data ─────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 'world',
    icon: <Globe size={22} />,
    tag: 'Chapter I',
    title: 'The World I See',
    color: 'from-blue-600 to-cyan-500',
    accent: 'hsla(221,83%,53%,0.15)',
    entries: [
      {
        heading: 'On People',
        body: `People are the most complex and beautiful systems I've ever studied. Every person carries an entire universe inside — a lifetime of experiences, fears, and dreams that shaped who they are. I believe most people are fundamentally good, even when they do things that look wrong from the outside. They are just products of the environments they were placed in.`,
      },
      {
        heading: 'On the World',
        body: `The world is unfair by design — gravity doesn't care about your background, neither does time. But that's also why it's beautiful. You are not promised anything. Which means everything you build from scratch is entirely yours. I refuse to see the world as a problem. I see it as the only playground we have.`,
      },
      {
        heading: 'On Society',
        body: `Society runs on invisible contracts — agreements no one signed but everyone follows. The real power belongs to those who understand these contracts well enough to rewrite them. I want to be one of those people. Not to break systems, but to build better ones.`,
      },
    ],
  },
  {
    id: 'past',
    icon: <BookOpen size={22} />,
    tag: 'Chapter II',
    title: 'Past Generations & What They Left Me',
    color: 'from-violet-600 to-purple-500',
    accent: 'hsla(262,83%,53%,0.15)',
    entries: [
      {
        heading: 'My Roots',
        body: `I come from a place where most people never imagined using a computer, let alone building software. My past generations worked with their hands — farming, struggling, surviving. They didn't have the luxury of dreaming about code or startups. But they gave me something more valuable: the understanding that hard work is not optional.`,
      },
      {
        heading: "What They Taught Me Without Saying It",
        body: `No one in my family taught me about algorithms or system design. But they showed me discipline at 5am, patience through failed harvests, and the quiet dignity of doing difficult things without complaining. That is the firmware I run on.`,
      },
      {
        heading: 'The Generational Shift',
        body: `I am the first generation in my family to enter the world of technology. That weight is real — but so is the privilege. I carry their sacrifice and transform it into software that could change how the next generation lives. That is my deepest motivation.`,
      },
    ],
  },
  {
    id: 'journey',
    icon: <Compass size={22} />,
    tag: 'Chapter III',
    title: 'My Journey So Far',
    color: 'from-orange-500 to-rose-500',
    accent: 'hsla(25,90%,53%,0.15)',
    entries: [
      {
        heading: 'The Beginning',
        body: `I didn't start with a MacBook or a fast internet connection. I started with curiosity and a shaky Wi-Fi connection. My first "Hello, World!" felt like I'd discovered fire. That moment — seeing the machine do exactly what I told it — was when I knew this was my path.`,
      },
      {
        heading: 'Learning in the Dark',
        body: `Most of my early learning happened without guidance — YouTube tutorials at midnight, Stack Overflow rabbit holes, projects that crashed and burned before they worked. There was no mentor. Just me, the problem, and the relentless need to understand.`,
      },
      {
        heading: "What I've Built",
        body: `From a static HTML portfolio to a full-stack MERN platform with auth, dashboards, and AI integration — every project taught me something I couldn't learn from a textbook. I've broken production. I've debugged at 3am. I've shipped things I'm proud of. The journey is the education.`,
      },
    ],
  },
  {
    id: 'study',
    icon: <Cpu size={22} />,
    tag: 'Chapter IV',
    title: 'What I Study & Why',
    color: 'from-emerald-500 to-teal-500',
    accent: 'hsla(160,84%,39%,0.15)',
    entries: [
      {
        heading: 'Computer Science Fundamentals',
        body: `DSA, OS, DBMS, Networks, OOP — I study these not to pass interviews, but because they are the physics of software. Understanding why a hash map is O(1) or why a process context-switches changes how you think about every line of code you write.`,
      },
      {
        heading: 'Full-Stack Engineering',
        body: `React, Node.js, MongoDB, Docker, REST APIs — the full stack is my canvas. I care about the frontend because interfaces are where humans meet software. I care about the backend because that's where truth lives. I care about DevOps because code that doesn't ship is just a thought.`,
      },
      {
        heading: 'Philosophy & Mental Models',
        body: `I read philosophy alongside documentation. Stoicism, systems thinking, first-principles reasoning — these aren't soft skills. They are the operating system beneath all technical skills. A good engineer is first a clear thinker.`,
      },
    ],
  },
  {
    id: 'future',
    icon: <Target size={22} />,
    tag: 'Chapter V',
    title: 'What I Want to Become',
    color: 'from-sky-500 to-blue-600',
    accent: 'hsla(199,89%,48%,0.15)',
    entries: [
      {
        heading: 'The Engineer',
        body: `I want to be an engineer who doesn't just write code — but who architects solutions. Someone who can zoom out to see the full system and zoom in to fix the exact broken line. Senior, then Staff, then Principal. But titles aren't the goal. Depth is.`,
      },
      {
        heading: 'The Builder',
        body: `I want to build things that last — products that solve real problems for real people. Not another todo app. Something that a person in my hometown could use and say "this made my life easier." That is the bar I hold myself to.`,
      },
      {
        heading: 'The Person',
        body: `Beyond the code, I want to be someone who gives back. A mentor to the next person who is sitting in a small room at midnight, learning alone. Someone who writes, speaks, teaches, and lifts others while climbing. Success that isn't shared is just isolation with better furniture.`,
      },
    ],
  },
  {
    id: 'play',
    icon: <Feather size={22} />,
    tag: 'Chapter VI',
    title: 'How I Play & Rest',
    color: 'from-pink-500 to-rose-400',
    accent: 'hsla(330,81%,60%,0.15)',
    entries: [
      {
        heading: 'Music',
        body: `Lo-fi and piano instrumentals are the background score of my focus sessions. Music is the one thing that can slow down time and speed up thought simultaneously. I listen while I code, while I think, while I stare at the ceiling and let ideas collide.`,
      },
      {
        heading: 'Games & Simulations',
        body: `I see games as compressed life experiments. Strategy games taught me resource management. Puzzle games taught me lateral thinking. Even casual games taught me about feedback loops and motivation design — things I now apply to UI/UX. Play is never truly separate from learning.`,
      },
      {
        heading: 'Writing',
        body: `Writing is how I think out loud. Not every thought deserves an audience, but every thought deserves to be written. This very section exists because I believe that a person who can't articulate their ideas clearly has half the ideas they think they have.`,
      },
    ],
  },
  {
    id: 'philosophy',
    icon: <Lightbulb size={22} />,
    tag: 'Chapter VII',
    title: 'Raw Thoughts & Beliefs',
    color: 'from-amber-400 to-orange-500',
    accent: 'hsla(38,92%,50%,0.15)',
    entries: [
      {
        heading: 'On Failure',
        body: `Failure is just a data point with emotional packaging. The system didn't work — fine. Log the error, find the root cause, patch and redeploy. I've learned more from things that broke than from things that worked the first time.`,
      },
      {
        heading: 'On Time',
        body: `Time is the only non-renewable resource. Everyone has the same 24 hours — what differs is how precisely you spend them. I try to be intentional. Not productive in the hustle-culture sense, but intentional. Every day should move at least one needle in at least one direction.`,
      },
      {
        heading: 'On Being Young',
        body: `Being young means having the most valuable thing in the world: time to be wrong and recover. I'm not afraid of making mistakes. I'm afraid of making the same mistake twice without learning. That's the real waste.`,
      },
    ],
  },
]

/* ─── Sub-component: Chapter Card ─────────────────────────── */
function ChapterCard({ chapter, index }) {
  const [open, setOpen] = useState(index === 0)
  const [activeEntry, setActiveEntry] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: 'easeOut' }}
      className="rounded-[2rem] overflow-hidden border border-white/10 dark:border-white/5"
      style={{ background: 'hsla(0,0%,100%,0.02)' }}
    >
      {/* Chapter Header — click to toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-5 p-7 text-left group"
        style={{ background: chapter.accent }}
      >
        {/* Icon bubble */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${chapter.color} shadow-lg flex-shrink-0`}
        >
          {chapter.icon}
        </div>

        <div className="flex-1 min-w-0">
          <span
            className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-0.5"
            style={{ color: 'hsla(221,83%,70%,0.8)' }}
          >
            {chapter.tag}
          </span>
          <h3 className="text-lg font-black uppercase tracking-tighter dark:text-white leading-tight">
            {chapter.title}
          </h3>
        </div>

        <div className="flex-shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Chapter Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-8">
              {/* Entry tabs */}
              <div className="flex flex-wrap gap-2 mb-6 mt-4">
                {chapter.entries.map((entry, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveEntry(i)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border transition-all ${
                      activeEntry === i
                        ? `bg-gradient-to-r ${chapter.color} text-white border-transparent shadow-md`
                        : 'border-white/10 text-slate-500 dark:text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {entry.heading}
                  </button>
                ))}
              </div>

              {/* Entry body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEntry}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="relative pl-6"
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b ${chapter.color}`}
                  />
                  <h4 className="text-sm font-bold dark:text-white text-slate-800 mb-3 uppercase tracking-wider">
                    {chapter.entries[activeEntry].heading}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-[1.9] font-Ovo text-[0.97rem]">
                    {chapter.entries[activeEntry].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main Section ─────────────────────────────────────────── */
export default function Chronicles() {
  return (
    <div id="chronicles" className="w-full py-28 scroll-mt-20 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div
        className="absolute top-1/4 right-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, hsla(221,83%,53%,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, hsla(262,83%,53%,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-6">
            <Heart size={12} className="text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-500">
              Personal Chronicles
            </span>
          </div>

          <h2 className="font-black uppercase tracking-tighter gradient-text leading-none mb-5"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}>
            My World in Words
          </h2>

          <p className="max-w-xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo leading-relaxed text-lg">
            Thoughts on the world, past generations, what I've learned, what I study,
            where I'm going — and everything in between. This is my unfiltered mind.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </motion.div>

        {/* Chapter list */}
        <div className="flex flex-col gap-4">
          {CHAPTERS.map((chapter, i) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <blockquote className="relative inline-block">
            <span
              className="absolute -top-6 -left-4 text-7xl font-black leading-none select-none"
              style={{ color: 'hsla(221,83%,53%,0.12)' }}
            >
              "
            </span>
            <p className="font-Ovo text-xl text-slate-500 dark:text-slate-400 italic leading-relaxed max-w-lg mx-auto">
              I'm not writing history yet. But I'm writing the story that leads there.
            </p>
            <footer className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-500">
              — Rajendra Chaudhary
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </div>
  )
}
