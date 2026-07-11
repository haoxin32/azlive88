export interface TrustItem {
  icon: 'shield' | 'zap' | 'headset' | 'cpu'
  title: string
  description: string
}

export const trustItems: TrustItem[] = [
  { icon: 'shield', title: 'Bảo mật tuyệt đối', description: 'Mã hoá SSL 256-bit' },
  { icon: 'zap', title: 'Giao dịch siêu tốc', description: 'Xử lý nạp/rút nhanh chóng' },
  { icon: 'headset', title: 'Hỗ trợ 24/7', description: 'Đội ngũ trực tuyến mọi lúc' },
  { icon: 'cpu', title: 'Công nghệ hiện đại', description: 'Hạ tầng vận hành ổn định' },
]
