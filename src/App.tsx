import { useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { CollectionSection } from '@/components/CollectionSection'
import { SearchSection } from '@/components/SearchSection'
import { KnowledgeGraphSection } from '@/components/KnowledgeGraphSection'
import { AIAgentSection } from '@/components/AIAgentSection'
import { ArtifactsSection } from '@/components/ArtifactsSection'
import { ExhibitionSection } from '@/components/ExhibitionSection'
import { Footer } from '@/components/Footer'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0a1418' }}>
      <Navigation />
      <main>
        <HeroSection />
        <CollectionSection />
        <SearchSection />
        <KnowledgeGraphSection />
        <AIAgentSection />
        <ArtifactsSection />
        <ExhibitionSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
