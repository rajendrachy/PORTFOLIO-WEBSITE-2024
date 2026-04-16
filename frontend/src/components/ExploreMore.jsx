const exploreItems = [
  {
    href: '/services.html',
    label: 'Services',
    bg: 'from-blue-50 to-blue-100',
    text: 'text-blue-800',
    path: 'M12 2L2 12h3v8h6v-6h2v6h6v-8h3z',
  },
  {
    href: '/why-hire-me.html',
    label: 'Why Hire Me',
    bg: 'from-purple-50 to-blue-100',
    text: 'text-purple-800',
    path: 'M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  },
  {
    href: '/tech-stack.html',
    label: 'Tech Stack',
    bg: 'from-gray-50 to-gray-100',
    text: 'text-gray-800',
    path: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
  },
  {
    href: '/blog.html',
    label: 'Blog',
    bg: 'from-green-50 to-green-100',
    text: 'text-green-800',
    path: 'M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z',
  },
  {
    href: '#',
    label: 'Case Studies',
    bg: 'from-indigo-50 to-indigo-100',
    text: 'text-indigo-800',
    path: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z',
  },
  {
    href: '#',
    label: 'Experience',
    bg: 'from-teal-50 to-teal-100',
    text: 'text-teal-800',
    path: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
  },
  {
    href: '#',
    label: 'Testimonials',
    bg: 'from-pink-50 to-cyan-100',
    text: 'text-pink-800',
    path: 'M21 6h-18v12h18V6zm-2 10H5V8h14v8z',
  },
  {
    href: '#',
    label: 'AI Projects',
    bg: 'from-purple-50 to-blue-100',
    text: 'text-purple-800',
    path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z',
  },
]

export default function ExploreMore() {
  return (
    <section className="w-full px-[12%] py-20 text-center">
      <h2 className="text-4xl font-Ovo mb-14 text-gray-800 dark:text-white">Explore More</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {exploreItems.map(item => (
          <a
            key={item.label}
            href={item.href}
            className={`group flex flex-col items-center p-6 bg-gradient-to-br ${item.bg} ${item.text}
              rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}
          >
            <svg
              className="w-12 h-12 mb-3 transition-transform duration-300 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={item.path} />
            </svg>
            <span className="font-semibold text-base">{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
