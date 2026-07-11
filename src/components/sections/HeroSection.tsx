import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Container } from '../ui/Container'
import { HeroImage } from '../ui/HeroImage'
import { HeroVisual } from './HeroVisual'
import { siteConfig } from '@/config/site'
import { assets } from '@/config/assets'
import { trustItems } from '@/data/trust'
import { trackLoginClick, trackRegisterClick } from '@/lib/tracking'

export function HeroSection() {
  const heroTrustPoints = trustItems.slice(0, 3)

  // Real hero artwork has a dark, text-safe zone baked in (left on desktop,
  // bottom on mobile) — full-bleed image with H1/description/CTA overlaid
  // directly on top, per the supplied PC/mobile mockups.
  if (assets.heroDesktop) {
    const heroDesktop = assets.heroDesktop

    return (
      <section id="top" aria-label="Giới thiệu AZLIVE88" className="relative overflow-hidden bg-bg">
        <div className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[1672/941] md:max-h-[760px]">
          <HeroImage
            desktop={heroDesktop}
            mobile={assets.heroMobile}
            className="absolute inset-0 h-full w-full object-cover object-top md:object-right"
          />

          {/* Extra legibility scrim layered on top of the artwork's own dark zone */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent md:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-slate-950/95 via-slate-950/45 to-transparent md:block"
          />
        </div>

        {/*
          Mobile: normal document flow, pulled up with a negative margin so it
          blends into the image's dark bottom zone — height is content-driven
          (never clipped/fixed), so long content can never overlap the artwork
          above it. Desktop: switches to an absolute overlay across the left
          dark zone reserved in hero-desktop.png (confirmed to fit there).
        */}
        <div
          className="relative z-10 -mt-[9vw] flex flex-col items-start gap-2.5 px-5 pb-6 pt-1 sm:px-6
            md:absolute md:inset-y-0 md:left-0 md:mt-0 md:w-[48%] md:justify-center md:gap-4 md:p-10 md:pb-10
            lg:w-[45%] lg:py-14 lg:pr-14 lg:pl-[100px]"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300 sm:text-xs">
            {siteConfig.siteName} · Nền tảng giải trí &amp; cược trực tuyến
          </span>

          <h1 className="min-h-[2lh] text-balance text-[clamp(2.25rem,8vw,3rem)] font-extrabold leading-[1.1] text-white [text-shadow:0_2px_10px_rgb(0_0_0_/_0.5)] md:text-4xl lg:text-6xl">
            Khẳng định{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              đẳng cấp giải trí
            </span>
          </h1>

          <p className="max-w-md text-[15px] leading-snug text-slate-200 [text-shadow:0_1px_4px_rgb(0_0_0_/_0.6)] sm:text-base lg:text-lg">
            {siteConfig.siteName} quy tụ thể thao, esports, casino live, slots, bắn cá và xổ số trong một trải
            nghiệm bảo mật, ổn định và mượt mà trên mọi thiết bị.
          </p>

          <div className="flex w-full flex-col gap-2.5 min-[360px]:flex-row md:w-auto md:gap-3">
            <Button
              variant="primary"
              size="lg"
              shine
              href={siteConfig.registerUrl}
              className="w-full sm:w-auto"
              onClick={() => trackRegisterClick('hero', siteConfig.registerUrl)}
            >
              Đăng ký ngay
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={siteConfig.loginUrl}
              className="w-full sm:w-auto"
              onClick={() => trackLoginClick('hero', siteConfig.loginUrl)}
            >
              Đăng nhập
            </Button>
          </div>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {heroTrustPoints.map((item) => (
              <li
                key={item.title}
                className="flex items-center gap-1.5 text-xs text-slate-200 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)]"
              >
                <Icon name={item.icon} className="h-3.5 w-3.5 text-cyan-300" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section id="top" aria-label="Giới thiệu AZLIVE88" className="relative overflow-hidden pb-14 pt-10 sm:pt-16 lg:pb-24 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_65%)]"
      />

      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-center gap-5 text-center lg:order-1 lg:items-start lg:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {siteConfig.siteName} · Nền tảng giải trí &amp; cược trực tuyến
          </span>

          <h1 className="min-h-[2lh] text-balance text-4xl font-extrabold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
            Khẳng định <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">đẳng cấp giải trí</span>
          </h1>

          <p className="max-w-xl text-sm text-text-secondary sm:text-base lg:text-lg">
            {siteConfig.siteName} quy tụ thể thao, esports, casino live, slots, bắn cá và xổ số trong một trải nghiệm
            bảo mật, ổn định và mượt mà trên mọi thiết bị.
          </p>

          <div className="flex w-full flex-col gap-3 min-[380px]:flex-row sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              shine
              href={siteConfig.registerUrl}
              className="w-full sm:w-auto"
              onClick={() => trackRegisterClick('hero', siteConfig.registerUrl)}
            >
              Đăng ký ngay
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={siteConfig.loginUrl}
              className="w-full sm:w-auto"
              onClick={() => trackLoginClick('hero', siteConfig.loginUrl)}
            >
              Đăng nhập
            </Button>
          </div>

          <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {heroTrustPoints.map((item) => (
              <li key={item.title} className="flex items-center gap-2 text-xs text-text-secondary sm:text-sm">
                <Icon name={item.icon} className="h-4 w-4 text-cyan-300" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:order-2">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
