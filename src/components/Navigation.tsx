import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: '典籍', href: '#collection' },
  { label: '图谱', href: '#knowledge-graph' },
  { label: '智能体', href: '#ai-agent' },
  { label: '文物', href: '#artifacts' },
  { label: '展览', href: '#exhibition' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Color scheme: light text on dark bg when scrolled, dark text on light bg at top
  const textColor = scrolled ? 'rgba(246,243,237,0.85)' : 'hsl(0 0% 10% / 0.8)'
  const navLinkColor = scrolled ? 'rgba(246,243,237,0.55)' : 'hsl(0 0% 10% / 0.5)'
  const sealBorderColor = scrolled ? 'rgba(201,169,110,0.5)' : 'hsl(2 63% 38% / 0.5)'
  const sealTextColor = scrolled ? 'rgba(201,169,110,0.8)' : 'hsl(2 63% 38% / 0.7)'

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 20, 25, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
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
              岭南古籍数字化平台
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
            style={{ background: 'rgba(10, 20, 25, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl"
                    style={{ color: 'rgba(246,243,237,0.85)' }}
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
