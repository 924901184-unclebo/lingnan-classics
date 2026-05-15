import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { RotateCw, ZoomIn, Layers, Sun, ChevronRight } from 'lucide-react'

const artifacts = [
  {
    id: 1,
    name: '广彩人物纹大盘',
    dynasty: '清·乾隆',
    material: '瓷器·釉上彩',
    dimensions: '直径42cm · 高5.8cm',
    description: '广彩瓷器代表作品，盘面绘制精细人物故事图案，金彩丰富，色泽艳丽。体现十三行贸易时期中西艺术融合特色。',
    image: '/images/lingnan-artifact.png',
    details: ['金彩描边', '矾红底', '西洋人物', '卷草纹饰'],
  },
  {
    id: 2,
    name: '潮州木雕花板',
    dynasty: '清·同治',
    material: '木雕·金漆',
    dimensions: '长86cm · 宽38cm',
    description: '潮州金漆木雕精品，以多层透雕技法表现戏曲人物场景，构图饱满，金碧辉煌。',
    image: '/images/lingnan-artifact.png',
    details: ['五层透雕', '金漆贴面', '戏曲题材', '镂空底纹'],
  },
  {
    id: 3,
    name: '端砚·老坑冰纹',
    dynasty: '明·崇祯',
    material: '端石·老坑',
    dimensions: '长18cm · 宽12cm · 厚3cm',
    description: '肇庆老坑出产，石质细腻温润，冰纹自然流畅，为文房至宝。历经四百年，墨韵犹存。',
    image: '/images/lingnan-artifact.png',
    details: ['天然冰纹', '细腻发墨', '古朴包浆', '铭文题跋'],
  },
]

export function ArtifactsSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })
  const [activeIdx, setActiveIdx] = useState(0)
  const [rotation, setRotation] = useState(0)

  const current = artifacts[activeIdx]

  return (
    <section
      id="artifacts"
      ref={ref}
      className="relative py-32 px-6 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #0d1b21 0%, #0a1418 50%, #0d1b21 100%)' }}
    >
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} />

      <div className="relative z-10 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>
              3D ARTIFACTS
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl" style={{ color: 'rgba(246,243,237,0.95)' }}>
            数字文物
          </h2>
          <p className="mt-4 max-w-[500px] font-sans leading-relaxed text-sm" style={{ color: 'rgba(246,243,237,0.4)' }}>
            广彩瓷器、潮州木雕、端砚名品——3D数字化呈现，
            360°旋转观赏，材质光影纤毫毕现。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative rounded-sm overflow-hidden"
            style={{
              aspectRatio: '4/3',
              background: 'radial-gradient(ellipse at center, rgba(20,40,50,1) 0%, rgba(10,20,25,1) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-12"
              animate={{ rotate: rotation }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <img
                src={current.image}
                alt={current.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: 'drop-shadow(0 0 40px rgba(42,84,99,0.2))' }}
              />
            </motion.div>

            {/* Info annotations */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="text-[10px] font-sans px-2 py-1 rounded-sm" style={{
                background: 'rgba(0,0,0,0.5)',
                color: 'rgba(201, 169, 110, 0.8)',
                border: '1px solid rgba(201,169,110,0.2)',
              }}>
                {current.dynasty}
              </div>
              <div className="text-[10px] font-sans" style={{ color: 'rgba(246,243,237,0.3)' }}>
                {current.dimensions}
              </div>
            </div>

            {/* Measurement line */}
            <div className="absolute top-1/2 right-6 -translate-y-1/2 h-[60%] flex flex-col items-center">
              <div className="h-full w-px" style={{ background: 'rgba(201,169,110,0.2)' }} />
              <div className="absolute top-0 w-2 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
              <div className="absolute bottom-0 w-2 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                {[
                  { icon: <RotateCw size={13} />, action: () => setRotation(r => r + 45) },
                  { icon: <ZoomIn size={13} />, action: () => {} },
                  { icon: <Layers size={13} />, action: () => {} },
                  { icon: <Sun size={13} />, action: () => {} },
                ].map((ctrl, i) => (
                  <button
                    key={i}
                    onClick={ctrl.action}
                    className="w-8 h-8 rounded-sm flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(246,243,237,0.5)',
                    }}
                  >
                    {ctrl.icon}
                  </button>
                ))}
              </div>
              <span className="text-[9px] font-sans" style={{ color: 'rgba(246,243,237,0.2)' }}>
                拖拽旋转 · 滚轮缩放
              </span>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {artifacts.map((artifact, i) => (
              <button
                key={artifact.id}
                onClick={() => { setActiveIdx(i); setRotation(0) }}
                className="text-left p-4 rounded-sm transition-all duration-300"
                style={{
                  background: i === activeIdx ? 'rgba(42,84,99,0.1)' : 'rgba(255,255,255,0.01)',
                  border: `1px solid ${i === activeIdx ? 'rgba(42,84,99,0.3)' : 'rgba(255,255,255,0.04)'}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm" style={{ color: i === activeIdx ? 'rgba(246,243,237,0.95)' : 'rgba(246,243,237,0.6)' }}>
                      {artifact.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-[10px] font-sans" style={{ color: 'rgba(246,243,237,0.3)' }}>
                      <span>{artifact.dynasty}</span>
                      <span>{artifact.material}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: i === activeIdx ? 'rgba(201,169,110,0.6)' : 'rgba(255,255,255,0.1)' }} />
                </div>
              </button>
            ))}

            {/* Detail Card */}
            <div className="mt-2 p-5 rounded-sm" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p className="text-xs font-sans leading-relaxed" style={{ color: 'rgba(246,243,237,0.5)' }}>
                {current.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {current.details.map(d => (
                  <span key={d} className="text-[9px] font-sans px-2 py-1 rounded-sm" style={{
                    background: 'rgba(201,169,110,0.08)',
                    color: 'rgba(201,169,110,0.7)',
                    border: '1px solid rgba(201,169,110,0.15)',
                  }}>{d}</span>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button className="text-[10px] font-sans px-3 py-1.5 rounded-sm" style={{
                  background: 'rgba(42,84,99,0.2)',
                  color: 'rgba(42,84,99,0.9)',
                  border: '1px solid rgba(42,84,99,0.3)',
                }}>
                  VR 全景漫游
                </button>
                <button className="text-[10px] font-sans px-3 py-1.5 rounded-sm" style={{
                  color: 'rgba(246,243,237,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  材质解构
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
