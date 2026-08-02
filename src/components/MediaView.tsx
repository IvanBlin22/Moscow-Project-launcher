import { NEWS } from '../data'

export default function MediaView() {
  const images = NEWS.map((n) => n.image)
  const gallery = [...images, ...images]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Медиа</h1>
        <p className="mt-1 text-sm text-ink-400">Скриншоты и видео из мира Moscow Project</p>
      </div>

      <div className="columns-3 gap-4 [&>*]:mb-4">
        {gallery.map((img, i) => (
          <div
            key={i}
            className="group relative break-inside-avoid overflow-hidden rounded-xl border border-white/5"
            style={{ animation: `fadeUp 0.5s ${i * 50}ms both` }}
          >
            <img
              src={img}
              alt=""
              className="w-full transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
