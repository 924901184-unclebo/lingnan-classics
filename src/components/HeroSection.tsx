import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Brain, BookOpen, Network, FileSearch, Send } from 'lucide-react'

// AI capabilities data
const AI_CAPABILITIES = [
  {
    icon: BookOpen,
    title: '自动断句标点',
    desc: '识别古籍原文，智能添加标点断句与校勘',
  },
  {
    icon: FileSearch,
    title: '文白对译',
    desc: '逐句翻译，深度释义，引经据典',
  },
  {
    icon: Network,
    title: '图谱关联推理',
    desc: '自动关联人物、典籍、地域知识网络',
  },
  {
    icon: Brain,
    title: '溯源举证',
    desc: '回答附原文出处，可追溯验证',
  },
]

// Preset questions for AI chat
const PRESET_QUESTIONS = [
  '《广东通志》的编撰始末',
  '陈献章与白沙心学',
  '岭南宗族迁徙路线',
  '十三行贸易体系',
]

// Simulated typing animation component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'hsl(var(--lingnan-teal) / 0.6)' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// Decorative ink particles
function InkParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 4,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    opacity: 0.08 + Math.random() * 0.1,
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
            y: [0, -20, 0],
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

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

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

  // Simulate AI interaction after load
  useEffect(() => {
    if (!isLoaded) return
    const t1 = setTimeout(() => setShowTyping(true), 3000)
    const t2 = setTimeout(() => {
      setShowTyping(false)
      setShowResponse(true)
    }, 5500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [isLoaded])

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background image */}
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

      {/* Light paper overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(38 30% 96% / 0.88) 0%, hsl(38 28% 94% / 0.82) 40%, hsl(38 25% 92% / 0.78) 70%, hsl(38 25% 88% / 0.9) 100%)',
        }}
      />

      {/* Subtle radial light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 30%, hsl(38 30% 96% / 0.5) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 70%, hsl(193 37% 28% / 0.03) 0%, transparent 40%)
          `,
        }}
      />

      <InkParticles />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center pt-[12vh] lg:pt-[14vh] pb-20 min-h-screen">
        {/* Title Block */}
        <div className="text-center px-6 mb-10 lg:mb-14">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: 'hsl(var(--lingnan-teal) / 0.08)',
              border: '1px solid hsl(var(--lingnan-teal) / 0.15)',
            }}
          >
            <Brain size={14} style={{ color: 'hsl(var(--lingnan-teal))' }} />
            <span className="font-sans text-[11px] tracking-wider" style={{ color: 'hsl(var(--lingnan-teal))' }}>
              AI-POWERED PLATFORM
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="font-serif leading-[1.2] tracking-[0.04em] mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 4rem)',
              color: 'hsl(var(--lingnan-ink))',
            }}
          >
            岭南古籍文献语料数据人工智能平台
          </motion.h1>

          {/* English subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="font-sans text-[11px] md:text-xs tracking-[0.3em] uppercase"
            style={{ color: 'hsl(var(--lingnan-ink) / 0.35)' }}
          >
            Lingnan Ancient Classics AI Platform
          </motion.p>
        </div>

        {/* AI Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-[1200px] 2xl:max-w-[1400px] mx-auto px-6 lg:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: AI Capabilities */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 max-w-[40px]" style={{ background: 'hsl(var(--lingnan-gold) / 0.5)' }} />
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--lingnan-teal) / 0.7)' }}>
                    AI Agent
                  </span>
                </div>

                <h2 className="font-serif text-xl md:text-2xl mb-2" style={{ color: 'hsl(var(--lingnan-ink) / 0.85)' }}>
                  古籍智能体
                </h2>
                <p className="font-sans text-xs leading-relaxed mb-6" style={{ color: 'hsl(var(--lingnan-ink) / 0.4)' }}>
                  基于岭南古籍语料微调的专属AI，支持文言文断句、白话翻译、历史考据与知识图谱关联推理。
                </p>

                <div className="space-y-3">
                  {AI_CAPABILITIES.map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                      className="flex items-start gap-3 p-3 rounded-sm transition-all duration-300 hover:bg-[hsl(var(--lingnan-teal)/0.04)]"
                      style={{ border: '1px solid hsl(var(--lingnan-ink) / 0.06)' }}
                    >
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center mt-0.5"
                        style={{ background: 'hsl(var(--lingnan-teal) / 0.08)' }}
                      >
                        <cap.icon size={15} style={{ color: 'hsl(var(--lingnan-teal))' }} />
                      </div>
                      <div>
                        <div className="font-serif text-sm mb-0.5" style={{ color: 'hsl(var(--lingnan-ink) / 0.8)' }}>
                          {cap.title}
                        </div>
                        <div className="font-sans text-[11px] leading-relaxed" style={{ color: 'hsl(var(--lingnan-ink) / 0.4)' }}>
                          {cap.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: AI Chat Preview */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="rounded-sm overflow-hidden"
                style={{
                  background: 'hsl(200 30% 10% / 0.95)',
                  border: '1px solid hsl(200 20% 20% / 0.4)',
                  boxShadow: '0 20px 60px hsl(200 30% 5% / 0.3)',
                }}
              >
                {/* Chat Header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: '1px solid hsl(200 20% 20% / 0.3)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(150 60% 50%)' }} />
                    <span className="font-serif text-sm" style={{ color: 'rgba(246,243,237,0.8)' }}>
                      岭南古籍智能体
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[10px]" style={{ color: 'rgba(246,243,237,0.3)' }}>
                      ✦ 知识图谱 · 已就绪
                    </span>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="px-5 py-5 min-h-[200px] lg:min-h-[240px]">
                  {/* AI Welcome Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 1.8 }}
                    className="max-w-[85%] px-4 py-3 rounded-sm mb-4"
                    style={{
                      background: 'hsl(200 20% 15% / 0.8)',
                      border: '1px solid hsl(200 20% 25% / 0.3)',
                    }}
                  >
                    <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(246,243,237,0.7)' }}>
                      我是岭南古籍AI智能体，精通岭南文化典籍、历史考据与知识图谱关联推理。请问需要什么帮助？
                    </p>
                  </motion.div>

                  {/* User simulated question */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 2.8 }}
                    className="flex justify-end mb-4"
                  >
                    <div
                      className="max-w-[70%] px-4 py-3 rounded-sm"
                      style={{
                        background: 'hsl(var(--lingnan-teal) / 0.3)',
                        border: '1px solid hsl(var(--lingnan-teal) / 0.4)',
                      }}
                    >
                      <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(246,243,237,0.85)' }}>
                        陈献章与白沙心学的核心思想是什么？
                      </p>
                    </div>
                  </motion.div>

                  {/* Typing indicator */}
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="max-w-[85%]"
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}

                  {/* AI Response */}
                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[85%] px-4 py-3 rounded-sm"
                      style={{
                        background: 'hsl(200 20% 15% / 0.8)',
                        border: '1px solid hsl(200 20% 25% / 0.3)',
                      }}
                    >
                      <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(246,243,237,0.7)' }}>
                        陈献章（1428-1500），号白沙，新会人。白沙心学主张"学贵自得""静坐中养出端倪"，强调心性自悟，不拘泥于文字训诂...
                      </p>
                      <p className="font-sans text-[10px] mt-2" style={{ color: 'rgba(246,243,237,0.3)' }}>
                        📎 引自《白沙子全集》卷二
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Preset Questions */}
                <div className="px-5 py-3" style={{ borderTop: '1px solid hsl(200 20% 20% / 0.3)' }}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {PRESET_QUESTIONS.map((q) => (
                      <span
                        key={q}
                        className="font-sans text-[10px] px-3 py-1.5 rounded-sm cursor-pointer transition-all duration-200 hover:bg-[hsl(200_20%_25%/0.5)]"
                        style={{
                          border: '1px solid hsl(200 20% 25% / 0.4)',
                          color: 'rgba(246,243,237,0.5)',
                        }}
                      >
                        {q}
                      </span>
                    ))}
                  </div>

                  {/* Input */}
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 rounded-sm"
                    style={{
                      background: 'hsl(200 20% 12% / 0.8)',
                      border: '1px solid hsl(200 20% 22% / 0.4)',
                    }}
                  >
                    <span className="font-sans text-xs flex-1" style={{ color: 'rgba(246,243,237,0.25)' }}>
                      向智能体提问...
                    </span>
                    <Send size={14} style={{ color: 'rgba(246,243,237,0.3)' }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 w-10 h-10 pointer-events-none hidden md:block"
      >
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.25)' }} />
        <div className="absolute top-0 left-0 h-full w-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.25)' }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 right-8 w-10 h-10 pointer-events-none hidden md:block"
      >
        <div className="absolute top-0 right-0 w-full h-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.25)' }} />
        <div className="absolute top-0 right-0 h-full w-px" style={{ background: 'hsl(var(--lingnan-gold) / 0.25)' }} />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress * 3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-sans tracking-[0.25em]" style={{ color: 'hsl(var(--lingnan-ink) / 0.25)' }}>
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} style={{ color: 'hsl(var(--lingnan-ink) / 0.25)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #0a1418 100%)' }}
      />
    </section>
  )
}
