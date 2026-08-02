import { useState, useEffect, useCallback } from 'react'
import { View } from './data'
import { useLauncherData } from './useLauncherData'
import Sidebar from './components/Sidebar'
import TitleBar from './components/TitleBar'
import HomeView from './components/HomeView'
import NewsView from './components/NewsView'
import MediaView from './components/MediaView'
import CommunityView from './components/CommunityView'
import SettingsView from './components/SettingsView'
import PlayBar from './components/PlayBar'
import { Loader as Loader2 } from 'lucide-react'

export default function App() {
  const [view, setView] = useState<View>('home')
  const [selectedServer, setSelectedServer] = useState(0)
  const [, setIsPlaying] = useState(false)
  const { servers, news, media, events, players, stats, loading, error } = useLauncherData()

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

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-ink-950">
        <div className="text-center">
          <Loader2 size={32} className="mx-auto animate-spin text-brand-400" />
          <p className="mt-4 font-display text-sm text-ink-300">Загрузка лаунчера…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-ink-950">
        <div className="text-center">
          <p className="font-display text-lg text-red-400">Ошибка подключения</p>
          <p className="mt-2 text-sm text-ink-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-ink-950">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar view={view} onNavigate={handleNavigate} stats={stats} />
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {view === 'home' && (
              <HomeView
                servers={servers}
                news={news}
                stats={stats}
                selectedServer={selectedServer}
                onSelectServer={setSelectedServer}
                onPlay={() => setIsPlaying(true)}
              />
            )}
            {view === 'news' && <NewsView news={news} />}
            {view === 'media' && <MediaView media={media} />}
            {view === 'community' && <CommunityView players={players} events={events} stats={stats} />}
            {view === 'settings' && <SettingsView />}
          </div>
          <PlayBar
            onPlay={() => setIsPlaying(true)}
            onStop={() => setIsPlaying(false)}
            selectedServer={selectedServer}
            servers={servers}
          />
        </main>
      </div>
    </div>
  )
}
