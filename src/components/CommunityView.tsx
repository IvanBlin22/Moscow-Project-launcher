import { Users, MessageCircle, Trophy, Calendar } from 'lucide-react'
import type { PlayerRow, EventRow, LauncherStatRow } from '../supabase'

const STAT_ICONS: Record<string, typeof Users> = {
  Users: Users,
  MessageCircle: MessageCircle,
  Trophy: Trophy,
}

export default function CommunityView({
  players,
  events,
  stats,
}: {
  players: PlayerRow[]
  events: EventRow[]
  stats: LauncherStatRow[]
}) {
  const communityStats = stats.filter((s) =>
    ['Всего игроков', 'Сообщений за день', 'Сыграно матчей'].includes(s.label)
  )

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Сообщество</h1>
        <p className="mt-1 text-sm text-ink-400">Лидеры, события и общение</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Leaderboard */}
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-gold-300" />
            <h2 className="font-display text-lg font-bold text-white">Топ игроков</h2>
          </div>
          <div className="space-y-1.5">
            {players.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/5 ${
                  p.rank <= 3 ? 'bg-white/[0.03]' : ''
                }`}
                style={{ animation: `fadeUp 0.4s ${i * 60}ms both` }}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg font-display text-sm font-bold ${
                  p.rank === 1 ? 'bg-gold-400 text-ink-950' :
                  p.rank === 2 ? 'bg-ink-400 text-ink-950' :
                  p.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-ink-700 text-ink-300'
                }`}>
                  {p.rank}
                </span>
                <span className="flex-1 font-medium text-ink-100">{p.name}</span>
                <span className="font-mono text-sm text-gold-300">{p.score.toLocaleString('ru-RU')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-accent-400" />
            <h2 className="font-display text-lg font-bold text-white">Ближайшие события</h2>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => {
              const parts = e.event_date.split(',')
              const dayPart = parts[0]?.trim() ?? ''
              const [dayNum, monthName] = dayPart.split(' ')
              return (
                <div
                  key={e.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-ink-800 p-3.5 transition hover:border-white/10"
                  style={{ animation: `fadeUp 0.4s ${i * 80}ms both` }}
                >
                  <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-gold-400/10 text-gold-300">
                    <span className="font-display text-sm font-bold leading-none">{dayNum}</span>
                    <span className="text-[8px] uppercase">{monthName}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-100">{e.title}</p>
                    <p className="text-[11px] text-ink-400">{e.event_date}</p>
                  </div>
                  <span className="rounded-md bg-accent-400/10 px-2 py-1 font-mono text-[10px] uppercase text-accent-400">
                    {e.type}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        {communityStats.length > 0 && (
          <div className="col-span-2 grid grid-cols-3 gap-4">
            {communityStats.map((s) => {
              const Icon = STAT_ICONS[s.icon ?? ''] ?? Users
              return (
                <div key={s.id} className="rounded-2xl border border-white/5 bg-ink-850 p-5 text-center">
                  <Icon size={20} className="mx-auto text-gold-300" />
                  <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-ink-400">{s.label}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
