import { useState, useRef, useEffect } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

export function useInView(options: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [options.threshold, options.rootMargin])

  return { ref, inView }
}
