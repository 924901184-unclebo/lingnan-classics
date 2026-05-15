import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown, Anchor, BookOpen, Map } from 'lucide-react'

const HERO_STORIES = [
  {
    title: '十三行贸易',
    subtitle: '海上丝路的辉煌',
    description: '清代广州十三行，一口通商百年，中西贸易枢纽。茶叶、丝绸、瓷器由此远销四海。',
    image: '/images/thirteen-hongs-trade.png',
    era: '1757—1842',
  },
  {
    title: '千年岭南',
    subtitle: '古籍数字化平台',
    description: '汇集岭南文化典籍精粹，以知识图谱重构历史脉络，借AI智能体复现千年文脉。',
    image: '/images/hero-lingnan.png',
    era: '宋—清',
  },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStory, setActiveStory] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const height = window.innerHeight
      setScrollProgress(Math.min(scrollY / height, 1))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-rotate stories
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory(prev => (prev + 1) % HERO_STORIES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const current = HERO_STORIES[activeStory]

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] overflow-hidden"
    >
      {/* Background Layers with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStory}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollProgress * 80}px) scale(${1.05 + scrollProgress * 0.05})`,
              transition: 'transform 0.1s linear',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer overlays for cinematic depth */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(10,15,20,0.85) 0%, rgba(10,15,20,0.3) 35%, rgba(10,15,20,0.2) 60%, rgba(10,15,20,0.7) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 40%, transparent 0%, rgba(10,15,20,0.4) 70%)',
      }} />

      {/* Floating particles / mist effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${15 + i * 18}%`,
              top: `${20 + i * 12}%`,
              background: `radial-gradient(circle, rgba(42,84,99,0.04) 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 20 + i * 5, 0],
              y: [0, -15 + i * 3, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left content */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Era tag */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="h-px w-12" style={{ background: 'rgba(201, 169, 110, 0.6)' }} />
                    <span className="text-xs font-sans tracking-[0.2em]" style={{ color: 'rgba(201, 169, 110, 0.8)' }}>
                      {current.era}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-wide mb-3"
                    style={{ color: 'rgba(246, 243, 237, 0.95)' }}
                  >
                    {current.title}
                  </h1>
                  <h2 className="font-serif text-xl md:text-3xl lg:text-4xl font-normal mb-8"
                    style={{ color: 'rgba(246, 243, 237, 0.6)' }}
                  >
                    {current.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="font-sans text-sm md:text-base leading-relaxed max-w-[500px] mb-10"
                    style={{ color: 'rgba(246, 243, 237, 0.5)' }}
                  >
                    {current.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-4">
                    <Button variant="museum" size="lg"
                      className="border hover:scale-[1.02]"
                      style={{
                        background: 'rgba(42, 84, 99, 0.8)',
                        borderColor: 'rgba(42, 84, 99, 0.6)',
                        color: 'rgba(246, 243, 237, 0.95)',
                      }}
                    >
                      <BookOpen size={16} className="mr-2" />
                      进入典籍馆
                    </Button>
                    <Button variant="ghost" size="lg"
                      style={{ color: 'rgba(246, 243, 237, 0.6)' }}
                      className="hover:bg-[rgba(255,255,255,0.05)]"
                    >
                      <Map size={16} className="mr-2" />
                      探索图谱
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right - Info panels */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-4 items-end">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="p-5 rounded-sm max-w-[280px] w-full"
                style={{
                  background: 'rgba(10, 20, 25, 0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Anchor size={14} style={{ color: 'rgba(201, 169, 110, 0.7)' }} />
                  <span className="text-[10px] font-sans tracking-wider" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>
                    历史数据
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: '3,200+', label: '馆藏典籍' },
                    { val: '800年', label: '时间跨度' },
                    { val: '2,400', label: '知识节点' },
                    { val: '12类', label: '文献分类' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="font-serif text-lg" style={{ color: 'rgba(246,243,237,0.9)' }}>{s.val}</div>
                      <div className="text-[10px] font-sans" style={{ color: 'rgba(246,243,237,0.35)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="p-4 rounded-sm max-w-[280px] w-full"
                style={{
                  background: 'rgba(10, 20, 25, 0.5)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="text-[10px] font-sans" style={{ color: 'rgba(246,243,237,0.35)' }}>
                  AI智能体状态
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: 'rgba(100, 200, 120, 0.8)' }} />
                  <span className="text-xs font-sans" style={{ color: 'rgba(246,243,237,0.6)' }}>
                    岭南古籍智能体 · 就绪
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Story Switcher */}
        <div className="absolute bottom-32 left-6 lg:left-12 flex items-center gap-3">
          {HERO_STORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStory(i)}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
              style={{
                width: i === activeStory ? 48 : 16,
                background: 'rgba(255,255,255,0.15)',
              }}
            >
              {i === activeStory && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 8, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'rgba(201, 169, 110, 0.8)' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress * 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-sans tracking-[0.2em]" style={{ color: 'rgba(246,243,237,0.4)' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ color: 'rgba(246,243,237,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
