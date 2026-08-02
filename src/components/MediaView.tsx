import type { MediaRow } from '../supabase'
import { ImageOff } from 'lucide-react'

export default function MediaView({ media }: { media: MediaRow[] }) {
  const gallery = media.length > 0 ? media : []

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Медиа</h1>
        <p className="mt-1 text-sm text-ink-400">Скриншоты и видео из мира Moscow Project</p>
      </div>

      {gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-ink-850 py-20">
          <ImageOff size={40} className="text-ink-600" />
          <p className="mt-4 font-display text-lg text-ink-200">Здесь пока ничего нет</p>
          <p className="mt-1 text-sm text-ink-400">Скриншоты и видео появятся позже. Заготовка для загрузки готова.</p>
        </div>
      ) : (
        <div className="columns-3 gap-4 [&>*]:mb-4">
          {gallery.map((item, i) => (
            <div
              key={item.id}
              className="group relative break-inside-avoid overflow-hidden rounded-xl border border-white/5"
              style={{ animation: `fadeUp 0.5s ${i * 50}ms both` }}
            >
              <img
                src={item.image_url}
                alt={item.caption ?? ''}
                className="w-full transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              {item.caption && (
                <p className="absolute bottom-3 left-3 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
