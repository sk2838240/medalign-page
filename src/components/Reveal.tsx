import { useMemo, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { RevealContext, useReveal } from '../hooks/useReveal.ts'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

export type RevealTag =
  | 'div'
  | 'section'
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'ul'
  | 'li'
  | 'a'
  | 'article'
  | 'header'
  | 'footer'
  | 'form'

type RevealProps = {
  children: ReactNode
  as?: RevealTag
  className?: string
  direction?: RevealDirection
  delay?: number
  duration?: number
  threshold?: number
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'>

export default function Reveal({
  children,
  as = 'div',
  className = '',
  direction = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  ...rest
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(threshold)
  const Component = as as 'div'
  const contextValue = useMemo(() => visible, [visible])

  const classes = ['reveal', `reveal-${direction}`, visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ')

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  }

  return (
    <RevealContext.Provider value={contextValue}>
      <Component ref={ref} className={classes} style={style} {...rest}>
        {children}
      </Component>
    </RevealContext.Provider>
  )
}
