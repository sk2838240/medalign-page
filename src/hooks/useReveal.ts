import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const RevealContext = createContext(true)

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
) {
  const parentRevealed = useContext(RevealContext)
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (!parentRevealed) return

    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [parentRevealed, rootMargin, threshold])

  return { ref, visible }
}
