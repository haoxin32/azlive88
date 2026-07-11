import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { MobileMenu } from './MobileMenu'
import { primaryNav } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { trackLoginClick, trackRegisterClick } from '@/lib/tracking'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setIsScrolled(!entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'border-b border-border-subtle bg-bg/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <Container className="flex h-14 items-center justify-between gap-4 sm:h-16 lg:h-20">
          <a href="#top" aria-label={`${siteConfig.siteName} - về đầu trang`}>
            <Logo />
          </a>

          <nav aria-label="Điều hướng chính" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-text-secondary transition-colors hover:text-cyan-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="secondary"
              size="md"
              href={siteConfig.loginUrl}
              onClick={() => trackLoginClick('header', siteConfig.loginUrl)}
            >
              Đăng nhập
            </Button>
            <Button
              variant="primary"
              size="md"
              shine
              href={siteConfig.registerUrl}
              onClick={() => trackRegisterClick('header', siteConfig.registerUrl)}
            >
              Đăng ký
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-primary lg:hidden"
            aria-label="Mở menu điều hướng"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </Container>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} triggerRef={menuButtonRef} />
    </>
  )
}
