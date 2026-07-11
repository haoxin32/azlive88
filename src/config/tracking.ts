/**
 * Analytics tracking configuration — single source of truth for GA4/Meta
 * Pixel IDs. Both are `null` until real IDs exist. Every consumer (loader,
 * CSP build plugin, event helpers) must treat `null` as "fully disabled":
 * no script requests, no CSP domain, no tracking calls. Never fill these
 * with placeholder/example IDs (e.g. "G-XXXXXXXXXX") — a placeholder would
 * make the loader think tracking is enabled and start firing requests.
 */
export const trackingConfig = {
  ga4MeasurementId: null as string | null,
  metaPixelId: null as string | null,
}

export const isGa4Enabled =
  typeof trackingConfig.ga4MeasurementId === 'string' && trackingConfig.ga4MeasurementId.trim().length > 0

export const isMetaPixelEnabled =
  typeof trackingConfig.metaPixelId === 'string' && trackingConfig.metaPixelId.trim().length > 0
