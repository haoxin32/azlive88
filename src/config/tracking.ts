/**
 * Analytics tracking configuration — single source of truth for GA4/Meta
 * Pixel/GTM IDs. All are `null` until real IDs exist. Every consumer (loader,
 * CSP build plugin, event helpers) must treat `null` as "fully disabled":
 * no script requests, no CSP domain, no tracking calls. Never fill these
 * with placeholder/example IDs (e.g. "G-XXXXXXXXXX") — a placeholder would
 * make the loader think tracking is enabled and start firing requests.
 */
export const trackingConfig = {
  ga4MeasurementId: 'G-LF9YCN00SZ',
  metaPixelId: '970371719138828',
  gtmContainerId: 'GTM-T3XHD4ZK',
}

export const isGa4Enabled =
  typeof trackingConfig.ga4MeasurementId === 'string' && trackingConfig.ga4MeasurementId.trim().length > 0

export const isMetaPixelEnabled =
  typeof trackingConfig.metaPixelId === 'string' && trackingConfig.metaPixelId.trim().length > 0

export const isGtmEnabled =
  typeof trackingConfig.gtmContainerId === 'string' && trackingConfig.gtmContainerId.trim().length > 0
