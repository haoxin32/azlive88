import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { techStandards } from '@/data/partners'

export function PartnersSection() {
  return (
    <section aria-label="Tiêu chuẩn công nghệ và bảo mật áp dụng" className="py-8 lg:py-10">
      <Container>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted lg:mb-6">
          Tiêu chuẩn công nghệ &amp; bảo mật áp dụng
        </p>
        <div className="relative max-h-40">
          {/* Edge fade hints at scrollability on mobile; desktop wraps/centers so no fade needed */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent lg:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent lg:hidden"
          />
          <ul className="snap-x-mandatory scrollbar-none flex gap-3 overflow-x-auto px-1 lg:flex-wrap lg:justify-center lg:gap-4 lg:overflow-visible lg:px-0">
            {techStandards.map((item) => (
              <li
                key={item.label}
                className="snap-center flex shrink-0 items-center gap-2 rounded-md border border-border-subtle bg-surface px-3.5 py-2.5 lg:px-4 lg:py-3"
              >
                <Icon name={item.icon} className="h-4 w-4 text-cyan-300" />
                <span className="whitespace-nowrap text-xs font-medium text-text-secondary sm:text-sm">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
