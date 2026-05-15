import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Network, Zap, GitBranch, MapPin } from 'lucide-react'

interface GraphNode {
  id: string
  label: string
  type: 'person' | 'book' | 'place' | 'clan' | 'event'
  x: number
  y: number
  radius: number
}

interface GraphEdge {
  source: string
  target: string
  label: string
}

const NODE_COLORS: Record<string, { fill: string; glow: string }> = {
  person: { fill: 'rgba(42, 84, 99, 0.9)', glow: 'rgba(42, 84, 99, 0.3)' },
  book: { fill: 'rgba(80, 140, 160, 0.9)', glow: 'rgba(80, 140, 160, 0.3)' },
  place: { fill: 'rgba(201, 169, 110, 0.9)', glow: 'rgba(201, 169, 110, 0.3)' },
  clan: { fill: 'rgba(90, 90, 90, 0.9)', glow: 'rgba(90, 90, 90, 0.3)' },
  event: { fill: 'rgba(158, 43, 37, 0.85)', glow: 'rgba(158, 43, 37, 0.3)' },
}

const NODES: GraphNode[] = [
  { id: '1', label: '陈献章', type: 'person', x: 0.50, y: 0.45, radius: 36 },
  { id: '2', label: '白沙心学', type: 'event', x: 0.30, y: 0.30, radius: 30 },
  { id: '3', label: '新会', type: 'place', x: 0.68, y: 0.30, radius: 26 },
  { id: '4', label: '湛若水', type: 'person', x: 0.38, y: 0.68, radius: 32 },
  { id: '5', label: '甘泉学派', type: 'event', x: 0.18, y: 0.58, radius: 28 },
  { id: '6', label: '增城', type: 'place', x: 0.58, y: 0.72, radius: 24 },
  { id: '7', label: '大学衍义补注', type: 'book', x: 0.75, y: 0.58, radius: 28 },
  { id: '8', label: '陈氏宗族', type: 'clan', x: 0.70, y: 0.15, radius: 26 },
  { id: '9', label: '白沙集', type: 'book', x: 0.20, y: 0.15, radius: 26 },
  { id: '10', label: '王阳明', type: 'person', x: 0.10, y: 0.40, radius: 30 },
  { id: '11', label: '广州府', type: 'place', x: 0.85, y: 0.40, radius: 24 },
  { id: '12', label: '岭南学术', type: 'event', x: 0.42, y: 0.12, radius: 28 },
  { id: '13', label: '珠玑巷', type: 'place', x: 0.90, y: 0.70, radius: 22 },
  { id: '14', label: '南海', type: 'place', x: 0.12, y: 0.78, radius: 22 },
]

const EDGES: GraphEdge[] = [
  { source: '1', target: '2', label: '创立' },
  { source: '1', target: '3', label: '籍贯' },
  { source: '1', target: '4', label: '师承' },
  { source: '4', target: '5', label: '创立' },
  { source: '4', target: '6', label: '籍贯' },
  { source: '1', target: '9', label: '著述' },
  { source: '1', target: '8', label: '族属' },
  { source: '4', target: '7', label: '著述' },
  { source: '10', target: '2', label: '同源' },
  { source: '3', target: '11', label: '隶属' },
  { source: '2', target: '12', label: '影响' },
  { source: '5', target: '12', label: '影响' },
  { source: '8', target: '13', label: '迁徙' },
  { source: '5', target: '14', label: '传播' },
  { source: '10', target: '5', label: '呼应' },
]

export function KnowledgeGraphSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const animRef = useRef<number>(0)
  const sizeRef = useRef({ w: 800, h: 500 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || !inView) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      sizeRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (time: number) => {
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)

      // Draw animated background particles
      for (let i = 0; i < 30; i++) {
        const px = (Math.sin(time * 0.0003 + i * 2.1) * 0.5 + 0.5) * w
        const py = (Math.cos(time * 0.0004 + i * 1.7) * 0.5 + 0.5) * h
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(42, 84, 99, 0.15)'
        ctx.fill()
      }

      // Draw edges
      EDGES.forEach((edge) => {
        const src = NODES.find(n => n.id === edge.source)
        const tgt = NODES.find(n => n.id === edge.target)
        if (!src || !tgt) return

        const sx = src.x * w, sy = src.y * h
        const tx = tgt.x * w, ty = tgt.y * h

        const isActive = selectedNode &&
          (selectedNode.id === src.id || selectedNode.id === tgt.id)
        const isHoverEdge = hoveredNode &&
          (hoveredNode.id === src.id || hoveredNode.id === tgt.id)

        // Curved bezier edge
        const midX = (sx + tx) / 2 + Math.sin(time * 0.001 + parseFloat(edge.source)) * 8
        const midY = (sy + ty) / 2 - 25

        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(midX, midY, tx, ty)

        if (isActive) {
          ctx.strokeStyle = 'rgba(201, 169, 110, 0.7)'
          ctx.lineWidth = 2
          // Animated dash for active edges
          ctx.setLineDash([8, 4])
          ctx.lineDashOffset = -time * 0.02
        } else if (isHoverEdge) {
          ctx.strokeStyle = 'rgba(42, 84, 99, 0.5)'
          ctx.lineWidth = 1.5
          ctx.setLineDash([])
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
          ctx.lineWidth = 1
          ctx.setLineDash([])
        }

        ctx.stroke()
        ctx.setLineDash([])

        // Edge label for active
        if (isActive) {
          ctx.font = '10px "Noto Sans SC", sans-serif'
          ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(edge.label, midX, midY - 8)
        }
      })

      // Draw nodes
      NODES.forEach((node) => {
        const nx = node.x * w
        const ny = node.y * h
        const r = node.radius

        const isSelected = selectedNode?.id === node.id
        const isHovered = hoveredNode?.id === node.id
        const isConnected = selectedNode && EDGES.some(
          e => (e.source === selectedNode.id && e.target === node.id) ||
               (e.target === selectedNode.id && e.source === node.id)
        )
        const dimmed = selectedNode && !isSelected && !isConnected
        const colors = NODE_COLORS[node.type]

        const drawRadius = isHovered ? r * 1.12 : r
        const alpha = dimmed ? 0.25 : 1

        // Outer glow ring
        if (isSelected || isHovered) {
          const gradient = ctx.createRadialGradient(nx, ny, drawRadius, nx, ny, drawRadius + 15)
          gradient.addColorStop(0, colors.glow)
          gradient.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(nx, ny, drawRadius + 15, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Pulsing ring for selected
        if (isSelected) {
          const pulse = Math.sin(time * 0.003) * 0.3 + 0.7
          ctx.beginPath()
          ctx.arc(nx, ny, drawRadius + 5, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(201, 169, 110, ${pulse * 0.6})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Node fill
        ctx.beginPath()
        ctx.arc(nx, ny, drawRadius, 0, Math.PI * 2)
        ctx.globalAlpha = alpha
        ctx.fillStyle = colors.fill
        ctx.fill()

        // Subtle border
        ctx.strokeStyle = isSelected
          ? 'rgba(201, 169, 110, 0.8)'
          : 'rgba(255, 255, 255, 0.15)'
        ctx.lineWidth = isSelected ? 2 : 1
        ctx.stroke()

        // Label text
        ctx.font = `${node.radius > 30 ? 13 : 11}px "Noto Serif SC", serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`
        ctx.fillText(node.label, nx, ny)

        ctx.globalAlpha = 1
      })

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [inView, selectedNode, hoveredNode])

  const getNodeAtPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height

    return NODES.find(n => {
      const dx = n.x - x
      const dy = n.y - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      return dist < (n.radius / sizeRef.current.w) * 1.5
    }) || null
  }

  const handleClick = (e: React.MouseEvent) => {
    const node = getNodeAtPos(e.clientX, e.clientY)
    setSelectedNode(node === selectedNode ? null : node)
  }

  const handleMove = (e: React.MouseEvent) => {
    const node = getNodeAtPos(e.clientX, e.clientY)
    setHoveredNode(node)
    if (canvasRef.current) {
      canvasRef.current.style.cursor = node ? 'pointer' : 'default'
    }
  }

  const typeConfig = {
    person: { label: '人物', icon: <GitBranch size={12} /> },
    book: { label: '典籍', icon: <Zap size={12} /> },
    place: { label: '地域', icon: <MapPin size={12} /> },
    clan: { label: '宗族', icon: <Network size={12} /> },
    event: { label: '事件', icon: <Zap size={12} /> },
  }

  return (
    <section
      id="knowledge-graph"
      ref={ref}
      className="relative py-32 px-6 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b21 0%, #122a33 50%, #0a1a1f 100%)' }}
    >
      {/* Animated background texture */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/knowledge-graph-bg.png"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>
              KNOWLEDGE GRAPH
            </span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mt-2" style={{ color: 'rgba(246,243,237,0.95)' }}>
            岭南知识图谱
          </h2>
          <p className="mt-4 max-w-[550px] font-sans leading-relaxed text-sm" style={{ color: 'rgba(246,243,237,0.45)' }}>
            以人物、典籍、宗族、地域四维度构建岭南文化知识网络。
            点击节点探索千年文脉的深层关联与传承脉络。
          </p>
        </motion.div>

        {/* Graph Canvas */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative rounded-sm overflow-hidden"
          style={{
            height: '520px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <canvas
            ref={canvasRef}
            onClick={handleClick}
            onMouseMove={handleMove}
            onMouseLeave={() => setHoveredNode(null)}
            className="w-full h-full"
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-5">
            {Object.entries(typeConfig).map(([type, config]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full border"
                  style={{
                    background: NODE_COLORS[type].fill,
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                />
                <span className="text-[10px] font-sans" style={{ color: 'rgba(246,243,237,0.4)' }}>
                  {config.label}
                </span>
              </div>
            ))}
          </div>

          {/* Selected Node Detail Panel */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="absolute top-4 right-4 rounded-sm p-5 max-w-[260px]"
                style={{
                  background: 'rgba(10, 26, 31, 0.92)',
                  border: '1px solid rgba(201, 169, 110, 0.2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: NODE_COLORS[selectedNode.type].fill }}
                  />
                  <span className="text-[10px] font-sans" style={{ color: 'rgba(201,169,110,0.7)' }}>
                    {typeConfig[selectedNode.type].label}
                  </span>
                </div>
                <div className="font-serif text-base mb-3" style={{ color: 'rgba(246,243,237,0.95)' }}>
                  {selectedNode.label}
                </div>
                <div className="space-y-1.5">
                  {EDGES.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map((edge, i) => {
                    const otherId = edge.source === selectedNode.id ? edge.target : edge.source
                    const other = NODES.find(n => n.id === otherId)
                    return (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-sans" style={{ color: 'rgba(246,243,237,0.5)' }}>
                        <span style={{ color: 'rgba(201,169,110,0.6)' }}>—</span>
                        <span>{edge.label}</span>
                        <span>→</span>
                        <span style={{ color: 'rgba(246,243,237,0.7)' }}>{other?.label}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { number: '2,400+', label: '知识节点' },
            { number: '8,600+', label: '关联边' },
            { number: '四维度', label: '人物·典籍·宗族·地域' },
            { number: '实时', label: '动态推理引擎' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-xl" style={{ color: 'rgba(246,243,237,0.9)' }}>
                {stat.number}
              </div>
              <div className="text-[11px] font-sans mt-1" style={{ color: 'rgba(246,243,237,0.35)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
