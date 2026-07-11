import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { CountUpStat } from '../ui/CountUpStat'
import { liveStats } from '@/data/liveStats'

export function StatsSection() {
  return (
    <section aria-labelledby="stats-heading" className="py-10 lg:py-16">
      <Container className="flex flex-col gap-5 lg:gap-6">
        <div id="stats-heading">
          <SectionHeading eyebrow="Vận hành" title="Cam kết vận hành" />
        </div>

        {/* Mobile/small-tablet: 2-col grid, last stat spans full width */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {liveStats.map((stat, index) => (
            <CountUpStat
              key={stat.label}
              stat={stat}
              className={`flex flex-col items-center gap-1.5 rounded-lg border bg-slate-950/60 p-3 text-center transition-transform duration-300 active:scale-[0.98] ${
                stat.borderClass
              } ${index === liveStats.length - 1 ? 'col-span-2' : ''}`}
            />
          ))}
        </div>

        {/* Desktop: compact glass/neon stat strip */}
        <div
          className="relative hidden divide-x divide-cyan-400/15 overflow-hidden rounded-xl border border-cyan-400/25
            bg-gradient-to-b from-slate-950/90 to-slate-900/70 shadow-[0_0_40px_-10px_rgba(34,211,238,0.45)] lg:flex lg:items-stretch"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-stat-shimmer"
          />
          {liveStats.map((stat) => (
            <CountUpStat
              key={stat.label}
              stat={stat}
              className="flex flex-1 flex-col items-center gap-2 px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-0.5"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
