import { siteConfig } from './site'

export interface NavItem {
  label: string
  href: string
}

const allPrimaryNav: NavItem[] = [
  { label: 'Hệ sinh thái', href: '#game-ecosystem' },
  { label: 'Vì sao chọn AZLIVE88', href: '#why-choose-us' },
  { label: 'Tiêu chuẩn dịch vụ', href: '#service-standards' },
  { label: 'Đánh giá', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Ứng dụng', href: '#payment-app' },
]

// Never link to a section that isn't rendered — testimonials nav item is
// dropped whenever siteConfig.features.showTestimonials is false.
export const primaryNav: NavItem[] = siteConfig.features.showTestimonials
  ? allPrimaryNav
  : allPrimaryNav.filter((item) => item.href !== '#testimonials')

export interface FooterColumn {
  title: string
  links: NavItem[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Thể thao', href: '#game-ecosystem' },
      { label: 'Esports', href: '#game-ecosystem' },
      { label: 'Casino Live', href: '#game-ecosystem' },
      { label: 'Slots', href: '#game-ecosystem' },
      { label: 'Bắn cá', href: '#game-ecosystem' },
      { label: 'Xổ số', href: '#game-ecosystem' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Trung tâm trợ giúp', href: '#faq' },
      { label: 'Hướng dẫn nạp/rút', href: '#payment-app' },
      { label: 'Điều khoản sử dụng', href: '#footer-policies' },
      { label: 'Chính sách bảo mật', href: '#footer-policies' },
    ],
  },
  {
    title: 'Thông tin',
    links: [
      { label: 'Về AZLIVE88', href: '#brand-intro' },
      { label: 'Tin tức', href: '#faq' },
      { label: 'Khuyến mãi', href: '#game-ecosystem' },
      { label: 'Liên hệ', href: '#footer-contact' },
    ],
  },
]
