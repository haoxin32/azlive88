/**
 * Technology & security standards applied across the platform.
 * Intentionally generic (no named third-party certification bodies or
 * game-provider brands) since no verified affiliation data is available.
 * Replace with real, verifiable partner/certification logos once confirmed.
 */
export interface TechStandard {
  icon: 'shield-check' | 'lock' | 'settings' | 'badge-check'
  label: string
}

export const techStandards: TechStandard[] = [
  { icon: 'lock', label: 'Mã hoá SSL 256-bit' },
  { icon: 'shield-check', label: 'Giám sát giao dịch liên tục' },
  { icon: 'settings', label: 'Hạ tầng vận hành 24/7' },
  { icon: 'badge-check', label: 'Quy trình xác minh tài khoản' },
]
