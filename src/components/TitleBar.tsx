import { Minus, Square, X } from 'lucide-react'

export default function TitleBar() {
  return (
    <div className="flex h-9 items-center justify-between border-b border-white/5 bg-ink-900 px-3 select-none">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-gold-300 to-gold-600">
          <span className="font-display text-[10px] font-bold text-ink-950">M</span>
        </div>
        <span className="font-display text-xs font-semibold tracking-wide text-ink-200">
          MOSCOW PROJECT
        </span>
        <span className="ml-1 rounded-full bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-ink-400">
          v1.8.0
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button className="flex h-7 w-9 items-center justify-center rounded text-ink-400 transition hover:bg-white/5 hover:text-ink-100">
          <Minus size={14} />
        </button>
        <button className="flex h-7 w-9 items-center justify-center rounded text-ink-400 transition hover:bg-white/5 hover:text-ink-100">
          <Square size={11} />
        </button>
        <button className="flex h-7 w-9 items-center justify-center rounded text-ink-400 transition hover:bg-red-500/80 hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
