import { useState } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { siteConfig } from '@/config/site'

export function SeoContentSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="brand-intro" aria-labelledby="brand-intro-heading" className="py-10 lg:py-20">
      <Container className="mx-auto max-w-3xl">
        <h2 id="brand-intro-heading" className="mb-4 text-2xl font-bold text-text-primary sm:mb-6 sm:text-3xl">
          {siteConfig.siteName} - nền tảng giải trí trực tuyến
        </h2>

        <div className={`flex flex-col gap-4 text-sm text-text-secondary sm:gap-5 sm:text-base ${expanded ? '' : 'line-clamp-[7] lg:line-clamp-none'}`}>
          <p>
            {siteConfig.siteName} là nền tảng giải trí và cược trực tuyến, cung cấp trải nghiệm đặt cược thể thao,
            xem và tham gia esports, casino trực tuyến với dealer trực tiếp, slot game, bắn cá và xổ số trong cùng
            một giao diện duy nhất.
          </p>

          <div>
            <h3 className="mb-1 text-base font-bold text-text-primary">Danh mục nào được cung cấp?</h3>
            <p>
              Nền tảng tổ chức nội dung theo sáu danh mục chính: thể thao, esports, casino live, slots, bắn cá và
              xổ số. Mỗi danh mục có mô tả riêng tại phần{' '}
              <a href="#game-ecosystem" className="text-cyan-300 hover:underline">
                Hệ sinh thái AZLIVE88
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-base font-bold text-text-primary">Truy cập bằng thiết bị nào?</h3>
            <p>
              Giao diện được xây dựng responsive, hoạt động trực tiếp trên trình duyệt máy tính, máy tính bảng và
              điện thoại di động mà không bắt buộc cài đặt ứng dụng.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-base font-bold text-text-primary">Hỗ trợ khách hàng ra sao?</h3>
            <p>
              Đội ngũ hỗ trợ tiếp nhận yêu cầu {siteConfig.contact.supportHours} qua email và Telegram được niêm
              yết tại footer trang.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-base font-bold text-text-primary">Chính sách bảo mật ở đâu?</h3>
            <p>
              Thông tin xử lý dữ liệu và trách nhiệm bảo mật được trình bày trong mục Bảo mật ở footer; phần xác
              thực và lưu trữ dữ liệu người dùng do hệ thống backend đảm nhiệm.
            </p>
          </div>
        </div>

        <Button variant="ghost" size="md" onClick={() => setExpanded((prev) => !prev)} className="mt-4 lg:hidden">
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </Button>
      </Container>
    </section>
  )
}
