import { useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { KnowledgeGraphSection } from '@/components/KnowledgeGraphSection'
import { CollectionSection } from '@/components/CollectionSection'
import { SearchSection } from '@/components/SearchSection'
import { AIAgentSection } from '@/components/AIAgentSection'
import { Footer } from '@/components/Footer'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#f6f3ed' }}>
      <Navigation />
      <main>
        <HeroSection />
        <KnowledgeGraphSection />
        <CollectionSection />
        <SearchSection />
        <AIAgentSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
