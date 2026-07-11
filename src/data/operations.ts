/**
 * Qualitative operational commitments — intentionally has no member counts,
 * uptime percentages, or transaction volumes: none of that is verified/
 * measurable from the frontend, and production must not present invented
 * numbers as real metrics. Replace with a real, sourced stats feed only
 * once verified figures exist.
 */
export interface OperationalItem {
  icon: 'users' | 'activity' | 'trending-up' | 'clock' | 'shield-check' | 'headset'
  title: string
  description: string
}

export const operationalItems: OperationalItem[] = [
  { icon: 'users', title: 'Cộng đồng đang phát triển', description: 'Số lượng thành viên tăng trưởng theo thời gian.' },
  { icon: 'activity', title: 'Vận hành liên tục', description: 'Hệ thống được giám sát và duy trì hoạt động 24/7.' },
  { icon: 'trending-up', title: 'Cập nhật thường xuyên', description: 'Nội dung và khuyến mãi được làm mới định kỳ.' },
  { icon: 'clock', title: 'Theo dõi thời gian hoạt động', description: 'Uptime hệ thống được giám sát để giảm gián đoạn.' },
  { icon: 'shield-check', title: 'Giám sát bảo mật', description: 'Hoạt động bất thường được theo dõi để bảo vệ tài khoản.' },
]

/**
 * Curated 4-item subset for the mobile compact layout only (desktop keeps
 * the full 5-item `operationalItems` grid unchanged). Drops the item that
 * overlaps semantically with "Theo dõi thời gian hoạt động" and adds
 * "Hỗ trợ người dùng" per the mobile redesign brief — still qualitative,
 * no invented metrics.
 */
export const operationalItemsMobile: OperationalItem[] = [
  { icon: 'activity', title: 'Vận hành liên tục', description: 'Hệ thống được giám sát, duy trì hoạt động 24/7.' },
  { icon: 'shield-check', title: 'Giám sát bảo mật', description: 'Hoạt động bất thường được theo dõi liên tục.' },
  { icon: 'trending-up', title: 'Cập nhật thường xuyên', description: 'Nội dung, khuyến mãi làm mới định kỳ.' },
  { icon: 'headset', title: 'Hỗ trợ người dùng', description: 'Đội ngũ hỗ trợ đồng hành cùng thành viên.' },
]
