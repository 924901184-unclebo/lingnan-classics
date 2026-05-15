import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = window.innerHeight
      setScrollProgress(Math.min(scrollY / height, 1))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#f5f0e8' }}
    >
      {/* Full-bleed background — 3D manuscripts corridor */}
      <div className="absolute inset-0">
        <motion.img
          src="/images/hero-manuscripts-bg.png"
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            transform: `translateY(${scrollProgress * 50}px) scale(${1 + scrollProgress * 0.05})`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>

      {/* Top vignette — subtle gradient for nav readability */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(245,240,232,0.6) 0%, transparent 100%)',
        }}
      />

      {/* Center radial glow — makes title pop */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 38%, rgba(245,240,232,0.55) 0%, transparent 70%)',
        }}
      />

      {/* Main Content — Centered Title Block */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Decorative top accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isLoaded ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-[1px] mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(36 38% 60%), transparent)' }}
        />

        {/* Main Title — Calligraphic style */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-center leading-[1.3] tracking-[0.06em]"
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
            color: '#2a1f14',
            textShadow: '0 2px 8px rgba(245,240,232,0.8)',
          }}
        >
          岭南古籍文献语料数据
          <br />
          人工智能平台
        </motion.h1>

        {/* English subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-sans text-[11px] md:text-xs tracking-[0.35em] uppercase mt-5 text-center"
          style={{ color: 'rgba(42, 31, 20, 0.45)' }}
        >
          LINGNAN ANCIENT CLASSICS AI PLATFORM
        </motion.p>

        {/* Decorative bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isLoaded ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-[1px] mt-8"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(36 38% 60%), transparent)' }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-serif text-sm md:text-base mt-10 text-center tracking-wider"
          style={{ color: 'rgba(42, 31, 20, 0.55)' }}
        >
          传承岭南千年文脉 · 智联古籍知识图谱
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress * 3 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span
          className="text-[10px] font-sans tracking-[0.25em]"
          style={{ color: 'rgba(42, 31, 20, 0.35)' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} style={{ color: 'rgba(42, 31, 20, 0.35)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #f6f3ed 100%)' }}
      />
    </section>
  )
}
