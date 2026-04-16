import { motion } from 'framer-motion'
import profileImg from '../assets/images/profile-img.jpg'
import vscodeIcon from '../assets/images/vscode.png'

const tools = [
  { img: vscodeIcon, name: 'VS Code' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', name: 'MongoDB' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'SQL' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', name: 'Antigravity' },
]

export default function About() {
  return (
    <div id="about" className="w-full py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-center mb-2 text-lg font-Ovo text-gray-500">Introduction</h4>
        <h2 className="text-center font-Ovo gradient-text mb-16">About Me</h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
          {/* Profile Image Column */}
          <div className="w-64 sm:w-80 lg:w-96 shrink-0">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative rounded-3xl overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500 border-4 border-white dark:border-white/10"
             >
               <img
                 src={profileImg}
                 alt="Rajendra Chaudhary"
                 className="w-full h-auto"
               />
             </motion.div>
          </div>

          {/* Text Content Column */}
          <div className="flex-1">
            <p className="mb-10 font-Ovo text-gray-700 dark:text-gray-300 leading-relaxed text-lg text-center lg:text-left">
              I am a passionate <span className="text-blue-600 dark:text-blue-400 font-semibold">Full Stack Developer</span> from Nepal 
              with 2+ years of experience building modern, scalable, and user-friendly web applications.
            </p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Languages', text: 'JS, Node, Java, C++', icon: 'code' },
                { label: 'Education', text: 'B.E. Computer Science', icon: 'school' },
                { label: 'Projects', text: '4+ Major Full-Stack Apps', icon: 'rocket_launch' },
              ].map((item) => (
                <div 
                  key={item.label}
                  className="p-6 glass rounded-2xl border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all"
                >
                  <div className="text-2xl mb-4 text-blue-500">
                    <span className="material-icons-outlined">{item.icon}</span>
                  </div>
                  <h3 className="font-bold mb-1 dark:text-white uppercase tracking-tighter text-sm">{item.label}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Tools Use Section */}
            <div>
              <h4 className="font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2 uppercase tracking-widest text-xs">
                Tools I Use daily
              </h4>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {tools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ y: -5 }}
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center glass rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow-sm"
                  >
                    <img src={tool.img} alt={tool.name} title={tool.name} className="w-full h-full object-contain" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
