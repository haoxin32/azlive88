import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { siteConfig } from '@/config/site'
import { trackLoginClick, trackRegisterClick } from '@/lib/tracking'

export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false)
  const [hideForFooter, setHideForFooter] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return

    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      rootMargin: '0px 0px -85% 0px',
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    const payment = document.getElementById('payment-app')
    const targets = [footer, payment].filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => setHideForFooter(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: '0px 0px -10% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const visible = pastHero && !hideForFooter

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cyan-400/20 bg-bg-elevated/90 shadow-[0_-8px_24px_-8px_rgb(0_0_0_/_0.5)] backdrop-blur-lg
        pb-[env(safe-area-inset-bottom)] transition-transform duration-300 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex max-h-16 items-center gap-2.5 px-4 py-2.5">
        <Button
          variant="secondary"
          size="md"
          href={siteConfig.loginUrl}
          className="flex-1"
          onClick={() => trackLoginClick('mobile_sticky_cta', siteConfig.loginUrl)}
        >
          Đăng nhập
        </Button>
        <Button
          variant="primary"
          size="md"
          shine
          href={siteConfig.registerUrl}
          className="flex-1"
          onClick={() => trackRegisterClick('mobile_sticky_cta', siteConfig.registerUrl)}
        >
          Đăng ký
        </Button>
      </div>
    </div>
  )
}
