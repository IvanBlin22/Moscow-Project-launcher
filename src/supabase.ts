import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ServerRow = {
  id: string
  name: string
  ip: string
  online: boolean
  players: number
  max_players: number
  ping: number
  sort_order: number
  created_at: string
}

export type NewsRow = {
  id: string
  title: string
  excerpt: string
  body: string | null
  category: string
  image_url: string | null
  published_at: string
  created_at: string
}

export type MediaRow = {
  id: string
  image_url: string
  caption: string | null
  sort_order: number
  created_at: string
}

export type EventRow = {
  id: string
  title: string
  event_date: string
  type: string
  created_at: string
}

export type PlayerRow = {
  id: string
  name: string
  score: number
  rank: number
  created_at: string
}

export type UpdateFileRow = {
  id: string
  path: string
  size: number
  required: boolean
  status: string
  created_at: string
}

export type LauncherStatRow = {
  id: string
  label: string
  value: string
  icon: string | null
  sort_order: number
  created_at: string
}
