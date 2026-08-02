import { Home, Newspaper, Image, Users, Settings, type LucideIcon } from 'lucide-react'
import { View } from '../data'
import type { LauncherStatRow } from '../supabase'

type NavItem = { id: View; label: string; icon: LucideIcon }

const NAV: NavItem[] = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'news', label: 'Новости', icon: Newspaper },
  { id: 'media', label: 'Медиа', icon: Image },
  { id: 'community', label: 'Сообщество', icon: Users },
  { id: 'settings', label: 'Настройки', icon: Settings },
]

export default function Sidebar({
  view,
  onNavigate,
  stats,
}: {
  view: View
  onNavigate: (v: View) => void
  stats: LauncherStatRow[]
}) {
  const onlineStat = stats.find((s) => s.label === 'Игроков онлайн')
  const onlineCount = onlineStat ? onlineStat.value : '—'
  const totalPlayers = stats.find((s) => s.label === 'Всего игроков')
  const maxOnline = totalPlayers ? parseInt(totalPlayers.value.replace(/\s/g, '')) : 2000
  const onlineNum = parseInt(onlineCount.replace(/\s/g, '')) || 0
  const fillPct = Math.min((onlineNum / maxOnline) * 100, 100)

  return (
    <aside className="flex w-56 flex-col border-r border-white/5 bg-ink-900/80">
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <span className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-widest text-ink-500">
          Навигация
        </span>
        {NAV.map((item, i) => {
          const active = view === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-white/[0.07] text-white'
                  : 'text-ink-300 hover:bg-white/[0.04] hover:text-ink-100'
              }`}
              style={{ animation: `fadeUp 0.4s ${i * 60}ms both` }}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500" />
              )}
              <Icon
                size={18}
                className={active ? 'text-gold-300' : 'text-ink-400 group-hover:text-ink-200'}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="m-3 rounded-xl border border-white/5 bg-gradient-to-br from-ink-800 to-ink-850 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent-400">
            Онлайн
          </span>
        </div>
        <p className="font-display text-2xl font-bold text-white">{onlineCount}</p>
        <p className="text-xs text-ink-400">игроков сейчас</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400" style={{ width: `${fillPct}%` }} />
        </div>
      </div>
    </aside>
  )
}
