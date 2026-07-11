import type { Plugin } from 'vite'
import { createHash } from 'node:crypto'
import { siteConfig } from '../src/config/site.ts'
import { assets } from '../src/config/assets.ts'
import { buildJsonLdGraph } from '../src/lib/schema.ts'
import { isGa4Enabled, isMetaPixelEnabled } from '../src/config/tracking.ts'

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const LINE_SEPARATOR = String.fromCharCode(0x2028)
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029)

/**
 * Escapes characters unsafe to embed raw inside a <script> tag body:
 * `<`/`>`/`&` (script-tag/HTML-comment breakout) and U+2028/U+2029 (valid
 * in JSON strings but illegal as unescaped literals in some JS parsers).
 */
function escapeForInlineScript(json: string): string {
  return json
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .split(LINE_SEPARATOR)
    .join('\\u2028')
    .split(PARAGRAPH_SEPARATOR)
    .join('\\u2029')
}

/**
 * Generates all document-level SEO surfaces (index.html <head> meta +
 * JSON-LD, robots.txt, sitemap.xml, site.webmanifest) from the single
 * src/config/site.ts source of truth, instead of duplicating siteUrl /
 * title / description across static files by hand.
 *
 * JSON-LD is written as static build-time text (not client-rendered via
 * React) specifically so its content — and therefore its SHA-256 hash — is
 * fixed at build time. That lets the CSP recommendation in
 * SECURITY_HEADERS.md use `'sha256-<hash>'` on script-src instead of
 * `'unsafe-inline'`. The exact hash for the current build is printed to
 * the terminal and written to dist/csp-script-hash.txt.
 */
export function seoStaticFiles(): Plugin {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, '')
  const canonical = `${baseUrl}/`
  const ogImageUrl = `${baseUrl}${siteConfig.ogImageUrl}`

  const title = escapeHtmlAttr(siteConfig.title)
  const description = escapeHtmlAttr(siteConfig.description)
  const ogImageAlt = escapeHtmlAttr(siteConfig.ogImageAlt)

  const jsonLdContent = escapeForInlineScript(JSON.stringify(buildJsonLdGraph()))
  const jsonLdHash = `sha256-${createHash('sha256').update(jsonLdContent, 'utf8').digest('base64')}`

  // CSP directives change based on which analytics providers have a real
  // ID configured in src/config/tracking.ts — no domain is ever added for
  // a provider that's off (ga4/metaPixelId === null), keeping the policy
  // as tight as possible whenever tracking is disabled.
  const scriptSrc = [`'self'`, `'${jsonLdHash}'`]
  const connectSrc = [`'self'`]
  const imgSrc = [`'self'`, 'data:']

  if (isGa4Enabled) {
    scriptSrc.push('https://www.googletagmanager.com')
    connectSrc.push(
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://www.googletagmanager.com',
    )
    imgSrc.push('https://www.google-analytics.com', 'https://www.googletagmanager.com')
  }

  if (isMetaPixelEnabled) {
    scriptSrc.push('https://connect.facebook.net')
    connectSrc.push('https://www.facebook.com')
    imgSrc.push('https://www.facebook.com')
  }

  const cspPolicy = [
    `default-src 'self'`,
    `script-src ${scriptSrc.join(' ')}`,
    `style-src 'self'`,
    `img-src ${imgSrc.join(' ')}`,
    `font-src 'self'`,
    `connect-src ${connectSrc.join(' ')}`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join('; ')

  // This app renders entirely client-side — the hero <img> doesn't exist in
  // the raw HTML the browser first receives, so its own preload scanner
  // can't discover it until the JS bundle has downloaded, parsed, and
  // executed React. These static preload hints let the LCP image start
  // fetching in parallel with the JS bundle instead of after it (measured:
  // removes a multi-second LCP regression on mobile).
  const heroPreloadHtml = assets.heroDesktop
    ? [
        assets.heroMobile
          ? `    <link rel="preload" as="image" href="${assets.heroMobile.avif}" type="image/avif" media="(max-width: 767px)" fetchpriority="high" />`
          : '',
        `    <link rel="preload" as="image" href="${assets.heroDesktop.avif}" type="image/avif" media="(min-width: 768px)" fetchpriority="high" />`,
      ]
        .filter(Boolean)
        .join('\n') + '\n'
    : ''

  return {
    name: 'seo-static-files',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const metaHtml = `
    <meta name="theme-color" content="#060b18" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index, follow" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtmlAttr(siteConfig.siteName)}" />
    <meta property="og:locale" content="${siteConfig.locale}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:width" content="${siteConfig.ogImageWidth}" />
    <meta property="og:image:height" content="${siteConfig.ogImageHeight}" />
    <meta property="og:image:alt" content="${ogImageAlt}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    <meta name="twitter:image:alt" content="${ogImageAlt}" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
    <script type="application/ld+json">${jsonLdContent}</script>
`
        // Hero preload goes as early as possible in <head> (right after the
        // viewport meta) so the browser's preload scanner sees it before
        // ~20 lines of SEO/OG meta tags it doesn't need to render first.
        const withPreload = heroPreloadHtml
          ? html.replace(
              '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
              `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n${heroPreloadHtml}`,
            )
          : html
        return withPreload.replace('</head>', `${metaHtml}  </head>`)
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${canonical}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: JSON.stringify(
          {
            name: siteConfig.siteName,
            short_name: siteConfig.siteShortName,
            description: siteConfig.title,
            start_url: '/',
            display: 'standalone',
            background_color: '#060b18',
            theme_color: '#060b18',
            icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
          },
          null,
          2,
        ),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'csp-script-hash.txt',
        source: `${jsonLdHash}\n\nAdd this to your Content-Security-Policy's script-src, e.g.:\n  script-src 'self' '${jsonLdHash}';\nRegenerated on every build — re-copy after any change to site.ts or FAQ content.\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'csp-policy.txt',
        source:
          `${cspPolicy}\n\n` +
          `GA4 enabled: ${isGa4Enabled}\n` +
          `Meta Pixel enabled: ${isMetaPixelEnabled}\n\n` +
          `Paste the policy line above as-is into your Content-Security-Policy header ` +
          `(see SECURITY_HEADERS.md for the per-host examples). Regenerated on every build — ` +
          `it already reflects the current src/config/site.ts (JSON-LD hash) and ` +
          `src/config/tracking.ts (analytics domains) state.\n`,
      })

      console.log(`\n[seo-static-files] JSON-LD script-src hash: '${jsonLdHash}'`)
      console.log('[seo-static-files] (also written to dist/csp-script-hash.txt)')
      console.log(`[seo-static-files] CSP policy (GA4: ${isGa4Enabled}, Meta Pixel: ${isMetaPixelEnabled}):`)
      console.log(`  ${cspPolicy}`)
      console.log('[seo-static-files] (also written to dist/csp-policy.txt)\n')
    },
  }
}
