import type { Plugin } from 'vite'
import { siteConfig } from '../src/config/site.ts'

interface Violation {
  field: string
  message: string
  /** Only blocks a production build; always warned about in dev. */
  blocksProduction: boolean
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isPlaceholderHost(value: string): boolean {
  return /\.example(?=[/:]|$)/i.test(value) || /localhost/i.test(value) || /127\.0\.0\.1/.test(value)
}

function checkRequiredHttpsUrl(field: string, value: string, violations: Violation[]) {
  if (!isValidUrl(value) || !isHttpsUrl(value)) {
    violations.push({ field, message: `must be a valid HTTPS URL, got "${value}"`, blocksProduction: true })
    return
  }
  if (isPlaceholderHost(value)) {
    violations.push({ field, message: `still points at a placeholder host ("${value}")`, blocksProduction: true })
  }
}

function checkOptionalHttpsUrl(field: string, value: string | null, violations: Violation[]) {
  if (value === null) return
  checkRequiredHttpsUrl(field, value, violations)
}

/**
 * Validates the parts of src/config/site.ts that must be real before a
 * production build ships: HTTPS URLs must be well-formed and not point at
 * a reserved placeholder host (.example / localhost / 127.0.0.1), and the
 * support email must be a plausible address.
 *
 * `vite build` (command === 'build') fails hard on any violation.
 * `vite dev`/`vite preview` only print a warning — local/dev work can
 * still use placeholder values.
 */
export function validateSiteConfig(): Plugin {
  let isBuildCommand = false

  return {
    name: 'validate-site-config',
    configResolved(resolvedConfig) {
      isBuildCommand = resolvedConfig.command === 'build'
    },
    buildStart() {
      const violations: Violation[] = []

      checkRequiredHttpsUrl('siteUrl', siteConfig.siteUrl, violations)
      checkRequiredHttpsUrl('registerUrl', siteConfig.registerUrl, violations)
      checkRequiredHttpsUrl('loginUrl', siteConfig.loginUrl, violations)
      checkOptionalHttpsUrl('telegramUrl', siteConfig.telegramUrl, violations)
      checkOptionalHttpsUrl('androidUrl', siteConfig.androidUrl, violations)
      checkOptionalHttpsUrl('iosUrl', siteConfig.iosUrl, violations)

      if (siteConfig.supportEmail !== null) {
        if (!isValidEmail(siteConfig.supportEmail)) {
          violations.push({
            field: 'supportEmail',
            message: `must be a valid email address, got "${siteConfig.supportEmail}"`,
            blocksProduction: true,
          })
        } else if (isPlaceholderHost(siteConfig.supportEmail)) {
          violations.push({
            field: 'supportEmail',
            message: `still points at a placeholder domain ("${siteConfig.supportEmail}")`,
            blocksProduction: true,
          })
        }
      }

      if (violations.length === 0) return

      const lines = violations.map((v) => `  - src/config/site.ts: "${v.field}" ${v.message}`)
      const message = `Site config is not production-ready:\n${lines.join('\n')}`

      // Escape hatch for internal test/staging builds only (e.g. running
      // Lighthouse against a placeholder build) — never set this in a real
      // deploy pipeline. Normal `npm run build` has it unset and fails hard.
      const bypassed = process.env.ALLOW_PLACEHOLDER_CONFIG === 'true'

      if (isBuildCommand && !bypassed) {
        throw new Error(
          `${message}\n\nThis fails the production build on purpose — see src/config/site.ts and replace these values with real ones before deploying.\n(Internal test builds only: set ALLOW_PLACEHOLDER_CONFIG=true to bypass — never in a real deploy.)`,
        )
      }

      console.warn(`\n\x1b[33m[validate-site-config] ${message}\x1b[0m\n`)
    },
  }
}
