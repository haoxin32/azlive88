import { Icon } from './Icon'
import { useCountUp } from '@/hooks/useCountUp'
import type { LiveStat } from '@/data/liveStats'

function formatStatValue(value: number, decimals: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function CountUpStat({ stat, className = '' }: { stat: LiveStat; className?: string }) {
  const decimals = stat.decimals ?? 0
  const { ref, value } = useCountUp<HTMLDivElement>(stat.value)

  return (
    <div ref={ref} className={`group relative isolate overflow-hidden transition-colors duration-300 ${stat.washClass} ${className}`}>
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[2px] ${stat.topBarClass}`} />

      <div className="relative flex h-9 w-9 items-center justify-center">
        <span
          aria-hidden="true"
          className={`absolute inset-0 scale-125 rounded-full blur-md animate-stat-glow ${stat.glowClass}`}
        />
        <Icon
          name={stat.icon}
          className={`relative h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${stat.iconClass}`}
        />
      </div>

      <span className={`max-w-full break-words text-lg font-extrabold tabular-nums text-white sm:whitespace-nowrap sm:text-2xl ${stat.numberGlowClass}`}>
        {formatStatValue(value, decimals)}
        {stat.suffix}
      </span>
      <span className="text-xs text-text-secondary">{stat.label}</span>
    </div>
  )
}
