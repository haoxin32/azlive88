import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element first enters the viewport, then disconnects —
 * used to gate one-shot reveal/count-up animations without a scroll listener.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, options])

  return { ref, inView }
}
