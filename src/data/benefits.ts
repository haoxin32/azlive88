export interface Benefit {
  icon: 'award' | 'shield-check' | 'zap' | 'headset' | 'monitor-smartphone'
  title: string
  description: string
}

export const benefits: Benefit[] = [
  {
    icon: 'award',
    title: 'Uy tín thương hiệu',
    description: 'Vận hành minh bạch với quy trình rõ ràng cho từng giao dịch.',
  },
  {
    icon: 'shield-check',
    title: 'Bảo mật',
    description: 'Dữ liệu người dùng được mã hoá và giám sát liên tục.',
  },
  {
    icon: 'zap',
    title: 'Giao dịch nhanh',
    description: 'Hệ thống nạp, rút được tối ưu để giảm thời gian chờ.',
  },
  {
    icon: 'headset',
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ mọi thời điểm.',
  },
  {
    icon: 'monitor-smartphone',
    title: 'Trải nghiệm đa thiết bị',
    description: 'Giao diện responsive, dùng mượt trên máy tính lẫn di động.',
  },
]

/**
 * Mobile-only 4-item subset (desktop keeps the full 5-item `benefits`
 * grid unchanged). Drops "Hỗ trợ 24/7" since Trust section already covers
 * it on mobile — avoids showing the same claim twice on a short page.
 */
export const benefitsMobile: Benefit[] = benefits.filter((b) => b.title !== 'Hỗ trợ 24/7')
