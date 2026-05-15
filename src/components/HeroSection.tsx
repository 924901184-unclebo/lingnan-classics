import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// Decorative ink particles
function InkParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    opacity: 0.1 + Math.random() * 0.15,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `hsl(var(--lingnan-ink) / ${p.opacity})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Decorative flying birds (SVG)
function FlyingBirds() {
  const birds = [
    { x: '15%', y: '20%', scale: 0.6, delay: 0 },
    { x: '75%', y: '15%', scale: 0.45, delay: 1.5 },
    { x: '85%', y: '28%', scale: 0.35, delay: 3 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {birds.map((bird, i) => (
        <motion.svg
          key={i}
          className="absolute"
          style={{ left: bird.x, top: bird.y, transform: `scale(${bird.scale})` }}
          width="60"
          height="20"
          viewBox="0 0 60 20"
          fill="none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: [0, 0.5, 0.5, 0], x: [-20, 0, 30, 60] }}
          transition={{
            duration: 12,
            delay: bird.delay + 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M2 18C8 12 14 8 20 10C26 8 28 6 30 2C32 6 34 8 40 10C46 8 52 12 58 18"
            stroke="hsl(var(--lingnan-ink) / 0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </motion.svg>
      ))}
    </div>
  )
}

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

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }


  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background image - first version hero */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-lingnan.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            transform: `translateY(${scrollProgress * 50}px) scale(${1.05 + scrollProgress * 0.03})`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>

      {/* Light paper overlay for readability - keeps 数字藏经洞 aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(38 30% 96% / 0.82) 0%, hsl(38 28% 93% / 0.75) 40%, hsl(38 25% 90% / 0.7) 70%, hsl(38 25% 88% / 0.85) 100%)',
        }}
      />

      {/* Subtle radial light effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 50%, hsl(38 30% 96% / 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 20%, hsl(36 38% 60% / 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(193 37% 28% / 0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Ink particles */}
      <InkParticles />

      {/* Flying birds */}
      <FlyingBirds />

      {/* Center Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="text-center px-6">
          {/* Decorative top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-16 h-px mx-auto mb-8"
            style={{ background: 'hsl(var(--lingnan-gold) / 0.6)' }}
          />

          {/* Main Title - Large Calligraphic Chinese */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="font-serif leading-[1.2] tracking-[0.06em] mb-4"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              color: 'hsl(var(--lingnan-ink))',
              textShadow: '0 2px 4px rgba(0,0,0,0.03)',
            }}
          >
            岭南古籍文献语料数据人工智能平台
          </motion.h1>

          {/* English Subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase mb-6"
            style={{ color: 'hsl(var(--lingnan-ink) / 0.4)' }}
          >
            Lingnan Ancient Classics AI Platform
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-sans text-xs md:text-sm max-w-[420px] mx-auto leading-relaxed mt-6"
            style={{ color: 'hsl(var(--lingnan-ink) / 0.4)' }}
          >
            以知识图谱重构岭南千年文脉，借AI智能体探寻古籍深处的智慧
          </motion.p>

          {/* Decorative bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-16 h-px mx-auto mt-8"
            style={{ background: 'hsl(var(--lingnan-gold) / 0.6)' }}
          />

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-12"
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-sm font-sans text-xs tracking-[0.15em] transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'hsl(var(--lingnan-teal))',
                color: 'hsl(var(--lingnan-paper))',
                boxShadow: '0 8px 32px hsl(193 37% 28% / 0.2)',
              }}
            >
              探索典藏
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 w-12 h-12 pointer-events-none hidden md:block"
      >
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
        <div className="absolute top-0 left-0 h-full w-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 right-8 w-12 h-12 pointer-events-none hidden md:block"
      >
        <div className="absolute top-0 right-0 w-full h-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
        <div className="absolute top-0 right-0 h-full w-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-8 w-12 h-12 pointer-events-none hidden md:block"
      >
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
        <div className="absolute bottom-0 left-0 h-full w-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none hidden md:block"
      >
        <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
        <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.3)' }} />
      </motion.div>

      {/* Seal stamp decoration */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={isLoaded ? { opacity: 0.6, rotate: -5 } : { opacity: 0, rotate: -10 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-24 left-12 hidden lg:block pointer-events-none"
      >
        <div
          className="px-3 py-2 border-2 font-serif text-sm tracking-wider"
          style={{
            borderColor: 'hsl(var(--lingnan-vermilion) / 0.5)',
            color: 'hsl(var(--lingnan-vermilion) / 0.5)',
          }}
        >
          岭南
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress * 3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span
          className="text-[10px] font-sans tracking-[0.25em]"
          style={{ color: 'hsl(var(--lingnan-ink) / 0.3)' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} style={{ color: 'hsl(var(--lingnan-ink) / 0.3)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition to dark sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #0a1418 100%)',
        }}
      />
    </section>
  )
}
