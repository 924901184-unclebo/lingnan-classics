import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: '图谱', href: '#knowledge-graph' },
  { label: '藏书', href: '#collection' },
  { label: '检索', href: '#search' },
  { label: '智能体', href: '#ai-agent' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dark hero → light text; scrolled → dark text on cloud-white bg
  const textColor = scrolled ? '#2C2925' : '#F5F3EF'
  const navLinkColor = scrolled ? '#44403C' : 'rgba(181,176,168,0.6)'
  const sealBorderColor = scrolled ? '#B5B0A8' : 'rgba(181,176,168,0.5)'
  const sealTextColor = scrolled ? '#44403C' : '#D4CFC7'

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(245, 243, 239, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #D4CFC7' : 'none',
        }}
      >
        <nav className="max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-6 lg:px-12 2xl:px-16 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div
              className="inline-flex items-center justify-center px-1.5 py-1 border-2 font-serif text-[10px] font-bold tracking-wider transition-all duration-500"
              style={{
                borderColor: sealBorderColor,
                color: sealTextColor,
                transform: 'rotate(-3deg)',
              }}
            >
              岭南
            </div>
            <span
              className="font-serif text-base tracking-wider transition-colors duration-500"
              style={{ color: textColor }}
            >
              岭南古籍文献语料数据人工智能平台
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-sans text-xs tracking-wide transition-all duration-500 hover:opacity-100"
                  style={{ color: navLinkColor }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 transition-colors duration-500"
            style={{ color: textColor }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-24 px-8"
            style={{ background: 'rgba(245, 243, 239, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl"
                    style={{ color: '#2C2925' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
