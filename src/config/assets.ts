import { siteConfig } from './site.ts'

/**
 * Central asset manifest — the ONLY place that should be edited when real
 * image files are added. Components read from here and decide between a
 * real <picture> render and a neutral fallback; they should never need
 * code changes once a value here goes from `null` to a real asset.
 *
 * To add an asset:
 *   1. Copy the files into the matching public/images/<category>/ folder.
 *   2. Fill in the matching entry below (paths + real width/height/alt).
 * Nothing else needs to change.
 */

export interface ResponsiveImageAsset {
  avif: string
  webp: string
  /** Fallback <img> src for browsers without AVIF/WebP support. */
  fallback: string
  width: number
  height: number
  alt: string
}

export interface SimpleImageAsset {
  src: string
  width: number
  height: number
  alt: string
}

export interface CategoryAssets {
  sports: ResponsiveImageAsset | null
  esports: ResponsiveImageAsset | null
  casinoLive: ResponsiveImageAsset | null
  slots: ResponsiveImageAsset | null
  fishing: ResponsiveImageAsset | null
  lottery: ResponsiveImageAsset | null
}

export interface AssetManifest {
  /** LCP candidate on desktop viewports — never lazy-loaded once set. */
  heroDesktop: ResponsiveImageAsset | null
  /** LCP candidate on mobile viewports — never lazy-loaded once set. */
  heroMobile: ResponsiveImageAsset | null
  ogCover: SimpleImageAsset | null
  /** Brand logo raster (AVIF/WebP/PNG) — always visible above the fold, never lazy-loaded. */
  logo: ResponsiveImageAsset | null
  categories: CategoryAssets
  qrCode: SimpleImageAsset | null
}

export const assets: AssetManifest = {
  // Real assets supplied 2026-07-11. Native size 1672x941 (desktop) /
  // 1122x1402 (mobile) — both have a dark, text-safe zone baked into the
  // artwork (left side on desktop, bottom on mobile). See HeroSection.tsx.
  heroDesktop: {
    avif: '/images/hero/hero-desktop.avif',
    webp: '/images/hero/hero-desktop.webp',
    fallback: '/images/hero/hero-desktop.png',
    width: 1672,
    height: 941,
    alt: 'AZLIVE88 - biểu tượng thương hiệu cùng thể thao, esports, casino live, slots, bắn cá và xổ số',
  },
  heroMobile: {
    avif: '/images/hero/hero-mobile.avif',
    webp: '/images/hero/hero-mobile.webp',
    fallback: '/images/hero/hero-mobile-900.png',
    width: 780,
    height: 975,
    alt: 'AZLIVE88 - biểu tượng thương hiệu cùng thể thao, esports, casino live, slots, bắn cá và xổ số',
  },

  // Real asset — generated at public/images/og/azlive88-og-cover.jpg
  // (resized/recompressed from the supplied azlive88-og-cover.png; JPEG
  // used for og:image/twitter:image since WebP support in link-preview
  // crawlers is inconsistent). Path/dimensions sourced from siteConfig so
  // this manifest and the <meta> tags never drift apart.
  ogCover: {
    src: siteConfig.ogImageUrl,
    width: siteConfig.ogImageWidth,
    height: siteConfig.ogImageHeight,
    alt: siteConfig.ogImageAlt,
  },

  // Re-supplied 2026-07-11 with genuine alpha transparency (verified with
  // sharp: alpha channel ranges 0-255, not flat 255 like the earlier upload).
  // avif/webp regenerated from this corrected source; fallback uses the
  // source PNG directly (866x288, already reasonably sized for a header logo).
  logo: {
    avif: '/images/brand/azlive88-logo.avif',
    webp: '/images/brand/azlive88-logo.webp',
    fallback: '/images/brand/azlive88-logo.png',
    width: 866,
    height: 288,
    alt: 'AZLIVE88',
  },

  // Real photos supplied 2026-07-11 (originals: public/images/categories/
  // thethaoaz88.png etc.), resized to 640px-wide AVIF/WebP/JPEG via sharp.
  categories: {
    sports: {
      avif: '/images/categories/category-sports.avif',
      webp: '/images/categories/category-sports.webp',
      fallback: '/images/categories/category-sports.jpg',
      width: 640,
      height: 800,
      alt: 'Thể thao - cược thể thao trực tuyến AZLIVE88',
    },
    esports: {
      avif: '/images/categories/category-esports.avif',
      webp: '/images/categories/category-esports.webp',
      fallback: '/images/categories/category-esports.jpg',
      width: 640,
      height: 800,
      alt: 'Esports - thể thao điện tử AZLIVE88',
    },
    casinoLive: {
      avif: '/images/categories/category-casino-live.avif',
      webp: '/images/categories/category-casino-live.webp',
      fallback: '/images/categories/category-casino-live.jpg',
      width: 640,
      height: 800,
      alt: 'Casino Live - dealer trực tiếp AZLIVE88',
    },
    slots: {
      avif: '/images/categories/category-slots.avif',
      webp: '/images/categories/category-slots.webp',
      fallback: '/images/categories/category-slots.jpg',
      width: 640,
      height: 800,
      alt: 'Slots - slot game AZLIVE88',
    },
    fishing: {
      avif: '/images/categories/category-fishing.avif',
      webp: '/images/categories/category-fishing.webp',
      fallback: '/images/categories/category-fishing.jpg',
      width: 640,
      height: 800,
      alt: 'Bắn cá - game bắn cá AZLIVE88',
    },
    lottery: {
      avif: '/images/categories/category-lottery.avif',
      webp: '/images/categories/category-lottery.webp',
      fallback: '/images/categories/category-lottery.jpg',
      width: 640,
      height: 1001,
      alt: 'Xổ số - xổ số trực tuyến AZLIVE88',
    },
  },

  qrCode: null,
}
