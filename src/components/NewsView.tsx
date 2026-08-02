import { NEWS } from '../data'

const categoryColor: Record<string, string> = {
  'Обновление': 'bg-gold-400/15 text-gold-300 border-gold-400/20',
  'Событие': 'bg-accent-400/15 text-accent-400 border-accent-400/20',
  'Новость': 'bg-blue-400/15 text-blue-300 border-blue-400/20',
  'Акция': 'bg-pink-400/15 text-pink-300 border-pink-400/20',
}

export default function NewsView() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Новости</h1>
        <p className="mt-1 text-sm text-ink-400">Все обновления и события проекта</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {NEWS.map((item, i) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-white/5 bg-ink-850 transition hover:border-white/10 hover:shadow-card"
            style={{ animation: `fadeUp 0.5s ${i * 80}ms both` }}
          >
            <div className="relative h-44 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
              <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${categoryColor[item.category]}`}>
                {item.category}
              </span>
            </div>
            <div className="p-5">
              <span className="font-mono text-[11px] text-ink-400">{item.date}</span>
              <h3 className="mt-1.5 font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.excerpt}</p>
              <button className="mt-4 flex items-center gap-1 text-sm font-medium text-gold-300 transition hover:text-gold-200">
                Читать далее →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
