import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { BookOpen, Eye, FileText, Layers, Search, ArrowRight } from 'lucide-react'

const manuscripts = [
  {
    id: 1,
    title: '广东通志',
    dynasty: '清·雍正',
    author: '郝玉麟等修',
    volumes: '六十四卷',
    category: '方志',
    image: '/images/ancient-manuscript.png',
    description: '岭南地区最重要的地方志之一，详载广东一省之舆地、建置、赋役、人物等。',
    highlights: ['舆地志', '海防志', '人物志', '艺文志'],
  },
  {
    id: 2,
    title: '岭南遗书',
    dynasty: '清·道光',
    author: '伍崇曜辑',
    volumes: '五十九种',
    category: '丛书',
    description: '汇集岭南先贤遗著，涵盖经史子集，为研究岭南文化之重要文献汇刊。',
    highlights: ['经部', '史部', '子部', '集部'],
  },
  {
    id: 3,
    title: '南海百咏',
    dynasty: '南宋',
    author: '方信孺',
    volumes: '一卷',
    category: '诗集',
    description: '以诗歌形式记录南海名胜古迹，兼具文学与史料价值。',
    highlights: ['南海庙', '蒲涧', '光孝寺', '越秀山'],
  },
  {
    id: 4,
    title: '粤大记',
    dynasty: '明·万历',
    author: '郭棐',
    volumes: '三十二卷',
    category: '方志',
    description: '明代广东地方文献，记载广东各府州县之山川、城池、官师、人物。',
    highlights: ['山川', '城池', '官师', '人物'],
  },
]

export function CollectionSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section
      id="collection"
      ref={ref}
      className="relative py-28 lg:py-36 px-6 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #0f1a1e 0%, #162830 50%, #0f1a1e 100%)' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>
                COLLECTION
              </span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl" style={{ color: 'rgba(246,243,237,0.95)' }}>
              馆藏典籍
            </h2>
            <p className="mt-3 font-sans leading-relaxed text-sm max-w-[420px]" style={{ color: 'rgba(246,243,237,0.4)' }}>
              收录岭南地区历代珍贵典籍，支持高清瓦片阅览、无损放大、OCR识别与智能断句标注
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { icon: <BookOpen size={13} />, val: '3,200+', label: '典籍' },
              { icon: <Layers size={13} />, val: '86,000', label: '页面' },
              { icon: <Search size={13} />, val: '12', label: '类目' },
              { icon: <Eye size={13} />, val: '800年', label: '跨度' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{
                  background: 'rgba(42, 84, 99, 0.12)',
                  border: '1px solid rgba(42, 84, 99, 0.15)',
                  color: 'rgba(42, 84, 99, 0.7)',
                }}>{stat.icon}</div>
                <div>
                  <div className="font-serif text-sm" style={{ color: 'rgba(246,243,237,0.85)' }}>{stat.val}</div>
                  <div className="text-[9px] font-sans" style={{ color: 'rgba(246,243,237,0.3)' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Grid: 2-column balanced layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Featured + one card */}
          <div className="flex flex-col gap-6">
            {/* Featured Manuscript with full image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="group relative overflow-hidden rounded-sm"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src="/images/ancient-manuscript.png"
                  alt="广东通志"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, rgba(10,20,25,0.15) 0%, rgba(10,20,25,0.75) 70%, rgba(10,20,25,0.92) 100%)',
                }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="seal-stamp !text-[8px] !p-1 !border-[1px] !rotate-0 !transform-none" style={{ borderColor: 'rgba(201,169,110,0.5)', color: 'rgba(201,169,110,0.8)' }}>
                      清
                    </div>
                    <span className="text-[10px] font-sans" style={{ color: 'rgba(246,243,237,0.45)' }}>
                      雍正七年 · 郝玉麟等修 · 六十四卷
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-2" style={{ color: 'rgba(246,243,237,0.95)' }}>广东通志</h3>
                  <p className="text-[13px] font-sans leading-relaxed max-w-[380px]" style={{ color: 'rgba(246,243,237,0.55)' }}>
                    {manuscripts[0].description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    {manuscripts[0].highlights.map(h => (
                      <span key={h} className="text-[9px] font-sans px-2.5 py-1 rounded-sm" style={{
                        background: 'rgba(42,84,99,0.25)',
                        color: 'rgba(246,243,237,0.65)',
                        border: '1px solid rgba(42,84,99,0.25)',
                      }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second card below image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="group cursor-pointer rounded-sm p-6 transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-start gap-5">
                <span className="font-serif text-3xl font-light shrink-0" style={{ color: 'rgba(246,243,237,0.08)' }}>02</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-serif text-lg" style={{ color: 'rgba(246,243,237,0.9)' }}>
                      {manuscripts[1].title}
                    </h4>
                    <span className="text-[9px] font-sans px-2 py-0.5 rounded-sm" style={{
                      background: 'rgba(158, 43, 37, 0.12)',
                      color: 'rgba(158, 43, 37, 0.75)',
                      border: '1px solid rgba(158, 43, 37, 0.1)',
                    }}>
                      {manuscripts[1].category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-sans mb-3" style={{ color: 'rgba(246,243,237,0.3)' }}>
                    <span>{manuscripts[1].dynasty}</span>
                    <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(246,243,237,0.15)' }} />
                    <span>{manuscripts[1].author}</span>
                    <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(246,243,237,0.15)' }} />
                    <span>{manuscripts[1].volumes}</span>
                  </div>
                  <p className="text-[13px] font-sans leading-relaxed" style={{ color: 'rgba(246,243,237,0.45)' }}>
                    {manuscripts[1].description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    {manuscripts[1].highlights.map(h => (
                      <span key={h} className="text-[9px] font-sans px-2 py-1 rounded-sm" style={{
                        background: 'rgba(201,169,110,0.06)',
                        color: 'rgba(201,169,110,0.6)',
                        border: '1px solid rgba(201,169,110,0.1)',
                      }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Two cards stacked */}
          <div className="flex flex-col gap-6">
            {manuscripts.slice(2).map((ms, i) => (
              <motion.div
                key={ms.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
                className="group cursor-pointer rounded-sm p-6 transition-all duration-300 hover:translate-y-[-2px] flex-1"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-start gap-5 h-full">
                  <span className="font-serif text-3xl font-light shrink-0" style={{ color: 'rgba(246,243,237,0.08)' }}>
                    {String(i + 3).padStart(2, '0')}
                  </span>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-serif text-lg" style={{ color: 'rgba(246,243,237,0.9)' }}>
                        {ms.title}
                      </h4>
                      <span className="text-[9px] font-sans px-2 py-0.5 rounded-sm" style={{
                        background: ms.category === '方志' ? 'rgba(42, 84, 99, 0.12)' : 'rgba(158, 43, 37, 0.12)',
                        color: ms.category === '方志' ? 'rgba(42, 84, 99, 0.75)' : 'rgba(158, 43, 37, 0.75)',
                        border: `1px solid ${ms.category === '方志' ? 'rgba(42, 84, 99, 0.15)' : 'rgba(158, 43, 37, 0.1)'}`,
                      }}>
                        {ms.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-sans mb-3" style={{ color: 'rgba(246,243,237,0.3)' }}>
                      <span>{ms.dynasty}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(246,243,237,0.15)' }} />
                      <span>{ms.author}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(246,243,237,0.15)' }} />
                      <span>{ms.volumes}</span>
                    </div>
                    <p className="text-[13px] font-sans leading-relaxed flex-1" style={{ color: 'rgba(246,243,237,0.45)' }}>
                      {ms.description}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {ms.highlights.map(h => (
                        <span key={h} className="text-[9px] font-sans px-2 py-1 rounded-sm" style={{
                          background: 'rgba(201,169,110,0.06)',
                          color: 'rgba(201,169,110,0.6)',
                          border: '1px solid rgba(201,169,110,0.1)',
                        }}>{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Browse all button card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-sm p-5 flex items-center justify-between cursor-pointer group transition-all duration-300 hover:translate-y-[-1px]"
              style={{
                background: 'rgba(42, 84, 99, 0.08)',
                border: '1px solid rgba(42, 84, 99, 0.15)',
              }}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={16} style={{ color: 'rgba(42, 84, 99, 0.7)' }} />
                <span className="text-sm font-sans" style={{ color: 'rgba(246,243,237,0.7)' }}>
                  浏览全部 3,200+ 馆藏典籍
                </span>
              </div>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: 'rgba(42, 84, 99, 0.6)' }} />
            </motion.div>
          </div>
        </div>

        {/* Bottom Tools Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-8 mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="text-[10px] font-sans tracking-wider" style={{ color: 'rgba(246,243,237,0.2)' }}>
            工具
          </span>
          {[
            { icon: <Eye size={13} />, label: '高清阅览' },
            { icon: <FileText size={13} />, label: 'OCR识别' },
            { icon: <Search size={13} />, label: '全文检索' },
            { icon: <Layers size={13} />, label: '批注标记' },
          ].map(tool => (
            <button key={tool.label} className="flex items-center gap-2 text-[11px] font-sans transition-all hover:opacity-70" style={{ color: 'rgba(246,243,237,0.4)' }}>
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
