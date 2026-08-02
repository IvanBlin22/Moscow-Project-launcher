import { useState, useEffect, useCallback } from 'react'
import { View } from './data'
import Sidebar from './components/Sidebar'
import TitleBar from './components/TitleBar'
import HomeView from './components/HomeView'
import NewsView from './components/NewsView'
import MediaView from './components/MediaView'
import CommunityView from './components/CommunityView'
import SettingsView from './components/SettingsView'
import PlayBar from './components/PlayBar'

export default function App() {
  const [view, setView] = useState<View>('home')
  const [selectedServer, setSelectedServer] = useState(0)
  const [, setIsPlaying] = useState(false)

  const handleNavigate = useCallback((v: View) => setView(v), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') {
        const views: View[] = ['home', 'news', 'media', 'community', 'settings']
        setView(views[parseInt(e.key) - 1])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-ink-950">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar view={view} onNavigate={handleNavigate} />
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {view === 'home' && (
              <HomeView
                selectedServer={selectedServer}
                onSelectServer={setSelectedServer}
                onPlay={() => setIsPlaying(true)}
              />
            )}
            {view === 'news' && <NewsView />}
            {view === 'media' && <MediaView />}
            {view === 'community' && <CommunityView />}
            {view === 'settings' && <SettingsView />}
          </div>
          <PlayBar
            onPlay={() => setIsPlaying(true)}
            onStop={() => setIsPlaying(false)}
            selectedServer={selectedServer}
          />
        </main>
      </div>
    </div>
  )
}
