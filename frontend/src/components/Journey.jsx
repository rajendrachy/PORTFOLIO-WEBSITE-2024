const timelineItems = [
  {
    side: 'left',
    color: 'text-blue-600',
    dot: 'bg-blue-600',
    title: 'Early Education (Nursery – UKG)',
    desc: 'Built foundational learning skills, creativity, and communication abilities during early childhood education.',
  },
  {
    side: 'right',
    color: 'text-cyan-600',
    dot: 'bg-cyan-500',
    title: 'Primary School (Class 1 – 5)',
    desc: 'Developed strong academic fundamentals in mathematics, language, and science along with discipline and curiosity.',
  },
  {
    side: 'left',
    color: 'text-orange-500',
    dot: 'bg-orange-500',
    title: 'Middle School (Class 6 – 8)',
    desc: 'Strengthened analytical thinking, logical reasoning, and problem-solving abilities through diverse subjects.',
  },
  {
    side: 'right',
    color: 'text-green-600',
    dot: 'bg-green-500',
    title: 'Secondary School (Class 9 – 10)',
    desc: 'Focused on academic excellence and built strong foundations in science and mathematics.',
  },
  {
    side: 'left',
    color: 'text-blue-500',
    dot: 'bg-blue-500',
    title: 'Higher Secondary (Class 11 – 12)',
    desc: 'Specialized in science stream and developed interest in technology, engineering, and programming.',
  },
  {
    side: 'right',
    color: 'text-indigo-600',
    dot: 'bg-indigo-600',
    title: 'Bachelor of Engineering (Ongoing)',
    desc: 'Currently pursuing Computer Science Engineering, focusing on full stack development, DevOps, and real-world project building to become a professional software engineer.',
    highlight: true,
  },
]

export default function Journey() {
  return (
    <div id="journey" className="w-full px-[12%] py-20 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo text-gray-600 dark:text-white/70">My Academic Journey</h4>
      <h2 className="text-center text-5xl font-Ovo mb-6 dark:text-white">From Nursery to Engineering</h2>
      <p className="text-center max-w-2xl mx-auto mb-16 font-Ovo text-gray-600 dark:text-white/70">
        A journey of growth, learning, and continuous evolution — from early education to becoming a future software engineer.
      </p>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 h-full rounded-full" />

        <div className="space-y-16">
          {timelineItems.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-4">
              {item.side === 'left' ? (
                <>
                  <div className={`md:w-5/12 p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:-translate-y-2 hover:scale-105
                    ${item.highlight
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-white/20'
                      : 'bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20'
                    } backdrop-blur-lg`}>
                    <h3 className={`text-xl font-semibold ${item.color}`}>{item.title}</h3>
                    <p className="text-gray-600 dark:text-white/80 mt-2 text-sm">{item.desc}</p>
                  </div>
                  <div className={`w-6 h-6 ${item.dot} rounded-full border-4 border-white dark:border-black z-10 shrink-0`} />
                  <div className="md:w-5/12" />
                </>
              ) : (
                <>
                  <div className="md:w-5/12" />
                  <div className={`w-6 h-6 ${item.dot} rounded-full border-4 border-white dark:border-black z-10 shrink-0`} />
                  <div className={`md:w-5/12 p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:-translate-y-2 hover:scale-105
                    ${item.highlight
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-white/20'
                      : 'bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20'
                    } backdrop-blur-lg`}>
                    <h3 className={`text-xl font-semibold ${item.color}`}>{item.title}</h3>
                    <p className="text-gray-600 dark:text-white/80 mt-2 text-sm">{item.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
