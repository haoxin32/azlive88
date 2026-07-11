import { Icon, type IconName } from './Icon'
import { CategoryImage } from './CategoryImage'
import type { ResponsiveImageAsset } from '@/config/assets'

export function GameCard({
  icon,
  name,
  description,
  image = null,
  accentBorderClass = 'border-border-subtle',
  accentGlowClass = '',
  accentGlowHoverClass = '',
}: {
  icon: IconName
  name: string
  description: string
  image?: ResponsiveImageAsset | null
  accentBorderClass?: string
  accentGlowClass?: string
  accentGlowHoverClass?: string
}) {
  return (
    <article
      className={`card-sweep group relative flex aspect-[4/5] h-auto min-w-[150px] flex-col justify-end overflow-hidden rounded-lg border
        shadow-card transition-transform duration-300 active:translate-y-0 active:scale-[0.98]
        lg:aspect-[3/4] lg:min-w-0 lg:max-w-[210px] lg:hover:-translate-y-1.5 lg:hover:scale-[1.015]
        ${accentBorderClass} ${accentGlowClass} ${accentGlowHoverClass}`}
    >
      {/* Image zone: full-bleed behind overlaid text at every breakpoint —
          dark gradient scrim keeps the text legible over the artwork. */}
      <div className="absolute inset-0">
        {image ? (
          <CategoryImage
            asset={image}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[650ms] lg:group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-surface to-surface-elevated" />
        )}

        <div
          aria-hidden="true"
          className={
            image
              ? 'absolute inset-0 bg-gradient-to-t from-slate-950 from-[15%] via-slate-950/70 via-[55%] to-slate-950/10 transition-opacity duration-300 lg:group-hover:opacity-90'
              : 'absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-90 transition-opacity duration-300 lg:group-hover:opacity-70'
          }
        />
        {!image && (
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl transition-transform
              duration-300 lg:group-hover:scale-125"
          />
        )}
        {!image && (
          <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400/15 text-cyan-300 lg:left-3 lg:top-3 lg:h-8 lg:w-8">
            <Icon name={icon} className="h-5 w-5 lg:h-4 lg:w-4" />
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-2 p-4 sm:p-5 lg:p-4">
        <h3
          className={`text-lg font-bold transition-transform duration-300 lg:text-base lg:group-hover:-translate-y-0.5 ${
            image ? 'text-white [text-shadow:0_1px_4px_rgb(0_0_0_/_0.8)]' : 'text-text-primary'
          }`}
        >
          {name}
        </h3>
        <p
          className={`line-clamp-1 text-xs transition-opacity duration-300 sm:text-sm ${
            image ? 'text-slate-200 opacity-90 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.8)] lg:group-hover:opacity-100' : 'text-text-secondary'
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  )
}
