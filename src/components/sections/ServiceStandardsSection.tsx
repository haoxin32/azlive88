import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { FeatureCard } from '../ui/FeatureCard'
import { Icon } from '../ui/Icon'
import { serviceStandards } from '@/data/service-standards'

export function ServiceStandardsSection() {
  return (
    <section id="service-standards" aria-labelledby="service-standards-heading" className="py-10 lg:py-20">
      <Container className="flex flex-col gap-5 lg:gap-8">
        <div id="service-standards-heading">
          <SectionHeading
            eyebrow="Cam kết dịch vụ"
            title="Tiêu chuẩn dịch vụ AZLIVE88"
            description="Những tiêu chuẩn nền tảng áp dụng cho toàn bộ trải nghiệm, không so sánh với bên thứ ba."
          />
        </div>

        {/* Mobile/small-tablet: single glass checklist panel, not a card grid */}
        <div className="rounded-lg border border-cyan-400/20 bg-gradient-to-b from-cyan-400/[0.05] to-transparent lg:hidden">
          <ul className="divide-y divide-border-subtle">
            {serviceStandards.map((item) => (
              <li key={item.title} className="flex items-center gap-3 px-4 py-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                  <Icon name="check-circle" className="h-3.5 w-3.5" />
                </span>
                <span className="truncate text-sm font-medium text-text-primary">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: unchanged original card grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          {serviceStandards.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </Container>
    </section>
  )
}
