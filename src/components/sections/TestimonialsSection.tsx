import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import { testimonials } from '@/data/testimonials'

function Rating({ value }: { value: number }) {
  return (
    <div role="img" aria-label={`Đánh giá ${value} trên 5 sao`} className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star"
          aria-hidden
          className={`h-4 w-4 ${index < value ? 'text-amber-300' : 'text-border-strong'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-14 lg:py-20">
      <Container className="flex flex-col gap-8">
        <div id="testimonials-heading">
          <SectionHeading eyebrow="Phản hồi" title="Khách hàng nói gì về AZLIVE88" />
        </div>

        <ul className="snap-x-mandatory scrollbar-none grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto sm:auto-cols-[60%] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="snap-center flex flex-col gap-4 rounded-md border border-border-subtle bg-surface p-5 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 text-sm font-bold text-text-primary"
                >
                  {testimonial.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">{testimonial.name}</p>
                  <p className="text-xs text-text-secondary">{testimonial.tier}</p>
                </div>
              </div>
              <Rating value={testimonial.rating} />
              <p className="text-sm text-text-secondary">{testimonial.quote}</p>
            </li>
          ))}
        </ul>

        <p className="text-center text-xs text-text-muted">
          * Ý kiến minh hoạ cho mục đích trình bày giao diện, sẽ được thay bằng đánh giá thực tế từ người dùng đã xác
          minh.
        </p>
      </Container>
    </section>
  )
}
