import { Icon, type IconName } from '../ui/Icon'

const orbitBadges: { icon: IconName; className: string; delayClassName: string }[] = [
  { icon: 'trophy', className: 'left-[6%] top-[12%]', delayClassName: '[animation-delay:0s]' },
  { icon: 'gem', className: 'right-[4%] top-[8%]', delayClassName: '[animation-delay:0.6s]' },
  { icon: 'fish', className: 'left-[2%] bottom-[18%]', delayClassName: '[animation-delay:1.2s]' },
  { icon: 'ticket', className: 'right-[8%] bottom-[10%]', delayClassName: '[animation-delay:1.8s]' },
]

/**
 * Purely decorative hero visual, built from SVG/CSS (no raster screenshot).
 * aria-hidden — the real hero content is the H1/description/CTAs beside it.
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px]">
      <div className="bg-grid absolute inset-0 rounded-full opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)]" />

      <div className="absolute inset-[8%] rounded-full border border-cyan-400/20" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-purple-400/25" />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-3xl sm:h-56 sm:w-56"
      />

      <div className="animate-logo-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 100 100" className="h-40 w-40 sm:h-52 sm:w-52">
          <defs>
            <linearGradient id="hero-logo-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="55%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L92 27 V73 L50 96 L8 73 V27 Z"
            fill="rgba(10,18,38,0.6)"
            stroke="url(#hero-logo-gradient)"
            strokeWidth="3"
          />
          <path
            d="M36 64 L50 30 L64 64 M41 52 H59"
            fill="none"
            stroke="url(#hero-logo-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {orbitBadges.map((badge) => (
        <div
          key={badge.icon}
          className={`animate-float-slow absolute flex h-14 w-14 items-center justify-center rounded-lg border border-border-strong bg-surface/90 shadow-card sm:h-16 sm:w-16 ${badge.className} ${badge.delayClassName}`}
        >
          <Icon name={badge.icon} className="h-6 w-6 text-cyan-300 sm:h-7 sm:w-7" />
        </div>
      ))}
    </div>
  )
}
