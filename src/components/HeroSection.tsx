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
      style={{ background: '#1a1410' }}
    >
      {/* Background image — positioned in lower portion, not full-bleed */}
      <div className="absolute inset-x-0 bottom-0 h-[65%]">
        <motion.img
          src="/images/hero-books-shelf.png"
          alt=""
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 0.7 } : { scale: 1.05, opacity: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            transform: `translateY(${scrollProgress * 40}px)`,
            transition: 'transform 0.1s linear',
          }}
        />
        {/* Gradient fade from image to solid color above */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #1a1410 0%, rgba(26,20,16,0.4) 40%, rgba(26,20,16,0.2) 70%, rgba(26,20,16,0.6) 100%)',
          }}
        />
      </div>

      {/* Top solid area — same color family extends up */}
      <div
        className="absolute inset-x-0 top-0 h-[45%] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #1a1410 0%, #1a1410 60%, transparent 100%)',
        }}
      />

      {/* Subtle warm vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 55%, transparent 30%, rgba(26,20,16,0.7) 100%)',
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
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)' }}
        />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-center leading-[1.3] tracking-[0.06em]"
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
            color: 'rgba(246,243,237,0.95)',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
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
          style={{ color: 'rgba(246,243,237,0.35)' }}
        >
          LINGNAN ANCIENT CLASSICS AI PLATFORM
        </motion.p>

        {/* Decorative bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isLoaded ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-[1px] mt-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)' }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-serif text-sm md:text-base mt-10 text-center tracking-wider"
          style={{ color: 'rgba(201,169,110,0.6)' }}
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
          style={{ color: 'rgba(246,243,237,0.25)' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} style={{ color: 'rgba(246,243,237,0.25)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition — blends into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #152228 100%)' }}
      />
    </section>
  )
}
