import { useEffect } from 'react'
import { initializeTracking } from '@/lib/tracking'

/**
 * Mount once at the app root. Renders nothing — `initializeTracking()` is
 * itself idempotent, so this is safe even under React StrictMode's
 * mount→unmount→mount dev double-invoke.
 */
export function TrackingScripts() {
  useEffect(() => {
    initializeTracking()
  }, [])

  return null
}
