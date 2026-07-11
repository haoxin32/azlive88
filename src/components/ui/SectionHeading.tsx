import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
}) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClasses}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</span>
      )}
      <h2 className="text-balance text-[clamp(1.75rem,6vw,2.25rem)] font-bold text-text-primary sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-sm text-text-secondary sm:text-base ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
