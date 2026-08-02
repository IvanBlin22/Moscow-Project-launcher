import { useState } from 'react'
import { Monitor, Volume2, Folder, Info, Check } from 'lucide-react'

export default function SettingsView() {
  const [resolution, setResolution] = useState('1920×1080')
  const [fullscreen, setFullscreen] = useState(true)
  const [volume, setVolume] = useState(80)
  const [autoUpdate, setAutoUpdate] = useState(true)

  const resolutions = ['1280×720', '1600×900', '1920×1080', '2560×1440', '3840×2160']

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Настройки</h1>
        <p className="mt-1 text-sm text-ink-400">Конфигурация лаунчера и игры</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Graphics */}
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Monitor size={18} className="text-brand-300" />
            <h2 className="font-display text-lg font-bold text-white">Графика</h2>
          </div>

          <label className="mb-1 block text-xs text-ink-400">Разрешение</label>
          <div className="mb-4 flex flex-wrap gap-2">
            {resolutions.map((r) => (
              <button
                key={r}
                onClick={() => setResolution(r)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                  resolution === r
                    ? 'bg-brand-500 text-white'
                    : 'bg-ink-800 text-ink-300 hover:bg-ink-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-ink-800 px-4 py-3">
            <span className="text-sm text-ink-200">Полноэкранный режим</span>
            <button
              onClick={() => setFullscreen((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${fullscreen ? 'bg-brand-500' : 'bg-ink-600'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${fullscreen ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Audio */}
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Volume2 size={18} className="text-brand-300" />
            <h2 className="font-display text-lg font-bold text-white">Звук</h2>
          </div>

          <label className="mb-2 block text-xs text-ink-400">Громкость — {volume}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
          <div className="mt-4 flex items-center justify-between rounded-lg bg-ink-800 px-4 py-3">
            <span className="text-sm text-ink-200">Автообновление</span>
            <button
              onClick={() => setAutoUpdate((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${autoUpdate ? 'bg-accent-500' : 'bg-ink-600'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${autoUpdate ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Game folder */}
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Folder size={18} className="text-brand-300" />
            <h2 className="font-display text-lg font-bold text-white">Папка игры</h2>
          </div>
          <div className="rounded-lg border border-white/5 bg-ink-900 p-3 font-mono text-xs text-ink-300">
            C:\Program Files\MoscowProject
          </div>
          <button className="mt-3 w-full rounded-lg border border-white/10 bg-ink-800 py-2.5 text-sm text-ink-200 transition hover:bg-ink-700">
            Выбрать папку
          </button>
        </div>

        {/* About */}
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Info size={18} className="text-brand-300" />
            <h2 className="font-display text-lg font-bold text-white">О лаунчере</h2>
          </div>
          <dl className="space-y-2 text-sm">
            {[
              ['Версия', '2'],
              ['Сборка', '2026.08.02'],
              ['Платформа', 'Windows'],
              ['Лицензия', 'Moscow Project'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                <dt className="text-ink-400">{k}</dt>
                <dd className="font-mono text-ink-100">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Save bar */}
        <div className="col-span-2 flex justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 px-6 py-3 font-display text-sm font-bold text-white transition hover:from-brand-300 hover:to-brand-400">
            <Check size={16} />
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  )
}
