export type View = 'home' | 'news' | 'media' | 'community' | 'settings'

export type ServerStatus = {
  name: string
  online: boolean
  players: number
  maxPlayers: number
  ping: number
  ip: string
}

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  date: string
  category: 'Обновление' | 'Событие' | 'Новость' | 'Акция'
  image: string
}

export type UpdateFile = {
  path: string
  size: number
  status: 'done' | 'pending' | 'downloading'
  required: boolean
}

export const SERVERS: ServerStatus[] = [
  { name: 'Moscow Project | Main', online: true, players: 847, maxPlayers: 1000, ping: 24, ip: 'play.moscowproject.ru:7777' },
  { name: 'Moscow Project | RP', online: true, players: 412, maxPlayers: 500, ping: 31, ip: 'rp.moscowproject.ru:7777' },
  { name: 'Moscow Project | Test', online: false, players: 0, maxPlayers: 100, ping: 0, ip: 'test.moscowproject.ru:7777' },
]

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Большое обновление 1.8.0 — Новый район и авто',
    excerpt: 'Добавлен район Останкино, 14 новых машин, переработанная экономика и система гаражей. Читайте подробности в патчноутах.',
    date: '30 июля 2026',
    category: 'Обновление',
    image: 'https://images.pexels.com/photos/5058117/pexels-photo-5058117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'n2',
    title: 'Ивент «Ночь на Арбате» — двойной опыт',
    excerpt: 'Все выходные на сервере Main действует двойной опыт и увеличенный заработок. Собирайте команду и заходите в игру.',
    date: '26 июля 2026',
    category: 'Событие',
    image: 'https://images.pexels.com/photos/417374/pexels-photo-417374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'n3',
    title: 'Конкурс скриншотов: победители недели',
    excerpt: 'Подведены итоги недельного конкурса. Лучшие работы уже доступны в разделе «Медиа». Призовой фонд — 50 000 игровых очков.',
    date: '22 июля 2026',
    category: 'Новость',
    image: 'https://images.pexels.com/photos/16763374/pexels-photo-16763374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'n4',
    title: 'Скидки на премиум-аккаунт до 40%',
    excerpt: 'Только до конца месяца — премиум-статус со скидкой. Ускорленный заработок, эксклюзивные авто и приоритет в очереди.',
    date: '18 июля 2026',
    category: 'Акция',
    image: 'https://images.pexels.com/photos/9932440/pexels-photo-9932440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
]

export const HERO_IMAGE = 'https://images.pexels.com/photos/10121239/pexels-photo-10121239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
export const SIDE_IMAGE = 'https://images.pexels.com/photos/29183526/pexels-photo-29183526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'

export const FILES: UpdateFile[] = [
  { path: 'samp.dll', size: 3145728, status: 'done', required: true },
  { path: 'config.ini', size: 2048, status: 'done', required: true },
  { path: 'assets/textures.vfs', size: 184549376, status: 'pending', required: true },
  { path: 'assets/models.vfs', size: 268435456, status: 'pending', required: true },
  { path: 'assets/audio.vfs', size: 67108864, status: 'pending', required: true },
  { path: 'data/maps.bin', size: 8388608, status: 'pending', required: true },
]

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Б'
  const units = ['Б', 'КБ', 'МБ', 'ГБ']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}
