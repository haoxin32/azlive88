import { trackingConfig, isGa4Enabled, isMetaPixelEnabled } from '@/config/tracking'

/**
 * Set to true only for local debugging — logs which event *would* be sent,
 * never the sensitive payload. Always false in production regardless of
 * this flag (gated by import.meta.env.DEV below too).
 */
const TRACKING_DEBUG = false

function debugLog(...args: unknown[]) {
  if (TRACKING_DEBUG && import.meta.env.DEV) {
    console.log('[tracking]', ...args)
  }
}

export type CtaSource = 'header' | 'hero' | 'mobile_menu' | 'mobile_sticky_cta' | 'footer'

let trackingDisabled = false
let hasInitialized = false
let ga4ScriptRequested = false
let ga4Configured = false
let metaScriptRequested = false
let metaConfigured = false
let pageViewSent = false

function loadGa4Script(measurementId: string) {
  if (ga4ScriptRequested) return
  ga4ScriptRequested = true

  if (document.querySelector('script[data-tracking="ga4"]')) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  script.dataset.tracking = 'ga4'
  document.head.appendChild(script)
}

function configureGa4(measurementId: string) {
  if (ga4Configured) return
  ga4Configured = true

  window.dataLayer = window.dataLayer ?? []
  window.gtag =
    window.gtag ??
    ((...args: unknown[]) => {
      window.dataLayer!.push(args)
    })

  window.gtag('js', new Date())
  // send_page_view:false — this app fires exactly one page_view itself via
  // trackPageView(), so GA4's implicit config-time pageview is suppressed
  // to avoid double-counting.
  window.gtag('config', measurementId, { send_page_view: false })
  debugLog('GA4 configured', measurementId)
}

function ensureFbqStub() {
  if (window.fbq) return

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue.push(args)
    }
  }) as FbqFunction

  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []

  window.fbq = fbq
  window._fbq = window._fbq ?? fbq
}

function loadMetaPixelScript() {
  if (metaScriptRequested) return
  metaScriptRequested = true

  ensureFbqStub()

  if (document.querySelector('script[data-tracking="meta-pixel"]')) return

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  script.dataset.tracking = 'meta-pixel'
  document.head.appendChild(script)
}

function configureMetaPixel(pixelId: string) {
  if (metaConfigured) return
  metaConfigured = true

  window.fbq?.('init', pixelId)
  debugLog('Meta Pixel configured', pixelId)
}

/** Fires exactly once per page load — safe to call multiple times. */
export function trackPageView() {
  if (trackingDisabled || pageViewSent) return
  pageViewSent = true

  if (isGa4Enabled && window.gtag) {
    window.gtag('event', 'page_view')
    debugLog('GA4 page_view sent')
  }
  if (isMetaPixelEnabled && window.fbq) {
    window.fbq('track', 'PageView')
    debugLog('Meta PageView sent')
  }
}

export function trackRegisterClick(source: CtaSource, destinationUrl: string) {
  if (trackingDisabled) return

  if (isGa4Enabled && window.gtag) {
    window.gtag('event', 'register_click', {
      event_category: 'CTA',
      event_label: source,
      link_url: destinationUrl,
    })
  }
  if (isMetaPixelEnabled && window.fbq) {
    window.fbq('trackCustom', 'RegisterClick', { source, link_url: destinationUrl })
  }
  debugLog('register_click', source, destinationUrl)
}

export function trackLoginClick(source: CtaSource, destinationUrl: string) {
  if (trackingDisabled) return

  if (isGa4Enabled && window.gtag) {
    window.gtag('event', 'login_click', {
      event_category: 'CTA',
      event_label: source,
      link_url: destinationUrl,
    })
  }
  if (isMetaPixelEnabled && window.fbq) {
    window.fbq('trackCustom', 'LoginClick', { source, link_url: destinationUrl })
  }
  debugLog('login_click', source, destinationUrl)
}

/**
 * Loads/configures whichever providers have a real ID and fires the single
 * page_view. Safe to call more than once (e.g. React StrictMode's double
 * effect invocation in dev) — every step is guarded by its own flag.
 * This is the intended hook point for a future consent manager: call it
 * only after consent is granted, instead of unconditionally on mount.
 */
export function initializeTracking() {
  if (hasInitialized) return
  hasInitialized = true
  trackingDisabled = false

  if (isGa4Enabled && trackingConfig.ga4MeasurementId) {
    loadGa4Script(trackingConfig.ga4MeasurementId)
    configureGa4(trackingConfig.ga4MeasurementId)
  }
  if (isMetaPixelEnabled && trackingConfig.metaPixelId) {
    loadMetaPixelScript()
    configureMetaPixel(trackingConfig.metaPixelId)
  }

  trackPageView()
}

/**
 * Stops all future track*() calls from sending anything. Does not/cannot
 * un-load an already-injected script — intended as the hook a future
 * consent manager calls when the user withdraws consent.
 */
export function disableTracking() {
  trackingDisabled = true
}
