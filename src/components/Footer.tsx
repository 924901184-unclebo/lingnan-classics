import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

export function Footer() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <footer
      ref={ref}
      className="relative py-20 px-6 lg:px-12"
      style={{ background: '#2C2925', borderTop: '1px solid rgba(181,176,168,0.1)' }}
    >
      <div className="max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(181,176,168,0.1)' }}>
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="seal-stamp !transform-none !rotate-0 !p-1.5 !text-[10px]" style={{
                  borderColor: '#B5B0A8',
                  color: '#D4CFC7',
                }}>
                  岭南
                </div>
                <span className="font-serif text-lg tracking-wider" style={{ color: '#D4CFC7' }}>
                  岭南古籍文献语料数据人工智能平台
                </span>
              </div>
              <p className="text-sm font-sans leading-relaxed max-w-[360px]" style={{ color: 'rgba(181,176,168,0.45)' }}>
                以数字化手段保护与传承岭南文化遗产，构建开放、智能、
                可持续的古籍知识生态系统。
              </p>
            </div>

            <div>
              <h4 className="text-xs font-sans tracking-wider mb-4" style={{ color: '#B5A48C' }}>
                平台
              </h4>
              <ul className="space-y-2.5">
                {['典籍馆藏', '知识图谱', 'AI智能体', '智能检索', '岭南藏书'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-sans transition-colors hover:opacity-70" style={{ color: 'rgba(181,176,168,0.45)' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-sans tracking-wider mb-4" style={{ color: '#B5A48C' }}>
                关于
              </h4>
              <ul className="space-y-2.5">
                {['项目介绍', '合作机构', '学术顾问', '技术架构', '联系我们'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-sans transition-colors hover:opacity-70" style={{ color: 'rgba(181,176,168,0.45)' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-sans" style={{ color: 'rgba(181,176,168,0.25)' }}>
              © 2025 岭南古籍文献语料数据人工智能平台 · 粤ICP备XXXXXXXX号
            </p>
            <div className="flex items-center gap-6">
              {['隐私政策', '使用条款', '开放API'].map(link => (
                <a key={link} href="#" className="text-[11px] font-sans transition-colors hover:opacity-70" style={{ color: 'rgba(181,176,168,0.25)' }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
