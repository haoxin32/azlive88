export interface ServiceStandard {
  icon: 'monitor-smartphone' | 'lock' | 'badge-check' | 'headset' | 'zap' | 'shield-check'
  title: string
  description: string
}

/**
 * Describes AZLIVE88's own standards — deliberately does not compare
 * against named or unnamed competitors (no verifiable source for such
 * claims exists), and avoids unqualified superlatives ("tốt nhất",
 * "nhanh nhất", "tuyệt đối") per brand-claims policy.
 */
export const serviceStandards: ServiceStandard[] = [
  {
    icon: 'monitor-smartphone',
    title: 'Responsive đa thiết bị',
    description: 'Giao diện thích ứng trên máy tính, máy tính bảng và điện thoại di động.',
  },
  {
    icon: 'lock',
    title: 'Kết nối HTTPS',
    description: 'Toàn bộ kết nối được mã hoá qua HTTPS.',
  },
  {
    icon: 'badge-check',
    title: 'Chính sách rõ ràng',
    description: 'Điều khoản, chính sách bảo mật và liên hệ được niêm yết công khai tại footer.',
  },
  {
    icon: 'headset',
    title: 'Hỗ trợ người dùng',
    description: 'Kênh liên hệ hỗ trợ qua email và Telegram được công bố rõ ràng.',
  },
  {
    icon: 'zap',
    title: 'Giao diện tối ưu',
    description: 'Trang được tối ưu tốc độ tải và trải nghiệm thao tác.',
  },
  {
    icon: 'shield-check',
    title: 'Bảo vệ dữ liệu ở mức frontend',
    description: 'Không lưu trữ thông tin nhạy cảm phía trình duyệt; xác thực và bảo mật dữ liệu do backend đảm nhiệm.',
  },
]
