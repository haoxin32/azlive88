import type { Plugin } from 'vite'
import { trackingConfig } from '../src/config/tracking.ts'

const GA4_ID_PATTERN = /^G-[A-Z0-9]{4,}$/
const META_PIXEL_ID_PATTERN = /^[0-9]+$/

/**
 * Validates src/config/tracking.ts before a build: when an ID is set (not
 * null), it must actually look like a real GA4/Meta Pixel ID, not a typo
 * or a copy-pasted placeholder. `null` always passes — that's the
 * supported "disabled" state, not an error.
 *
 * `vite build` fails hard on a malformed ID. `vite dev`/`vite preview`
 * only print a warning, matching the same dev-vs-build split as
 * validateSiteConfig.ts.
 */
export function validateTrackingConfig(): Plugin {
  let isBuildCommand = false

  return {
    name: 'validate-tracking-config',
    configResolved(resolvedConfig) {
      isBuildCommand = resolvedConfig.command === 'build'
    },
    buildStart() {
      const violations: string[] = []

      if (trackingConfig.ga4MeasurementId !== null && !GA4_ID_PATTERN.test(trackingConfig.ga4MeasurementId)) {
        violations.push(
          `ga4MeasurementId "${trackingConfig.ga4MeasurementId}" does not match the expected "G-XXXXXXXXXX" format`,
        )
      }

      if (trackingConfig.metaPixelId !== null && !META_PIXEL_ID_PATTERN.test(trackingConfig.metaPixelId)) {
        violations.push(`metaPixelId "${trackingConfig.metaPixelId}" must contain digits only`)
      }

      if (violations.length === 0) return

      const lines = violations.map((v) => `  - src/config/tracking.ts: ${v}`)
      const message = `Tracking config is invalid:\n${lines.join('\n')}`

      if (isBuildCommand) {
        throw new Error(`${message}\n\nFix src/config/tracking.ts before building for production.`)
      }

      console.warn(`\n\x1b[33m[validate-tracking-config] ${message}\x1b[0m\n`)
    },
  }
}
