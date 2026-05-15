import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Send, BookOpen, Sparkles, Brain, FileSearch, Link2 } from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const PRESET_QUESTIONS = [
  '《广东通志》的编纂始末',
  '陈献章与白沙心学',
  '岭南宗族迁徙路线',
  '十三行贸易体系',
]

const MOCK_RESPONSES: Record<string, string> = {
  '《广东通志》的编纂始末': '《广东通志》始修于清雍正七年（1729），由两广总督郝玉麟主持，历时三年告成。此志体例严谨，分舆地、建置、经政、前事四大纲目，共六十四卷。较之前明诸志，增补了大量清初文献，尤以海防、盐法诸条最为详尽。',
  '陈献章与白沙心学': '陈献章（1428-1500），字公甫，号石斋，世称白沙先生。其学以"自得"为宗，主张"学贵知疑""静坐中养出端倪"。白沙心学上接陆九渊心学，下启王阳明良知学说，影响明清岭南学术数百年。',
  '岭南宗族迁徙路线': '岭南宗族迁徙主要有三条路线：一为南宋末年经南雄珠玑巷南下珠三角；二为宋元之际由福建汀州入粤东梅州；三为明清时期由珠三角向粤西、琼州扩散。',
  '十三行贸易体系': '广州十三行（1757-1842）是清代"一口通商"时期唯一合法对外贸易机构。十三行商人垄断茶叶、丝绸、瓷器出口，与英、荷、法、美等国商人进行大宗贸易，年贸易额达数千万两白银。',
}

export function AIAgentSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', content: '我是岭南古籍AI智能体，精通岭南文化典籍、历史考据与知识图谱关联推理。请问需要什么帮助？' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return
    const userMsg: Message = { id: Date.now(), role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = MOCK_RESPONSES[text.trim()] ||
        `关于"${text.trim()}"，据岭南典籍记载，此问题涉及多个历史维度。正在从知识图谱中检索关联文献……`
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <section
      id="ai-agent"
      ref={ref}
      className="relative py-32 px-6 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #f6f3ed 0%, #f0ece4 50%, #f6f3ed 100%)' }}
    >
      <div className="relative z-10 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>
                AI AGENT
              </span>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl" style={{ color: 'hsl(var(--lingnan-ink))' }}>
              古籍智能体
            </h2>
            <p className="mt-4 font-sans leading-relaxed text-sm" style={{ color: 'hsl(var(--lingnan-ink) / 0.35)' }}>
              基于岭南古籍语料微调的专属AI，支持文言文断句、
              白话翻译、历史考据与知识图谱关联推理。
            </p>

            {/* Capabilities */}
            <div className="mt-10 space-y-5">
              {[
                { icon: <Brain size={16} />, title: '自动断句标点', desc: '识别古籍原文，智能添加标点断句与校勘' },
                { icon: <FileSearch size={16} />, title: '文白对译', desc: '逐句翻译，深度释义，引经据典' },
                { icon: <Link2 size={16} />, title: '图谱关联推理', desc: '自动关联人物、典籍、地域知识网络' },
                { icon: <Sparkles size={16} />, title: '溯源举证', desc: '回答附原文出处，可追溯验证' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 rounded-sm flex items-center justify-center" style={{
                    background: 'rgba(42, 84, 99, 0.15)',
                    border: '1px solid rgba(42, 84, 99, 0.2)',
                    color: 'rgba(42, 84, 99, 0.8)',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-medium" style={{ color: 'hsl(var(--lingnan-ink) / 0.75)' }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-sans mt-0.5" style={{ color: 'hsl(var(--lingnan-ink) / 0.3)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 rounded-sm overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(0,0,0,0.06)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Chat Header */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse-soft" style={{ background: 'rgba(100, 200, 120, 0.7)' }} />
              <span className="font-serif text-sm" style={{ color: 'hsl(var(--lingnan-ink) / 0.75)' }}>岭南古籍智能体</span>
              <span className="text-[10px] font-sans ml-auto" style={{ color: 'hsl(var(--lingnan-ink) / 0.25)' }}>
                <Sparkles size={10} className="inline mr-1" />
                知识图谱 · 已就绪
              </span>
            </div>

            {/* Messages */}
            <div className="h-[340px] overflow-y-auto px-5 py-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-[85%] px-4 py-3 rounded-sm text-[13px] font-sans leading-relaxed"
                      style={msg.role === 'user' ? {
                        background: 'rgba(42, 84, 99, 0.6)',
                        color: 'hsl(var(--lingnan-ink) / 0.85)',
                      } : {
                        background: 'rgba(0,0,0,0.04)',
                        color: 'hsl(var(--lingnan-ink) / 0.65)',
                        border: '1px solid rgba(0,0,0,0.04)',
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-sm" style={{ background: 'rgba(0,0,0,0.04)' }}>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{
                          background: 'rgba(42, 84, 99, 0.6)',
                          animationDelay: `${i * 150}ms`,
                        }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preset Questions */}
            <div className="px-5 py-2" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {PRESET_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-[11px] font-sans px-3 py-1.5 rounded-sm transition-all hover:translate-y-[-1px]"
                    style={{
                      color: 'hsl(var(--lingnan-ink) / 0.45)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      background: 'rgba(0,0,0,0.02)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-5 py-3 flex items-center gap-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <BookOpen size={16} style={{ color: 'hsl(var(--lingnan-ink) / 0.2)' }} />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="向智能体提问..."
                className="flex-1 bg-transparent text-sm font-sans outline-none placeholder:opacity-40"
                style={{ color: 'hsl(var(--lingnan-ink) / 0.75)' }}
              />
              <button
                onClick={() => sendMessage(input)}
                className="transition-opacity hover:opacity-70"
                style={{ color: 'rgba(42, 84, 99, 0.8)' }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
