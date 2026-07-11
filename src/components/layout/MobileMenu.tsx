import { useEffect, useRef, type RefObject } from 'react'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { primaryNav } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { trackLoginClick, trackRegisterClick } from '@/lib/tracking'

export function MobileMenu({
  isOpen,
  onClose,
  triggerRef,
}: {
  isOpen: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const triggerElement = triggerRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      triggerElement?.focus()
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
      <button
        type="button"
        aria-label="Đóng menu"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col gap-8 bg-bg-elevated p-6 shadow-card-lg"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Đóng menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-primary"
            onClick={onClose}
          >
            <Icon name="x" className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="Điều hướng di động">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center rounded-md px-2 text-base font-medium text-text-secondary transition-colors hover:bg-surface hover:text-cyan-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Button
            variant="secondary"
            size="lg"
            href={siteConfig.loginUrl}
            className="w-full"
            onClick={() => trackLoginClick('mobile_menu', siteConfig.loginUrl)}
          >
            Đăng nhập
          </Button>
          <Button
            variant="primary"
            size="lg"
            shine
            href={siteConfig.registerUrl}
            className="w-full"
            onClick={() => trackRegisterClick('mobile_menu', siteConfig.registerUrl)}
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  )
}
