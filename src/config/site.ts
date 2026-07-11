export interface SiteConfig {
  siteName: string
  siteShortName: string
  siteUrl: string
  locale: string
  title: string
  description: string

  registerUrl: string
  loginUrl: string
  /** null until a real support email exists — do not fabricate one. */
  supportEmail: string | null
  /** null until a real Telegram/chat link exists — do not fabricate one. */
  telegramUrl: string | null
  /** null until a real store listing exists — do not fabricate a link. */
  androidUrl: string | null
  /** null until a real store listing exists — do not fabricate a link. */
  iosUrl: string | null

  ogImageUrl: string
  ogImageWidth: number
  ogImageHeight: number
  ogImageAlt: string

  contact: {
    supportHours: string
  }

  /** href is null until a real profile/link exists — do not fabricate one. */
  socialLinks: { label: string; href: string | null; icon: 'facebook' | 'send' | 'youtube' }[]

  legal: {
    ageNotice: string
    responsibleGamingUrl: string
  }

  features: {
    /**
     * Production must not present placeholder testimonials as real user
     * reviews. Flip to true only once real, consented reviews replace the
     * data in src/data/testimonials.ts.
     */
    showTestimonials: boolean
  }
}

/**
 * Central site configuration — single source of truth for every URL and
 * contact detail used across metadata, JSON-LD, sitemap, robots, manifest
 * and components. `siteUrl`/`registerUrl`/`loginUrl` are checked at build
 * time (see build-plugins/validateSiteConfig.ts) and must stay real HTTPS
 * URLs. `supportEmail`/`telegramUrl`/`androidUrl`/`iosUrl`/`socialLinks[].href`
 * are `null` until real — every consumer treats null as "hide this", never
 * as a fabricated placeholder.
 */
const telegramUrl: string | null = null

export const siteConfig: SiteConfig = {
  siteName: 'AZLIVE88',
  siteShortName: 'AZLIVE88',
  siteUrl: 'https://azlive88.com',
  locale: 'vi_VN',
  title: 'AZLIVE88 - Nền tảng giải trí và cược trực tuyến',
  description:
    'AZLIVE88 là nền tảng giải trí trực tuyến quy tụ thể thao, esports, casino trực tuyến, slots, bắn cá và xổ số trong một trải nghiệm bảo mật, ổn định trên mọi thiết bị.',

  registerUrl: 'https://goaz88.com/?a=x&c=56038539',
  loginUrl: 'https://goaz88.com/?a=x&c=56038539',
  supportEmail: null,
  telegramUrl,
  androidUrl: 'https://az88dl.com/',
  iosUrl: 'https://az88dl.com/',

  // JPEG (not the original PNG) — WebP support across social link-preview
  // crawlers is inconsistent, JPEG is universally safe for og:image/twitter:image.
  ogImageUrl: '/images/og/azlive88-og-cover.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'AZLIVE88 - Nền tảng giải trí thế hệ mới',

  contact: {
    supportHours: '24/7',
  },

  socialLinks: [
    { label: 'Facebook', href: null, icon: 'facebook' },
    { label: 'Telegram', href: telegramUrl, icon: 'send' },
    { label: 'YouTube', href: null, icon: 'youtube' },
  ],

  legal: {
    ageNotice: '18+',
    responsibleGamingUrl: '#responsible-gaming',
  },

  features: {
    showTestimonials: false,
  },
}
