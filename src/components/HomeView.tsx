import { Play, Users, Signal, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import { formatBytes } from '../useLauncherData'
import type { ServerRow, NewsRow, LauncherStatRow } from '../supabase'

const STAT_ICONS: Record<string, typeof Users> = {
  Users: Users,
  Signal: Signal,
  TrendingUp: TrendingUp,
  Clock: Clock,
}

export default function HomeView({
  servers,
  news,
  stats,
  selectedServer,
  onSelectServer,
  onPlay,
}: {
  servers: ServerRow[]
  news: NewsRow[]
  stats: LauncherStatRow[]
  selectedServer: number
  onSelectServer: (i: number) => void
  onPlay: () => void
}) {
  const server = servers[selectedServer] ?? servers[0]
  const featured = news[0]
  const totalSize = 3145728 + 2048 + 184549376 + 268435456 + 67108864 + 8388608
  const homeStats = stats.slice(0, 4)

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative h-[360px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featured?.image_url ?? ''})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />

        <div className="relative flex h-full flex-col justify-end p-8">
          <div className="animate-fade-up">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/10 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-300" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-200">
                Обновление 1.8.0 уже доступно
              </span>
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-tight text-white">
              Добро пожаловать в <span className="text-gradient-gold">Moscow Project</span>
            </h1>
            <p className="mt-2 max-w-xl text-base text-ink-200">
              {featured?.excerpt ?? 'Новый район Останкино, 14 машин, переработанная экономика и система гаражей. Заходи и играй.'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-5 p-8">
        {/* Left: servers + featured */}
        <div className="col-span-2 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            {homeStats.map((s, i) => {
              const Icon = STAT_ICONS[s.icon ?? ''] ?? Users
              const color = i === 0 ? 'text-accent-400' : i === 1 ? 'text-gold-300' : 'text-ink-100'
              return (
                <div
                  key={s.id}
                  className="rounded-xl border border-white/5 bg-ink-850 p-4 transition hover:border-white/10"
                  style={{ animation: `fadeUp 0.5s ${i * 80}ms both` }}
                >
                  <Icon size={18} className={color} />
                  <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-ink-400">{s.label}</p>
                </div>
              )
            })}
          </div>

          {/* Server list */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">Серверы</h2>
              <span className="font-mono text-xs text-ink-500">Выберите сервер</span>
            </div>
            <div className="space-y-2">
              {servers.map((s, i) => {
                const active = i === selectedServer
                const fillPct = s.max_players > 0 ? (s.players / s.max_players) * 100 : 0
                return (
                  <button
                    key={s.id}
                    onClick={() => onSelectServer(i)}
                    className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      active
                        ? 'border-gold-400/30 bg-gold-400/[0.06] shadow-glow'
                        : 'border-white/5 bg-ink-850 hover:border-white/10'
                    }`}
                  >
                    <span className="relative flex h-3 w-3">
                      {s.online && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-50" />
                      )}
                      <span className={`relative inline-flex h-3 w-3 rounded-full ${s.online ? 'bg-accent-400' : 'bg-ink-500'}`} />
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{s.name}</p>
                      <p className="font-mono text-[11px] text-ink-400">{s.ip}</p>
                    </div>
                    {s.online ? (
                      <>
                        <div className="w-32">
                          <div className="mb-1 flex justify-between text-[10px] text-ink-400">
                            <span>{s.players}/{s.max_players}</span>
                            <span>{Math.round(fillPct)}%</span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-ink-700">
                            <div
                              className={`h-full rounded-full ${fillPct > 80 ? 'bg-gold-400' : 'bg-accent-400'}`}
                              style={{ width: `${fillPct}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-mono text-xs text-ink-300">{s.ping}ms</span>
                      </>
                    ) : (
                      <span className="text-xs text-ink-500">Недоступен</span>
                    )}
                    {active && (
                      <span className="rounded-md bg-gold-400/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-gold-300">
                        Выбран
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Featured news */}
          {featured && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-white">Последние новости</h2>
                <button className="flex items-center gap-1 text-xs text-gold-300 transition hover:text-gold-200">
                  Все новости <ChevronRight size={14} />
                </button>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-white/5">
                <div className="relative h-44">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${featured.image_url ?? ''})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-center p-6">
                  <span className="mb-2 w-fit rounded-full bg-gold-400/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-gold-300">
                    {featured.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">{featured.title}</h3>
                  <p className="mt-1 max-w-md text-sm text-ink-300">{featured.excerpt}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: quick actions + patch info */}
        <div className="space-y-5">
          {/* Quick play card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-ink-800 to-ink-850 p-6">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-400/10 blur-2xl" />
            <h3 className="font-display text-lg font-bold text-white">Быстрый старт</h3>
            <p className="mt-1 text-sm text-ink-400">
              Текущий сервер: <span className="text-ink-100">{server?.name ?? '—'}</span>
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${server?.online ? 'bg-accent-400' : 'bg-ink-500'}`} />
              <span className="text-ink-200">
                {server?.online ? `${server.players} игроков онлайн` : 'Сервер недоступен'}
              </span>
            </div>
            <button
              onClick={onPlay}
              className="group mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 py-3 font-display text-sm font-bold text-ink-950 transition hover:from-gold-300 hover:to-gold-400"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Play size={16} className="fill-ink-950" />
              ИГРАТЬ СЕЙЧАС
            </button>
          </div>

          {/* Patch notes card */}
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
            <h3 className="font-display text-base font-bold text-white">Патчноут 1.8.0</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                'Новый район: Останкино',
                '14 новых автомобилей',
                'Переработанная экономика',
                'Система гаражей 2.0',
                'Исправлено 40+ багов',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-300">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-ink-400">
              <span>Размер обновления</span>
              <span className="font-mono text-gold-300">{formatBytes(totalSize)}</span>
            </div>
          </div>

          {/* Social card */}
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
            <h3 className="font-display text-base font-bold text-white">Мы в соцсетях</h3>
            <div className="mt-3 space-y-2">
              {[
                { name: 'Discord', desc: '3 412 участников', color: 'bg-[#5865F2]' },
                { name: 'Telegram', desc: '8 901 подписчик', color: 'bg-[#2AABEE]' },
                { name: 'VK', desc: '12 345 подписчик', color: 'bg-[#0077FF]' },
              ].map((s, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 rounded-lg p-2.5 transition hover:bg-white/5"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.color} text-xs font-bold text-white`}>
                    {s.name[0]}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-ink-100">{s.name}</p>
                    <p className="text-[11px] text-ink-400">{s.desc}</p>
                  </div>
                  <ChevronRight size={14} className="ml-auto text-ink-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
