import type { ResponsiveImageAsset } from '@/config/assets'

/**
 * LCP hero image. Desktop and mobile are art-directed via `<source media>`
 * — never lazy-loaded, always `fetchpriority="high"`.
 *
 * Full-bleed usage: the caller (HeroSection) wraps this in a container with
 * an explicit responsive `aspect-[w/h]` matching each breakpoint's own
 * image ratio, and this component's `<img>` fills it via `object-cover`
 * (className passed in) — so the CLS-safe reserved space comes from the
 * container's CSS aspect-ratio, not from this img's width/height attributes
 * (those still matter as an early intrinsic-size hint before CSS parses).
 */
export function HeroImage({
  desktop,
  mobile,
  className = '',
}: {
  desktop: ResponsiveImageAsset
  mobile: ResponsiveImageAsset | null
  className?: string
}) {
  const mobileSource = mobile ?? desktop

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSource.avif} type="image/avif" />
      <source media="(max-width: 767px)" srcSet={mobileSource.webp} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={desktop.avif} type="image/avif" />
      <source media="(min-width: 768px)" srcSet={desktop.webp} type="image/webp" />
      <img
        src={desktop.fallback}
        width={desktop.width}
        height={desktop.height}
        alt={desktop.alt}
        fetchPriority="high"
        decoding="async"
        sizes="100vw"
        className={className}
      />
    </picture>
  )
}
