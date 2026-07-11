import { assets } from '@/config/assets'

/**
 * Hand-authored SVG mark — rendered only when no real logo asset is
 * configured (`assets.logo === null`), or via `forceSvg` as a manual
 * escape hatch. The earlier-supplied logo PNG lacked real alpha
 * transparency; the 2026-07-11 re-upload fixed it, so real asset is now
 * used everywhere by default (see assets.ts).
 */
function SvgLogoMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path d="M20 2 L36 11 V29 L20 38 L4 29 V11 Z" fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5" />
        <path
          d="M14 26 L20 12 L26 26 M16.5 20.5 H23.5"
          fill="none"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-wide text-text-primary sm:text-xl">
        AZLIVE<span className="text-cyan-300">88</span>
      </span>
    </span>
  )
}

/**
 * Brand logo. Renders the real AVIF/WebP/PNG asset from assets.ts when
 * present (icon + "AZLIVE88" wordmark are baked into the artwork), always
 * eager-loaded since every usage site (header, mobile menu, footer) is
 * either above-the-fold or revealed instantly on open.
 *
 * `forceSvg` renders the hand-authored SVG mark instead, regardless of
 * asset availability — kept as a manual escape hatch, not used by default
 * anywhere now that the real logo asset has genuine alpha transparency.
 */
export function Logo({ className = '', forceSvg = false }: { className?: string; forceSvg?: boolean }) {
  const logo = assets.logo

  if (forceSvg || !logo) {
    return <SvgLogoMark className={className} />
  }

  return (
    <picture>
      <source srcSet={logo.avif} type="image/avif" />
      <source srcSet={logo.webp} type="image/webp" />
      <img
        src={logo.fallback}
        width={logo.width}
        height={logo.height}
        alt={logo.alt}
        decoding="async"
        className={`h-8 w-auto object-contain sm:h-9 lg:h-10 ${className}`}
      />
    </picture>
  )
}
