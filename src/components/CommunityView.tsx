import { Users, MessageCircle, Trophy, Calendar } from 'lucide-react'

export default function CommunityView() {
  const leaders = [
    { name: 'DonVito', score: '2 840 500', rank: 1 },
    { name: 'BlackHawk', score: '2 109 800', rank: 2 },
    { name: 'Nevsky', score: '1 988 200', rank: 3 },
    { name: 'Kuznetsov', score: '1 754 000', rank: 4 },
    { name: 'Sokol', score: '1 621 400', rank: 5 },
  ]

  const events = [
    { title: 'Гонка по ночному городу', date: '2 авг, 20:00', type: 'Событие' },
    { title: 'Турнир по дрифту', date: '5 авг, 19:00', type: 'Событие' },
    { title: 'Собрание банд', date: '8 авг, 21:00', type: 'Событие' },
  ]

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
            {leaders.map((p, i) => (
              <div
                key={i}
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
                <span className="font-mono text-sm text-gold-300">{p.score}</span>
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
            {events.map((e, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-ink-800 p-3.5 transition hover:border-white/10"
                style={{ animation: `fadeUp 0.4s ${i * 80}ms both` }}
              >
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-gold-400/10 text-gold-300">
                  <span className="font-display text-sm font-bold leading-none">{e.date.split(' ')[0]}</span>
                  <span className="text-[8px] uppercase">{e.date.split(',')[0].split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-100">{e.title}</p>
                  <p className="text-[11px] text-ink-400">{e.date}</p>
                </div>
                <span className="rounded-md bg-accent-400/10 px-2 py-1 font-mono text-[10px] uppercase text-accent-400">
                  {e.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: 'Всего игроков', value: '34 820' },
            { icon: MessageCircle, label: 'Сообщений за день', value: '12 490' },
            { icon: Trophy, label: 'Сыграно матчей', value: '8 914' },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="rounded-2xl border border-white/5 bg-ink-850 p-5 text-center">
                <Icon size={20} className="mx-auto text-gold-300" />
                <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-ink-400">{s.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
