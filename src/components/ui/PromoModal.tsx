import { useEffect, useRef } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { siteConfig } from '@/config/site'
import { trackRegisterClick, type CtaSource } from '@/lib/tracking'
import { generalPromoTerms, type Promotion } from '@/data/promotions'

export function PromoModal({
  promo,
  isOpen,
  onClose,
  trackingSource,
}: {
  promo: Promotion
  isOpen: boolean
  onClose: () => void
  trackingSource: CtaSource
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const titleId = `promo-title-${promo.id}`

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
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
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Đóng khuyến mãi"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated shadow-card-lg"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Đóng khuyến mãi"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 text-text-primary backdrop-blur-sm transition-colors hover:bg-slate-950/80"
        >
          <Icon name="x" className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto">
          <img src={promo.imageSrc} alt={promo.imageAlt} width={1280} height={480} className="w-full object-cover" />

          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <h1 id={titleId} className="text-balance text-xl font-bold text-text-primary sm:text-2xl">
              {promo.title}
            </h1>

            <dl className="flex flex-col gap-3 text-sm sm:text-base">
              {promo.details.map((detail, index) => (
                <div key={detail.label} className="flex flex-col gap-1">
                  <dt className="font-semibold text-cyan-300">
                    {index + 1}. {detail.label}
                  </dt>
                  <dd className="text-text-secondary">{detail.value}</dd>
                </div>
              ))}
            </dl>

            {promo.highlight && (
              <p className="rounded-md border border-amber-400/50 bg-amber-400/10 px-4 py-3 text-sm font-bold text-amber-300 sm:text-base">
                {promo.highlight}
              </p>
            )}

            <Button
              variant="primary"
              size="lg"
              shine
              href={siteConfig.registerUrl}
              className="w-full"
              onClick={() => trackRegisterClick(trackingSource, siteConfig.registerUrl)}
            >
              Đăng Ký
            </Button>

            <details className="rounded-md border border-border-subtle bg-surface">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary">
                Điều khoản chung
              </summary>
              <div className="flex flex-col gap-3 px-4 pb-4 text-xs text-text-secondary sm:text-sm">
                {generalPromoTerms.method.map((item) => (
                  <p key={item.label}>
                    <span className="font-semibold text-text-primary">{item.label}: </span>
                    {item.value}
                  </p>
                ))}
                <ul className="flex flex-col gap-2 pl-4">
                  {generalPromoTerms.notes.map((note) => (
                    <li key={note} className="list-disc">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
