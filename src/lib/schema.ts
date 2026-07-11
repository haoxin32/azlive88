import { siteConfig } from '../config/site.ts'
import { faqItems } from '../data/faq.ts'

export function buildOrganizationSchema() {
  const sameAs = siteConfig.socialLinks
    .map((social) => social.href)
    .filter((href): href is string => href !== null)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(siteConfig.supportEmail
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: siteConfig.supportEmail,
            availableLanguage: ['vi'],
          },
        }
      : {}),
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    inLanguage: 'vi-VN',
  }
}

export function buildWebPageSchema() {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    inLanguage: 'vi-VN',
    image: `${baseUrl}${siteConfig.ogImageUrl}`,
  }
}

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * Combines every schema into a single @graph node so the page ships one
 * JSON-LD <script> instead of four — one CSP script-hash to manage instead
 * of four (see build-plugins/seoStaticFiles.ts).
 */
export function buildJsonLdGraph() {
  const { '@context': _orgContext, ...organization } = buildOrganizationSchema()
  const { '@context': _websiteContext, ...website } = buildWebsiteSchema()
  const { '@context': _webPageContext, ...webPage } = buildWebPageSchema()
  const { '@context': _faqContext, ...faqPage } = buildFaqSchema()

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, webPage, faqPage],
  }
}
