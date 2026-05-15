import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const exhibitions = [
  {
    id: 1,
    title: '珠玑巷南迁——岭南宗族迁徙史诗',
    period: '2024.12 — 2025.06',
    tag: '正在展出',
    image: '/images/lingnan-building.png',
    desc: '追溯南宋末年百姓南迁的壮阔历史，呈现岭南宗族文化的源头与流变。',
  },
  {
    id: 2,
    title: '白沙心学与明代岭南士人',
    period: '2025.03 — 2025.09',
    tag: '即将开展',
    image: '/images/hero-lingnan.png',
    desc: '探索陈献章心学思想的形成与传播，揭示明代岭南学术生态。',
  },
  {
    id: 3,
    title: '广彩千年——海上丝路的瓷光',
    period: '2025.06 — 2025.12',
    tag: '筹备中',
    image: '/images/thirteen-hongs-trade.png',
    desc: '广彩瓷器从民间窑场到远销欧美的传奇历程，见证海上丝路的繁荣。',
  },
]

export function ExhibitionSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section
      id="exhibition"
      ref={ref}
      className="relative py-32 px-6 lg:px-12"
      style={{ background: '#eae5db' }}
    >
      <div className="relative z-10 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>
                EXHIBITION
              </span>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl" style={{ color: 'hsl(var(--lingnan-ink))' }}>
              专题展览
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex text-xs font-sans transition-opacity hover:opacity-70" style={{ color: 'rgba(201,169,110,0.5)' }}>
            查看全部展览 →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {exhibitions.map((exhibition, i) => (
            <motion.article
              key={exhibition.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="group cursor-pointer rounded-sm overflow-hidden transition-all duration-500 hover:translate-y-[-4px]"
              style={{ border: '1px solid rgba(0,0,0,0.1)' }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exhibition.image}
                  alt={exhibition.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.9) 100%)',
                }} />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-sans px-2 py-1 rounded-sm" style={{
                    background: exhibition.tag === '正在展出' ? 'rgba(158, 43, 37, 0.8)' : 'rgba(0,0,0,0.6)',
                    color: 'rgba(246,243,237,0.95)',
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}>
                    {exhibition.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif text-sm leading-snug" style={{ color: 'hsl(var(--lingnan-ink))' }}>
                    {exhibition.title}
                  </h3>
                </div>
              </div>
              <div className="p-4" style={{ background: 'rgba(255,255,255,0.9)' }}>
                <p className="text-[11px] font-sans leading-relaxed" style={{ color: 'hsl(var(--lingnan-ink) / 0.5)' }}>
                  {exhibition.desc}
                </p>
                <div className="mt-3 text-[10px] font-sans" style={{ color: 'rgba(201,169,110,0.5)' }}>
                  {exhibition.period}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
