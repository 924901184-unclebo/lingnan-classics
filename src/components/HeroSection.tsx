import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Brain, Send } from 'lucide-react'

// Preset questions for AI chat
const PRESET_QUESTIONS = [
  '《广东通志》的编撰始末',
  '陈献章与白沙心学',
  '岭南宗族迁徙路线',
  '十三行贸易体系',
]

// Simulated typing animation
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'rgba(246,243,237,0.5)' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
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

  // Simulate AI interaction
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
      {/* Background image - full visibility */}
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

      {/* Very subtle overlay for text readability only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center pt-[12vh] lg:pt-[14vh] pb-20 min-h-screen">
        {/* Title Block */}
        <div className="text-center px-6 mb-8 lg:mb-12">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Brain size={14} style={{ color: 'rgba(246,243,237,0.9)' }} />
            <span className="font-sans text-[11px] tracking-wider" style={{ color: 'rgba(246,243,237,0.9)' }}>
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
              color: '#1a2a3a',
              textShadow: '0 1px 3px rgba(255,255,255,0.5)',
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
            style={{ color: 'rgba(246,243,237,0.5)' }}
          >
            Lingnan Ancient Classics AI Platform
          </motion.p>
        </div>

        {/* AI Chat Preview - Centered, semi-transparent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-[700px] 2xl:max-w-[800px] mx-auto px-6"
        >
          <div
            className="rounded-lg overflow-hidden backdrop-blur-lg"
            style={{
              background: 'rgba(10, 20, 30, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Chat Header */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(150 60% 50%)' }} />
                <span className="font-serif text-sm" style={{ color: 'rgba(246,243,237,0.85)' }}>
                  岭南古籍智能体
                </span>
              </div>
              <span className="font-sans text-[10px]" style={{ color: 'rgba(246,243,237,0.35)' }}>
                ✦ 知识图谱 · 已就绪
              </span>
            </div>

            {/* Chat Body */}
            <div className="px-5 py-5 min-h-[180px] lg:min-h-[220px]">
              {/* AI Welcome */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 1.5 }}
                className="max-w-[85%] px-4 py-3 rounded-lg mb-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(246,243,237,0.75)' }}>
                  我是岭南古籍AI智能体，精通岭南文化典籍、历史考据与知识图谱关联推理。请问需要什么帮助？
                </p>
              </motion.div>

              {/* User question */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 2.5 }}
                className="flex justify-end mb-4"
              >
                <div
                  className="max-w-[70%] px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(42, 84, 99, 0.4)',
                    border: '1px solid rgba(42, 84, 99, 0.5)',
                  }}
                >
                  <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(246,243,237,0.9)' }}>
                    陈献章与白沙心学的核心思想是什么？
                  </p>
                </div>
              </motion.div>

              {/* Typing */}
              {showTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[85%]">
                  <TypingIndicator />
                </motion.div>
              )}

              {/* AI Response */}
              {showResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-[85%] px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(246,243,237,0.75)' }}>
                    陈献章（1428-1500），号白沙，新会人。白沙心学主张"学贵自得""静坐中养出端倪"，强调心性自悟，不拘泥于文字训诂...
                  </p>
                  <p className="font-sans text-[10px] mt-2" style={{ color: 'rgba(246,243,237,0.3)' }}>
                    📎 引自《白沙子全集》卷二
                  </p>
                </motion.div>
              )}
            </div>

            {/* Preset Questions */}
            <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_QUESTIONS.map((q) => (
                  <span
                    key={q}
                    className="font-sans text-[10px] px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)]"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'rgba(246,243,237,0.55)',
                    }}
                  >
                    {q}
                  </span>
                ))}
              </div>

              {/* Input */}
              <div
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="font-sans text-xs flex-1" style={{ color: 'rgba(246,243,237,0.3)' }}>
                  向智能体提问...
                </span>
                <Send size={14} style={{ color: 'rgba(246,243,237,0.35)' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress * 3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-sans tracking-[0.25em]" style={{ color: 'rgba(246,243,237,0.4)' }}>
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} style={{ color: 'rgba(246,243,237,0.4)' }} />
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
