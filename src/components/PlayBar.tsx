import { Play, Square, Loader2, CheckCircle2, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { ServerRow } from '../supabase'

type Phase = 'idle' | 'checking' | 'ready' | 'downloading' | 'launching' | 'running'

export default function PlayBar({
  onPlay,
  onStop,
  selectedServer,
  servers,
}: {
  onPlay: () => void
  onStop: () => void
  selectedServer: number
  servers: ServerRow[]
}) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const [serverOpen, setServerOpen] = useState(false)
  const server = servers[selectedServer] ?? servers[0]

  const totalFiles = 6
  const downloaded = Math.round((progress / 100) * totalFiles)

  const handlePlay = () => {
    if (phase === 'idle') {
      setPhase('checking')
      setTimeout(() => {
        setPhase('downloading')
        onPlay()
        const interval = setInterval(() => {
          setProgress((p) => {
            if (p >= 100) {
              clearInterval(interval)
              setPhase('launching')
              setTimeout(() => setPhase('running'), 1500)
              return 100
            }
            return p + 2
          })
        }, 80)
      }, 1200)
    }
  }

  const handleStop = () => {
    setPhase('idle')
    setProgress(0)
    onStop()
  }

  const isBusy = phase === 'checking' || phase === 'downloading' || phase === 'launching'
  const isRunning = phase === 'running'

  return (
    <div className="relative border-t border-white/5 bg-ink-900/95 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Server selector */}
        <div className="relative">
          <button
            onClick={() => setServerOpen((v) => !v)}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-800 px-4 py-2.5 text-left transition hover:border-white/10"
          >
            <span className={`h-2 w-2 rounded-full ${server?.online ? 'bg-accent-400' : 'bg-ink-500'}`} />
            <div>
              <p className="text-sm font-semibold text-white">{server?.name ?? '—'}</p>
              <p className="font-mono text-[10px] text-ink-400">{server?.ip ?? ''}</p>
            </div>
            <ChevronDown size={16} className={`text-ink-400 transition ${serverOpen ? 'rotate-180' : ''}`} />
          </button>
          {serverOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-card">
              {servers.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setServerOpen(false)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5 ${
                    i === selectedServer ? 'bg-white/[0.04]' : ''
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${s.online ? 'bg-accent-400' : 'bg-ink-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-100">{s.name}</p>
                    <p className="text-xs text-ink-400">
                      {s.online ? `${s.players}/${s.max_players} игроков` : 'Недоступен'}
                    </p>
                  </div>
                  {s.online && <span className="font-mono text-xs text-ink-400">{s.ping}ms</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Progress / status */}
        <div className="flex flex-1 items-center">
          {phase === 'idle' && (
            <p className="text-sm text-ink-400">Готово к запуску · Все файлы проверены</p>
          )}
          {phase === 'checking' && (
            <div className="flex items-center gap-2 text-sm text-ink-200">
              <Loader2 size={16} className="animate-spin text-gold-300" />
              Проверка целостности файлов…
            </div>
          )}
          {phase === 'downloading' && (
            <div className="flex-1">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-ink-200">Загрузка обновлений · {downloaded}/{totalFiles}</span>
                <span className="font-mono text-gold-300">{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          {phase === 'launching' && (
            <div className="flex items-center gap-2 text-sm text-ink-200">
              <Loader2 size={16} className="animate-spin text-gold-300" />
              Запуск игры…
            </div>
          )}
          {phase === 'running' && (
            <div className="flex items-center gap-2 text-sm text-accent-400">
              <CheckCircle2 size={16} />
              Игра запущена · Удачной игры!
            </div>
          )}
        </div>

        {/* Play / Stop button */}
        {!isRunning ? (
          <button
            onClick={handlePlay}
            disabled={isBusy}
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3 font-display text-sm font-bold text-ink-950 shadow-glow transition-all hover:from-gold-300 hover:to-gold-400 disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {isBusy ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Play size={18} className="fill-ink-950" />
            )}
            {phase === 'idle' && 'ИГРАТЬ'}
            {phase === 'checking' && 'ПРОВЕРКА'}
            {phase === 'downloading' && 'ЗАГРУЗКА'}
            {phase === 'launching' && 'ЗАПУСК'}
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex items-center gap-2.5 rounded-xl bg-red-500/90 px-7 py-3 font-display text-sm font-bold text-white transition hover:bg-red-500"
          >
            <Square size={16} className="fill-white" />
            ОСТАНОВИТЬ
          </button>
        )}
      </div>
    </div>
  )
}
