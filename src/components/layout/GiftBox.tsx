import { useState } from 'react'
import { Icon } from '../ui/Icon'
import { PromoModal } from '../ui/PromoModal'
import { promotions } from '@/data/promotions'
import { trackPromoOpen } from '@/lib/tracking'

const promo = promotions.find((item) => item.id === 'fishing-daily')!

export function GiftBox() {
  const [dismissed, setDismissed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
  }

  return (
    <>
      <div className="fixed right-3 top-[42%] z-40 flex -translate-y-1/2 flex-col items-center gap-1.5 sm:right-5">
        <button
          type="button"
          aria-label="Đóng khuyến mãi"
          onClick={handleDismiss}
          className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-text-secondary shadow-card ring-1 ring-border-subtle transition-colors hover:text-text-primary"
        >
          <Icon name="x" className="h-3 w-3" />
        </button>

        <div className="relative">
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <button
            type="button"
            onClick={() => {
              trackPromoOpen('gift_box', promo.id)
              setIsOpen(true)
            }}
            aria-label="Mở khuyến mãi đặc quyền"
            className="animate-float-slow glow-accent relative flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-accent to-amber-600 transition-transform hover:scale-105"
          >
            <Icon name="gift" className="h-7 w-7 text-slate-950" />
          </button>
        </div>

        <span className="whitespace-nowrap rounded-full border border-border-subtle bg-slate-950/80 px-2.5 py-1 text-[10px] font-semibold text-amber-200 backdrop-blur-sm">
          Ưu đãi
        </span>
      </div>

      <PromoModal promo={promo} isOpen={isOpen} onClose={() => setIsOpen(false)} trackingSource="gift_box" />
    </>
  )
}
