import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Calendar, Clock, ArrowRight, Rss } from 'lucide-react'

const blogPosts = [
  {
    title: 'How I Built My Chat App (MERN)',
    desc: 'Step-by-step guide on building a real-time chat application using MERN stack with Socket.io.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    date: 'March 15, 2024',
    readTime: '8 min read',
    tags: ['MERN', 'Socket.io']
  },
  {
    title: 'Docker Basics for Beginners',
    desc: 'Learn Docker from scratch — containers, images, and real-world usage in deployment pipelines.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051',
    date: 'February 28, 2024',
    readTime: '12 min read',
    tags: ['DevOps', 'Docker']
  },
  {
    title: 'CI/CD Pipeline Explained',
    desc: 'Understand how CI/CD works and how to automate deployments like a pro using GitHub Actions.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    date: 'February 10, 2024',
    readTime: '10 min read',
    tags: ['CI/CD', 'Automation']
  },
  {
    title: 'Frontend vs Backend',
    desc: 'Deep dive into the differences between frontend and backend development with real-world examples.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    date: 'January 22, 2024',
    readTime: '6 min read',
    tags: ['Web Dev', 'Careers']
  },
  {
    title: 'Git & GitHub Guide',
    desc: 'Complete beginner-friendly guide to Git and GitHub workflows for collaborative development.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    date: 'January 05, 2024',
    readTime: '15 min read',
    tags: ['Git', 'VCS']
  },
  {
    title: 'My Developer Journey',
    desc: 'From absolute beginner to full stack developer — my personal lessons, struggles, and growth milestones.',
    image: 'https://images.unsplash.com/photo-1537432376769-00a74b8c2f63',
    date: 'December 20, 2023',
    readTime: '20 min read',
    tags: ['Personal', 'Story']
  }
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-blue-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
           >
             <Rss size={14} /> Knowledge Hub
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter mb-8 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-400 bg-clip-text text-transparent"
           >
             My Blogs & Articles
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-Ovo text-lg tracking-wide"
           >
             Sharing my insights, experiences, and deep dives into the world of Web Development, DevOps, and modern Software Engineering.
           </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group glass rounded-[2.5rem] overflow-hidden flex flex-col border border-slate-100 dark:border-white/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-Ovo leading-relaxed line-clamp-3">
                  {post.desc}
                </p>

                <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                       <Calendar size={12} /> {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                       <Clock size={12} /> {post.readTime}
                    </div>
                  </div>
                  
                  <button className="w-12 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
