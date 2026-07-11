# Security headers — deploy-time configuration

This app is a static build (`dist/`) — headers must be applied by whatever
serves it. Deployment target wasn't specified when this project was built,
so pick the block below that matches, adjust the CSP domain list to match
the actual `registerUrl`/`loginUrl` origin, and **test in staging** before
enabling — a wrong CSP can silently break fonts/scripts.

## `script-src` needs the JSON-LD hash — read it from the build output

The only inline `<script>` on the page is a single
`<script type="application/ld+json">` (Organization/WebSite/WebPage/FAQPage
schema), written as **static text at build time** by
`build-plugins/seoStaticFiles.ts` specifically so its content — and
therefore its SHA-256 hash — is fixed and known ahead of deploy. This lets
`script-src` use `'sha256-<hash>'` instead of `'unsafe-inline'`, with zero
loss of SEO (Google/crawlers see the exact same static markup either way).

**Every `npm run build` regenerates `dist/csp-script-hash.txt`** with the
current hash and a ready-to-paste `script-src` line. **The hash changes
whenever `site.ts` or FAQ content changes**, so re-copy it after any such
edit before the next deploy; otherwise the JSON-LD script will be silently
blocked by CSP (structured data disappears, nothing else breaks — check
`dist/csp-script-hash.txt` against your live header if FAQ schema stops
showing up in Search Console).

**`dist/csp-policy.txt` has the complete ready-to-paste policy** (the
`<CSP_POLICY>` placeholder below) — it already bakes in the JSON-LD hash
above *and* the GA4/Meta Pixel domains from `src/config/tracking.ts`, if
either is enabled (both are `null`/disabled by default; see "Analytics"
below). Regenerated every build — always copy the current file, don't
hand-assemble the policy string yourself.

All examples below assume:
- **No inline `style` attributes anywhere in the app** (verified — all
  dynamic styling uses Tailwind utility/arbitrary-value classes), so
  `style-src` does **not** need `'unsafe-inline'`.
- Fonts are self-hosted (`@fontsource-variable/*`, bundled into
  `dist/assets`), so no external font CDN origin is needed in `font-src`.
- `object-src 'none'` — no `<object>`/`<embed>`/plugins are used.
- No `unsafe-eval` anywhere — not needed by this app.
- `upgrade-insecure-requests` is only included in the production HTTPS
  examples below — **do not** send it on an HTTP-only staging/dev origin,
  it will force-upgrade requests to HTTPS and break the page there.

## Nginx

```nginx
add_header Content-Security-Policy "<CSP_POLICY>" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Resource-Policy "same-origin" always;
```

## Cloudflare

Use a Transform Rule (Rules → Transform Rules → Modify Response Header) or a
Cloudflare Worker. Worker example:

```js
export default {
  async fetch(request, env) {
    const response = await fetch(request)
    const headers = new Headers(response.headers)
    headers.set(
      'Content-Security-Policy',
      "<CSP_POLICY>",
    )
    headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
    headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    headers.set('Cross-Origin-Resource-Policy', 'same-origin')
    return new Response(response.body, { ...response, headers })
  },
}
```

## Vercel (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "<CSP_POLICY>"
        },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Resource-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```

## Staging / HTTP-only preview

Same policy, minus `upgrade-insecure-requests` (which would force HTTPS on
an origin that may not have TLS configured) and minus HSTS (`Strict-
Transport-Security` should only ever be sent over a connection that is
already HTTPS) — take `<CSP_POLICY>` from `dist/csp-policy.txt` and strip
the trailing `; upgrade-insecure-requests` from it.

## Analytics (GA4 / Meta Pixel)

`src/config/tracking.ts` holds `ga4MeasurementId`/`metaPixelId`, both
`null` until real IDs exist. While `null`:

- No GA4/Meta script is ever requested (verified: 0 network requests to
  `googletagmanager.com`/`google-analytics.com`/`connect.facebook.net`/
  `facebook.com`).
- `window.gtag`/`window.fbq`/`window.dataLayer` are never defined.
- The CSP emitted to `dist/csp-policy.txt` contains **no** analytics
  domain — `default-src 'self'` stays exactly as tight as without
  analytics support at all.

Filling in a real ID (format-validated at build time — see
`build-plugins/validateTrackingConfig.ts`) does three things automatically
on the next build: the loader (`src/lib/tracking.ts`, mounted once via
`<TrackingScripts />` in `App.tsx`) starts injecting that provider's
script tag, and `dist/csp-policy.txt` gains exactly that provider's
minimum required domains (see the plugin diff in
`build-plugins/seoStaticFiles.ts` for the exact list). Nothing else in the
app needs to change. Both loaders create their `<script>` tags via
`document.createElement` (no `dangerouslySetInnerHTML`, no inline script
body), so enabling analytics never requires a new `script-src` hash.

## Why a hash instead of a nonce

A per-request nonce needs a server to mint a fresh random value on every
response — not possible for a plain static file host serving the same
`index.html` bytes to everyone. A hash has no such requirement: it just has
to match the script's exact content, which is fixed at build time here, so
it works on pure static hosting (S3/Cloudflare Pages/Nginx serving static
files/etc.) where a nonce wouldn't.

## Notes

- Verified end-to-end: built with this exact CSP (via `vite.config.ts`
  `preview.headers` during testing) and loaded in a real browser — the
  JSON-LD script executed, `document.querySelectorAll('script[type=
  "application/ld+json"]')` parsed with 0 console errors, 0 CSP violations.
- If you add analytics, chat widgets, or any third-party script later,
  add that exact origin to `script-src`/`connect-src` explicitly — do not
  widen to `*`, and do not reintroduce `'unsafe-inline'`.
- Test the CSP with the browser console open after any header change —
  a silently blocked script/style is easy to miss visually.
