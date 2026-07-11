import type { IconName } from '@/components/ui/Icon'

export interface LiveStat {
  icon: IconName
  value: number
  /** Decimal places to animate/display (e.g. 1 for "99.9%"). */
  decimals?: number
  /** Appended after the formatted number, e.g. 'đ' or '%'. */
  suffix?: string
  label: string
  /** Icon color. */
  iconClass: string
  /** Blurred glow blob behind the icon. */
  glowClass: string
  /** Text-shadow glow on the number, matching the stat's accent hue. */
  numberGlowClass: string
  /** Accent-colored top border strip for this column/card. */
  topBarClass: string
  /** Subtle per-column background tint. */
  washClass: string
  /** Card border color (mobile grid). */
  borderClass: string
}

export const liveStats: LiveStat[] = [
  {
    icon: 'users',
    value: 1286789,
    label: 'Thành viên',
    iconClass: 'text-cyan-300',
    glowClass: 'bg-cyan-400/50',
    numberGlowClass: '[text-shadow:0_0_18px_rgba(34,211,238,0.55)]',
    topBarClass: 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent',
    washClass: 'bg-cyan-400/[0.04]',
    borderClass: 'border-cyan-400/30',
  },
  {
    icon: 'activity',
    value: 32456,
    label: 'Đang trực tuyến',
    iconClass: 'text-cyan-300',
    glowClass: 'bg-cyan-400/50',
    numberGlowClass: '[text-shadow:0_0_18px_rgba(34,211,238,0.55)]',
    topBarClass: 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent',
    washClass: 'bg-cyan-400/[0.04]',
    borderClass: 'border-cyan-400/30',
  },
  {
    icon: 'wallet',
    value: 128456789000,
    suffix: 'đ',
    label: 'Tổng cược hôm nay',
    iconClass: 'text-amber-300',
    glowClass: 'bg-amber-400/50',
    numberGlowClass: '[text-shadow:0_0_18px_rgba(251,191,36,0.5)]',
    topBarClass: 'bg-gradient-to-r from-transparent via-amber-400 to-transparent',
    washClass: 'bg-amber-400/[0.04]',
    borderClass: 'border-amber-400/30',
  },
  {
    icon: 'trophy',
    value: 15678901000,
    suffix: 'đ',
    label: 'Thắng lớn hôm nay',
    iconClass: 'text-amber-300',
    glowClass: 'bg-amber-400/50',
    numberGlowClass: '[text-shadow:0_0_18px_rgba(251,191,36,0.5)]',
    topBarClass: 'bg-gradient-to-r from-transparent via-amber-400 to-transparent',
    washClass: 'bg-amber-400/[0.04]',
    borderClass: 'border-amber-400/30',
  },
  {
    icon: 'shield-check',
    value: 99.9,
    decimals: 1,
    suffix: '%',
    label: 'Uptime hệ thống',
    iconClass: 'text-purple-300',
    glowClass: 'bg-purple-400/50',
    numberGlowClass: '[text-shadow:0_0_18px_rgba(192,132,252,0.55)]',
    topBarClass: 'bg-gradient-to-r from-transparent via-purple-400 to-transparent',
    washClass: 'bg-purple-400/[0.04]',
    borderClass: 'border-purple-400/30',
  },
]
