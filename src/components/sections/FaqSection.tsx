import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Accordion } from '../ui/Accordion'
import { faqItems } from '@/data/faq'

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-10 lg:py-20">
      <Container className="mx-auto flex max-w-3xl flex-col gap-5 lg:gap-8">
        <div id="faq-heading">
          <SectionHeading eyebrow="Giải đáp" title="Câu hỏi thường gặp" />
        </div>

        <Accordion items={faqItems} />
      </Container>
    </section>
  )
}
