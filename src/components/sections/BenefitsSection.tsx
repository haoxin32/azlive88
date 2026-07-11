import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { FeatureCard } from '../ui/FeatureCard'
import { Icon } from '../ui/Icon'
import { benefits, benefitsMobile } from '@/data/benefits'

export function BenefitsSection() {
  return (
    <section id="why-choose-us" aria-labelledby="why-choose-us-heading" className="py-10 lg:py-20">
      <Container className="flex flex-col gap-5 lg:gap-8">
        <div id="why-choose-us-heading">
          <SectionHeading
            eyebrow="Lý do lựa chọn"
            title={`Vì sao chọn AZLIVE88`}
            description="Những giá trị cốt lõi giúp AZLIVE88 giữ trải nghiệm ổn định và đáng tin cậy."
          />
        </div>

        {/* Mobile/small-tablet: interleaved list, distinct from the Operations card grid above */}
        <ul className="flex flex-col divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface/50 lg:hidden">
          {benefitsMobile.map((benefit) => (
            <li key={benefit.title} className="flex items-center gap-3 px-4 py-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-300">
                <Icon name={benefit.icon} className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-text-primary">{benefit.title}</h3>
                <p className="truncate text-xs text-text-secondary">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop: unchanged original 5-item grid */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
          {benefits.map((benefit) => (
            <FeatureCard key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </Container>
    </section>
  )
}
