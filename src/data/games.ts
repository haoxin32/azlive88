import type { CategoryAssets } from '@/config/assets'

export interface GameCategory {
  slug: string
  /** Key into assets.ts categories manifest — null image falls back to icon+gradient. */
  assetKey: keyof CategoryAssets
  icon: 'trophy' | 'gamepad' | 'video' | 'gem' | 'fish' | 'ticket'
  name: string
  description: string
  /** Per-category neon accent — literal Tailwind classes so the JIT scanner picks them up. */
  accentBorderClass: string
  /** Subtle resting two-tone glow. */
  accentGlowClass: string
  /** Intensified two-tone glow, desktop-hover only. */
  accentGlowHoverClass: string
}

export const gameCategories: GameCategory[] = [
  {
    slug: 'the-thao',
    assetKey: 'sports',
    icon: 'trophy',
    name: 'Thể thao',
    description: 'Cược thể thao đa dạng bộ môn, tỷ lệ cập nhật liên tục.',
    accentBorderClass: 'border-emerald-400/40',
    accentGlowClass: 'shadow-[0_0_14px_-8px_rgba(34,211,238,0.28),0_0_20px_-10px_rgba(52,211,153,0.22)]',
    accentGlowHoverClass:
      'lg:hover:shadow-[0_0_22px_-6px_rgba(34,211,238,0.5),0_0_30px_-8px_rgba(52,211,153,0.4)]',
  },
  {
    slug: 'esports',
    assetKey: 'esports',
    icon: 'gamepad',
    name: 'Esports',
    description: 'Theo dõi và tham gia các giải đấu thể thao điện tử.',
    accentBorderClass: 'border-violet-400/40',
    accentGlowClass: 'shadow-[0_0_14px_-8px_rgba(167,139,250,0.28),0_0_20px_-10px_rgba(59,130,246,0.22)]',
    accentGlowHoverClass:
      'lg:hover:shadow-[0_0_22px_-6px_rgba(167,139,250,0.5),0_0_30px_-8px_rgba(59,130,246,0.4)]',
  },
  {
    slug: 'casino-live',
    assetKey: 'casinoLive',
    icon: 'video',
    name: 'Casino Live',
    description: 'Trải nghiệm dealer trực tiếp, tương tác thời gian thực.',
    accentBorderClass: 'border-rose-400/40',
    accentGlowClass: 'shadow-[0_0_14px_-8px_rgba(248,113,113,0.28),0_0_20px_-10px_rgba(244,114,182,0.22)]',
    accentGlowHoverClass:
      'lg:hover:shadow-[0_0_22px_-6px_rgba(248,113,113,0.5),0_0_30px_-8px_rgba(244,114,182,0.4)]',
  },
  {
    slug: 'slots',
    assetKey: 'slots',
    icon: 'gem',
    name: 'Slots',
    description: 'Kho slot game đa chủ đề với vòng quay hấp dẫn.',
    accentBorderClass: 'border-amber-400/40',
    accentGlowClass: 'shadow-[0_0_14px_-8px_rgba(251,191,36,0.28),0_0_20px_-10px_rgba(251,146,60,0.22)]',
    accentGlowHoverClass:
      'lg:hover:shadow-[0_0_22px_-6px_rgba(251,191,36,0.5),0_0_30px_-8px_rgba(251,146,60,0.4)]',
  },
  {
    slug: 'ban-ca',
    assetKey: 'fishing',
    icon: 'fish',
    name: 'Bắn cá',
    description: 'Bắn cá giải trí, đồ hoạ sinh động, thao tác đơn giản.',
    accentBorderClass: 'border-sky-400/40',
    accentGlowClass: 'shadow-[0_0_14px_-8px_rgba(56,189,248,0.28),0_0_20px_-10px_rgba(59,130,246,0.22)]',
    accentGlowHoverClass:
      'lg:hover:shadow-[0_0_22px_-6px_rgba(56,189,248,0.5),0_0_30px_-8px_rgba(59,130,246,0.4)]',
  },
  {
    slug: 'xo-so',
    assetKey: 'lottery',
    icon: 'ticket',
    name: 'Xổ số',
    description: 'Xổ số nhiều loại hình, đối chiếu kết quả minh bạch.',
    accentBorderClass: 'border-fuchsia-400/40',
    accentGlowClass: 'shadow-[0_0_14px_-8px_rgba(232,121,249,0.28),0_0_20px_-10px_rgba(251,191,36,0.22)]',
    accentGlowHoverClass:
      'lg:hover:shadow-[0_0_22px_-6px_rgba(232,121,249,0.5),0_0_30px_-8px_rgba(251,191,36,0.4)]',
  },
]
