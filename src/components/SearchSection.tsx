import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

export function SearchSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('全部')

  const filters = ['全部', '典籍', '人物', '地域', '年代', '类目']

  const searchResults = [
    { title: '广东通志', type: '典籍', dynasty: '清·雍正', match: '卷三十二·海防' },
    { title: '陈献章', type: '人物', dynasty: '明', match: '白沙先生·新会' },
    { title: '珠玑巷', type: '地域', dynasty: '宋-清', match: '南雄·宗族南迁起点' },
  ]

  return (
    <section
      ref={ref}
      id="search"
      className="relative py-24 px-6 lg:px-12"
      style={{ background: '#E8D4B7' }}
    >
      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,249,232,0.4) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-[800px] 2xl:max-w-[960px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-2xl md:text-3xl" style={{ color: '#3C2F20' }}>
            智能检索
          </h2>
          <p className="text-sm font-sans mt-2" style={{ color: '#5A4A3A' }}>
            支持全文繁简检索、字音形近字、AI语义搜索
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center rounded-lg px-4 py-3.5" style={{
            background: '#FFF9E8',
            border: '1px solid #D4B89B',
            boxShadow: '0 4px 20px rgba(60,47,32,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            <Search size={18} style={{ color: '#5A7D9A' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入典籍名称、人物、关键词，或用自然语言提问..."
              className="flex-1 bg-transparent text-sm font-sans outline-none mx-3 placeholder:opacity-40"
              style={{ color: '#3C2F20' }}
            />
            <button style={{ color: '#5A7D9A' }}>
              <SlidersHorizontal size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="text-[11px] font-sans px-3 py-1.5 rounded-full transition-all"
                style={activeFilter === f ? {
                  background: '#5A7D9A',
                  color: '#FFF9E8',
                  border: '1px solid #5A7D9A',
                } : {
                  color: '#5A4A3A',
                  border: '1px solid #D4B89B',
                  background: 'rgba(255,249,232,0.5)',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {query && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg overflow-hidden"
              style={{
                background: '#FFF9E8',
                border: '1px solid #D4B89B',
                boxShadow: '0 8px 32px rgba(60,47,32,0.1)',
              }}
            >
              {searchResults.map((result, i) => (
                <div
                  key={i}
                  className="px-4 py-3 cursor-pointer transition-colors hover:bg-[rgba(255,232,194,0.3)]"
                  style={{ borderBottom: i < searchResults.length - 1 ? '1px solid rgba(212,184,155,0.4)' : 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-sans px-1.5 py-0.5 rounded-full" style={{
                        border: '1px solid rgba(90,125,154,0.3)',
                        color: '#5A7D9A',
                        background: 'rgba(90,125,154,0.06)',
                      }}>
                        {result.type}
                      </span>
                      <span className="text-sm font-serif" style={{ color: '#3C2F20' }}>
                        {result.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-sans" style={{ color: '#7A6A5A' }}>
                      {result.dynasty}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans mt-1 ml-[52px]" style={{ color: '#7A6A5A' }}>
                    {result.match}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
