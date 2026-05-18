import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { BookOpen, ArrowRight, Calendar, User, Hash } from 'lucide-react'

const books = [
  {
    id: 1,
    title: '岭南文库·广东通志',
    author: '郝玉麟 等修',
    publisher: '广东人民出版社',
    year: '2023',
    isbn: '978-7-218-XXXXX',
    category: '方志',
    pages: '1280页',
    image: '/images/ancient-manuscript.png',
    description: '岭南地区最重要的地方志整理本，详载广东一省之舆地、建置、赋役、人物。全新校注，繁简对照。',
    tags: ['点校本', '精装', '全二册'],
  },
  {
    id: 2,
    title: '岭南遗书（校注本）',
    author: '伍崇曜 辑 / 今人校注',
    publisher: '广州出版社',
    year: '2022',
    isbn: '978-7-546-XXXXX',
    category: '丛书',
    pages: '3600页',
    description: '汇集岭南先贤遗著五十九种，涵盖经史子集。首次完整点校整理，附解题与考证。',
    tags: ['全十册', '校注', '线装影印'],
  },
  {
    id: 3,
    title: '白沙先生全集',
    author: '陈献章 著 / 杨权 整理',
    publisher: '中华书局',
    year: '2021',
    isbn: '978-7-101-XXXXX',
    category: '别集',
    pages: '860页',
    description: '明代岭南大儒陈献章诗文全编，含诗、文、语录、尺牍，附年谱与交游考。',
    tags: ['繁体竖排', '精装', '中华经典'],
  },
  {
    id: 4,
    title: '粤大记（点校本）',
    author: '郭棐 撰 / 陈宪猷 校',
    publisher: '广东古籍出版社',
    year: '2020',
    isbn: '978-7-805-XXXXX',
    category: '方志',
    pages: '680页',
    description: '明代广东地方文献善本整理，记载各府州县之山川、城池、官师、人物，附明清地图。',
    tags: ['影印', '点校', '单册'],
  },
  {
    id: 5,
    title: '南海百咏笺注',
    author: '方信孺 著 / 刘斯翰 笺注',
    publisher: '广东高等教育出版社',
    year: '2023',
    isbn: '978-7-536-XXXXX',
    category: '诗集',
    pages: '240页',
    description: '南宋名作逐首详注，考证南海名胜古迹变迁，兼具文学赏析与史料价值。',
    tags: ['笺注', '平装', '插图本'],
  },
  {
    id: 6,
    title: '十三行档案文献汇编',
    author: '广州市档案馆 编',
    publisher: '广东经济出版社',
    year: '2024',
    isbn: '978-7-545-XXXXX',
    category: '档案',
    pages: '2400页',
    description: '首次系统整理清代十三行贸易档案，含中英文商业信函、账簿、官方文书等珍贵史料。',
    tags: ['全五册', '影印', '双语'],
  },
]

export function CollectionSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section
      id="collection"
      ref={ref}
      className="relative py-28 lg:py-36 px-6 lg:px-12"
      style={{ background: '#F5F3EF' }}
    >
      <div className="relative z-10 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: '#8B7355' }}>
                BOOKS
              </span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #8B7355, transparent)' }} />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl" style={{ color: '#2C2925' }}>
              岭南藏书
            </h2>
            <p className="mt-3 font-sans leading-relaxed text-sm max-w-[460px]" style={{ color: '#44403C' }}>
              岭南古籍出版精品，汇聚方志、别集、丛书、档案等类目。全新校注整理，传承千年文脉。
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { icon: <BookOpen size={13} />, val: '260+', label: '出版物' },
              { icon: <Hash size={13} />, val: '8', label: '类目' },
              { icon: <Calendar size={13} />, val: '2018-2024', label: '出版年份' },
              { icon: <User size={13} />, val: '45+', label: '整理者' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{
                  background: 'rgba(139,115,85,0.08)',
                  border: '1px solid rgba(139,115,85,0.12)',
                  color: '#8B7355',
                }}>{stat.icon}</div>
                <div>
                  <div className="font-serif text-sm" style={{ color: '#2C2925' }}>{stat.val}</div>
                  <div className="text-[9px] font-sans" style={{ color: '#B5B0A8' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-3px]"
              style={{
                background: '#E8E4DD',
                border: '1px solid #D4CFC7',
                boxShadow: '0 2px 12px rgba(44,41,37,0.04)',
              }}
            >
              {book.image && (
                <div className="relative h-40 overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(44,41,37,0.6) 100%)' }} />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-sans px-2 py-0.5 rounded-sm" style={{ background: '#44403C', color: '#F5F3EF' }}>{book.category}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-serif text-base text-white leading-snug">{book.title}</h4>
                  </div>
                </div>
              )}

              <div className="p-5">
                {!book.image && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-sans px-2 py-0.5 rounded-sm" style={{ background: 'rgba(139,115,85,0.1)', color: '#8B7355', border: '1px solid rgba(139,115,85,0.15)' }}>{book.category}</span>
                      <span className="text-[10px] font-sans" style={{ color: '#B5B0A8' }}>{book.year}</span>
                    </div>
                    <h4 className="font-serif text-base mb-2" style={{ color: '#2C2925' }}>{book.title}</h4>
                  </>
                )}

                <div className="flex items-center gap-2 text-[11px] font-sans mb-2" style={{ color: '#44403C' }}>
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-sans mb-3" style={{ color: '#B5B0A8' }}>
                  <span>{book.publisher}</span>
                  <span>·</span>
                  <span>{book.year}</span>
                  <span>·</span>
                  <span>{book.pages}</span>
                </div>

                <p className="text-[12px] font-sans leading-relaxed mb-4" style={{ color: '#44403C' }}>
                  {book.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {book.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-sans px-2 py-0.5 rounded-full" style={{
                      background: 'rgba(181,164,140,0.15)',
                      color: '#8B7355',
                      border: '1px solid rgba(181,164,140,0.25)',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 rounded-lg p-5 flex items-center justify-between cursor-pointer group transition-all duration-300 hover:translate-y-[-1px]"
          style={{ background: 'rgba(139,115,85,0.06)', border: '1px solid rgba(139,115,85,0.12)' }}
        >
          <div className="flex items-center gap-3">
            <BookOpen size={16} style={{ color: '#8B7355' }} />
            <span className="text-sm font-sans" style={{ color: '#44403C' }}>浏览全部 260+ 出版图书</span>
          </div>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: '#8B7355' }} />
        </motion.div>
      </div>
    </section>
  )
}
