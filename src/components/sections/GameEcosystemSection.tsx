import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { GameCard } from '../ui/GameCard'
import { gameCategories, type GameCategory } from '@/data/games'
import { assets } from '@/config/assets'
import { useInView } from '@/lib/useInView'

/** One card + its own one-shot reveal-on-scroll, staggered by index. */
function GameCategoryItem({
  game,
  index,
  cardRefs,
}: {
  game: GameCategory
  index: number
  cardRefs: MutableRefObject<(HTMLLIElement | null)[]>
}) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.2 })

  return (
    <li
      ref={(el) => {
        cardRefs.current[index] = el
        ref.current = el
      }}
      style={inView ? { transitionDelay: `${index * 70}ms` } : undefined}
      className={`snap-center card-reveal ${inView ? 'card-reveal-visible' : ''}`}
    >
      <GameCard
        icon={game.icon}
        name={game.name}
        description={game.description}
        image={assets.categories[game.assetKey]}
        accentBorderClass={game.accentBorderClass}
        accentGlowClass={game.accentGlowClass}
        accentGlowHoverClass={game.accentGlowHoverClass}
      />
    </li>
  )
}

export function GameEcosystemSection() {
  const scrollRef = useRef<HTMLUListElement | null>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const mostVisible = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        const index = cardRefs.current.findIndex((el) => el === mostVisible.target)
        if (index >= 0) setActiveIndex(index)
      },
      { root, threshold: [0.5, 0.75, 1] },
    )

    cardRefs.current.forEach((card) => card && observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="game-ecosystem"
      aria-labelledby="game-ecosystem-heading"
      className="relative overflow-hidden py-14 lg:py-12"
    >
      {/* Very faint cyan/violet wash behind the card row — no heavy blur, just soft radial gradients. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_20%_65%,rgba(34,211,238,0.05),transparent_65%),radial-gradient(ellipse_50%_55%_at_85%_60%,rgba(168,85,247,0.045),transparent_65%)]"
      />

      <Container className="flex flex-col gap-8 lg:gap-4">
        <div id="game-ecosystem-heading" className="flex flex-col items-center gap-4">
          <SectionHeading
            eyebrow="Danh mục giải trí"
            title="Hệ sinh thái AZLIVE88"
            description="Sáu danh mục chính, cập nhật liên tục và tối ưu trải nghiệm trên mọi thiết bị."
          />
          <span
            aria-hidden="true"
            className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent shadow-[0_0_8px_1px_rgba(34,211,238,0.35)]"
          />
        </div>

        <ul
          ref={scrollRef}
          className="snap-x-mandatory scrollbar-none grid auto-cols-[64%] grid-flow-col gap-3.5 overflow-x-auto
            sm:auto-cols-[66%] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:gap-4 md:overflow-visible lg:grid-cols-6 lg:gap-3.5"
        >
          {gameCategories.map((game, index) => (
            <GameCategoryItem key={game.slug} game={game} index={index} cardRefs={cardRefs} />
          ))}
        </ul>

        <div className="flex justify-center gap-1.5 md:hidden" role="tablist" aria-label="Vị trí danh mục">
          {gameCategories.map((game, index) => (
            <span
              key={game.slug}
              role="presentation"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-cyan-300' : 'w-1.5 bg-border-strong'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
