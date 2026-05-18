import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Send, Sparkles } from 'lucide-react'

// Simulated Q&A conversation
const DEMO_CONVERSATION = [
  { role: 'user' as const, text: '陈献章与白沙心学的核心思想是什么？' },
  { role: 'assistant' as const, text: '陈献章（1428-1500），号白沙，新会人。白沙心学主张"学贵自得""静坐中养出端倪"，强调心性自悟，不拘泥于文字训诂。其学上承陆九渊，下启王阳明，为岭南学术之巅峰。' },
]

const PRESET_QUESTIONS = [
  '《广东通志》的编撰始末',
  '岭南宗族迁徙路线',
  '十三行贸易体系',
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#B5B0A8' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chatStep, setChatStep] = useState(0)

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

  // Auto-play Q&A demo
  useEffect(() => {
    if (!isLoaded) return
    const t1 = setTimeout(() => setChatStep(1), 2500)
    const t2 = setTimeout(() => setChatStep(2), 4000)
    const t3 = setTimeout(() => setChatStep(3), 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [isLoaded])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#2C2925' }}
    >
      {/* Background image — positioned in lower portion */}
      <div className="absolute inset-x-0 bottom-0 h-[65%]">
        <motion.img
          src="/images/hero-inkwash-mountain.png"
          alt=""
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 0.6 } : { scale: 1.05, opacity: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            transform: `translateY(${scrollProgress * 40}px)`,
            transition: 'transform 0.1s linear',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #2C2925 0%, rgba(44,41,37,0.35) 40%, rgba(44,41,37,0.15) 70%, rgba(44,41,37,0.5) 100%)',
          }}
        />
      </div>

      {/* Top solid area */}
      <div
        className="absolute inset-x-0 top-0 h-[45%] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #2C2925 0%, #2C2925 60%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 55%, transparent 30%, rgba(44,41,37,0.7) 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center pt-[14vh] lg:pt-[16vh] pb-20 min-h-screen px-6">
        {/* Decorative top accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isLoaded ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-16 h-[1px] mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #B5B0A8, transparent)' }}
        />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-center leading-[1.3] tracking-[0.06em]"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
            color: '#F5F3EF',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sans text-[11px] md:text-xs tracking-[0.35em] uppercase mt-4 text-center"
          style={{ color: 'rgba(181,176,168,0.5)' }}
        >
          LINGNAN ANCIENT CLASSICS AI PLATFORM
        </motion.p>

        {/* AI Agent Chat Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 w-full max-w-[560px] rounded-lg overflow-hidden backdrop-blur-md"
          style={{
            background: 'rgba(44, 41, 37, 0.5)',
            border: '1px solid rgba(181,176,168,0.15)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(245,243,239,0.04)',
          }}
        >
          {/* Panel Header */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: '1px solid rgba(181,176,168,0.1)' }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={12} style={{ color: '#B5A48C' }} />
              <span className="font-serif text-xs" style={{ color: 'rgba(245,243,239,0.7)' }}>
                古籍智能体
              </span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'rgba(100,200,120,0.7)' }} />
            </div>
            <span className="text-[9px] font-sans" style={{ color: 'rgba(181,176,168,0.4)' }}>
              知识图谱 · 已就绪
            </span>
          </div>

          {/* Chat Body */}
          <div className="px-5 py-4 min-h-[120px]">
            {chatStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mb-3"
              >
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-lg text-[12px] font-sans leading-relaxed"
                  style={{
                    background: 'rgba(139,115,85,0.25)',
                    border: '1px solid rgba(139,115,85,0.35)',
                    color: 'rgba(245,243,239,0.9)',
                  }}
                >
                  {DEMO_CONVERSATION[0].text}
                </div>
              </motion.div>
            )}

            {chatStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3"
              >
                <div
                  className="inline-flex px-3.5 py-2.5 rounded-lg"
                  style={{ background: 'rgba(245,243,239,0.05)', border: '1px solid rgba(245,243,239,0.08)' }}
                >
                  <TypingDots />
                </div>
              </motion.div>
            )}

            {chatStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="max-w-[90%] px-3.5 py-2.5 rounded-lg text-[12px] font-sans leading-relaxed"
                  style={{
                    background: 'rgba(245,243,239,0.05)',
                    border: '1px solid rgba(245,243,239,0.08)',
                    color: 'rgba(245,243,239,0.7)',
                  }}
                >
                  {DEMO_CONVERSATION[1].text}
                  <span className="block mt-1.5 text-[10px]" style={{ color: 'rgba(181,164,140,0.6)' }}>
                    📎 引自《白沙子全集》卷二
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Preset Questions & Input */}
          <div className="px-5 pb-4">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {PRESET_QUESTIONS.map(q => (
                <span
                  key={q}
                  className="text-[10px] font-sans px-2.5 py-1 rounded-full cursor-pointer transition-colors hover:bg-[rgba(181,176,168,0.1)]"
                  style={{
                    border: '1px solid rgba(181,176,168,0.15)',
                    color: 'rgba(245,243,239,0.4)',
                  }}
                >
                  {q}
                </span>
              ))}
            </div>

            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg"
              style={{
                background: 'rgba(245,243,239,0.04)',
                border: '1px solid rgba(245,243,239,0.08)',
              }}
            >
              <span className="text-[12px] font-sans flex-1" style={{ color: 'rgba(245,243,239,0.25)' }}>
                向古籍智能体提问...
              </span>
              <Send size={13} style={{ color: 'rgba(181,164,140,0.5)' }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress * 3 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-sans tracking-[0.25em]" style={{ color: 'rgba(181,176,168,0.3)' }}>
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} style={{ color: 'rgba(181,176,168,0.3)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #2C2925 100%)' }}
      />
    </section>
  )
}
