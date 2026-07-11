import { useState } from 'react'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { Icon } from '../ui/Icon'
import { footerColumns } from '@/config/navigation'
import { siteConfig } from '@/config/site'

export function Footer() {
  const [openColumn, setOpenColumn] = useState<string | null>(null)
  const availableSocialLinks = siteConfig.socialLinks.filter(
    (social): social is { label: string; href: string; icon: typeof social.icon } => social.href !== null,
  )

  return (
    <footer id="site-footer" className="border-t border-border-subtle bg-bg-elevated pb-28 pt-10 lg:pb-14 lg:pt-14">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-3 lg:hidden">
          <Logo />
          <p className="max-w-sm text-sm text-text-secondary">{siteConfig.description}</p>
          {availableSocialLinks.length > 0 && (
            <ul className="flex items-center gap-3" aria-label="Mạng xã hội AZLIVE88">
              {availableSocialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-cyan-300"
                  >
                    <Icon name={social.icon} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-1 flex flex-col divide-y divide-border-subtle border-t border-border-subtle">
            {footerColumns.map((column) => {
              const isOpen = openColumn === column.title
              const panelId = `footer-panel-${column.title}`
              return (
                <div key={column.title}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenColumn(isOpen ? null : column.title)}
                    className="flex min-h-11 w-full items-center justify-between py-3 text-left text-sm font-bold uppercase tracking-wide text-text-primary"
                  >
                    {column.title}
                    <Icon
                      name="chevron-down"
                      className={`h-4 w-4 shrink-0 text-cyan-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <ul className="flex flex-col overflow-hidden pb-1">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-cyan-300"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="max-w-sm text-sm text-text-secondary">{siteConfig.description}</p>
            {availableSocialLinks.length > 0 && (
              <ul className="flex items-center gap-3" aria-label="Mạng xã hội AZLIVE88">
                {availableSocialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-cyan-300"
                    >
                      <Icon name={social.icon} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-text-primary">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          id="footer-policies"
          className="flex flex-col gap-4 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between lg:pt-6"
        >
          <div id="footer-contact" className="flex flex-col gap-1 text-sm text-text-secondary">
            <p>
              Hỗ trợ {siteConfig.contact.supportHours}
              {siteConfig.supportEmail && (
                <>
                  {' '}
                  ·{' '}
                  <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-cyan-300">
                    {siteConfig.supportEmail}
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="rounded-md border border-border-subtle px-2 py-1 font-bold text-amber-300">
              {siteConfig.legal.ageNotice}
            </span>
            <a href={siteConfig.legal.responsibleGamingUrl} className="hover:text-cyan-300">
              Chơi có trách nhiệm
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-text-muted">
          © {new Date().getFullYear()} {siteConfig.siteName}. Bảo lưu mọi quyền.
        </p>
      </Container>
    </footer>
  )
}
