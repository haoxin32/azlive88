import type { ResponsiveImageAsset } from '@/config/assets'

/**
 * Renders a real category photo (AVIF -> WebP -> fallback) when an asset is
 * provided. Always below-the-fold content, so always lazy/async — never
 * used for the hero LCP image (see HeroImage for that).
 */
export function CategoryImage({ asset, className = '' }: { asset: ResponsiveImageAsset; className?: string }) {
  return (
    <picture>
      <source srcSet={asset.avif} type="image/avif" />
      <source srcSet={asset.webp} type="image/webp" />
      <img
        src={asset.fallback}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
