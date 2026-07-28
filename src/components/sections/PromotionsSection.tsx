import { useState } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import { PromoModal } from '../ui/PromoModal'
import { promotions } from '@/data/promotions'

const cardPromotions = promotions.filter((item) => item.id !== 'fishing-daily')

export function PromotionsSection() {
  const [openPromoId, setOpenPromoId] = useState<string | null>(null)
  const openPromo = cardPromotions.find((item) => item.id === openPromoId) ?? null

  return (
    <section aria-labelledby="promotions-heading" className="py-10 lg:py-14">
      <Container className="flex flex-col gap-6 lg:gap-8">
        <div id="promotions-heading">
          <SectionHeading
            eyebrow="Ưu đãi hội viên"
            title="Khuyến mãi đang diễn ra"
            description="Chọn khuyến mãi phù hợp với sảnh chơi bạn yêu thích, xem chi tiết điều kiện trước khi tham gia."
          />
        </div>

        <ul
          className="snap-x-mandatory scrollbar-none grid auto-cols-[78%] grid-flow-col gap-3.5 overflow-x-auto
            sm:auto-cols-[52%] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:gap-5 md:overflow-visible"
        >
          {cardPromotions.map((promo) => (
            <li key={promo.id} className="snap-center">
              <button
                type="button"
                onClick={() => setOpenPromoId(promo.id)}
                className="card-sweep group flex w-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-slate-950 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:border-amber-400/40 active:translate-y-0 active:scale-[0.98]"
              >
                <div className="relative aspect-[2.4/1] w-full overflow-hidden bg-slate-950">
                  <img
                    src={promo.imageSrc}
                    alt={promo.imageAlt}
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-[650ms] group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-slate-950">
                    <Icon name={promo.pillIcon} className="h-3.5 w-3.5" />
                    Ưu đãi
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <span className="text-balance text-left text-sm font-bold leading-snug text-text-primary sm:text-base">
                    {promo.pillLabel}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-cyan-300 transition-transform group-hover:translate-x-0.5">
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      {openPromo && (
        <PromoModal
          promo={openPromo}
          isOpen={!!openPromo}
          onClose={() => setOpenPromoId(null)}
          trackingSource="promotions_section"
        />
      )}
    </section>
  )
}
