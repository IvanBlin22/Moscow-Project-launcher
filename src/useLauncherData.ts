import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { ServerRow, NewsRow, MediaRow, EventRow, PlayerRow, LauncherStatRow } from './supabase'

export function useLauncherData() {
  const [servers, setServers] = useState<ServerRow[]>([])
  const [news, setNews] = useState<NewsRow[]>([])
  const [media, setMedia] = useState<MediaRow[]>([])
  const [events, setEvents] = useState<EventRow[]>([])
  const [players, setPlayers] = useState<PlayerRow[]>([])
  const [stats, setStats] = useState<LauncherStatRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [s, n, m, e, p, st] = await Promise.all([
          supabase.from('servers').select('*').order('sort_order'),
          supabase.from('news').select('*').order('published_at', { ascending: false }),
          supabase.from('media').select('*').order('sort_order'),
          supabase.from('events').select('*').order('event_date'),
          supabase.from('players').select('*').order('rank'),
          supabase.from('launcher_stats').select('*').order('sort_order'),
        ])

        if (s.error) throw s.error
        if (n.error) throw n.error
        if (m.error) throw m.error
        if (e.error) throw e.error
        if (p.error) throw p.error
        if (st.error) throw st.error

        setServers(s.data as ServerRow[])
        setNews(n.data as NewsRow[])
        setMedia(m.data as MediaRow[])
        setEvents(e.data as EventRow[])
        setPlayers(p.data as PlayerRow[])
        setStats(st.data as LauncherStatRow[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить данные')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { servers, news, media, events, players, stats, loading, error }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Б'
  const units = ['Б', 'КБ', 'МБ', 'ГБ']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function formatDate(iso: string): string {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const d = new Date(iso)
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}
