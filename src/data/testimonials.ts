/**
 * Placeholder testimonials for layout/demo purposes only.
 * Replace with real, consented customer reviews before launch —
 * do not present this placeholder data as genuine user statements in production.
 */
export interface Testimonial {
  name: string
  tier: string
  rating: number
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Người dùng A.',
    tier: 'Thành viên',
    rating: 5,
    quote: 'Giao diện dễ dùng, mục nạp và rút được trình bày rõ ràng, không mất nhiều thao tác để tìm mục cần thiết.',
  },
  {
    name: 'Người dùng B.',
    tier: 'Thành viên',
    rating: 5,
    quote: 'Danh mục trò chơi đa dạng, chuyển giữa các mục trên di động khá mượt và không bị giật.',
  },
  {
    name: 'Người dùng C.',
    tier: 'Thành viên',
    rating: 4,
    quote: 'Phần câu hỏi thường gặp trả lời đúng trọng tâm, không phải liên hệ hỗ trợ cho các thắc mắc cơ bản.',
  },
]
