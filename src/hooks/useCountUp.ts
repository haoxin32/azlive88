import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` once, starting when the returned
 * `ref` element enters the viewport. Runs via requestAnimationFrame (no
 * interval), respects prefers-reduced-motion (jumps straight to target),
 * and never re-runs after its first trigger.
 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1800) {
  const ref = useRef<T | null>(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || startedRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      startedRef.current = true
      return
    }

    let frameId = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return
        startedRef.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setValue(target * eased)
          if (progress < 1) {
            frameId = requestAnimationFrame(tick)
          }
        }
        frameId = requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [target, duration])

  return { ref, value }
}
