import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { trustItems } from '@/data/trust'

export function TrustSection() {
  return (
    <section aria-label="Cam kết nền tảng" className="border-y border-border-subtle bg-surface/40 py-6 lg:py-8">
      <Container>
        {/* Mobile/small-tablet: compact glass panel, 2x2 grid */}
        <div className="rounded-lg border border-cyan-400/20 bg-gradient-to-b from-cyan-400/[0.06] to-transparent p-3.5 lg:hidden">
          <ul className="grid grid-cols-2 gap-3">
            {trustItems.map((item) => (
              <li key={item.title} className="flex items-center gap-2.5 text-left">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                  <Icon name={item.icon} className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-text-primary">{item.title}</p>
                  <p className="truncate text-[10px] text-text-secondary">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: unchanged original layout */}
        <ul className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {trustItems.map((item) => (
            <li key={item.title} className="flex flex-row items-center gap-2 text-left">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-text-primary">{item.title}</p>
                <p className="text-xs text-text-secondary">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
