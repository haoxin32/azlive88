import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide ' +
  'transition-all duration-200 min-h-11 min-w-11 select-none ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-wait'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.6)] ' +
    'hover:brightness-110 active:brightness-95 focus-visible:brightness-110',
  secondary:
    'border-2 border-amber-400 text-amber-300 bg-transparent ' +
    'hover:bg-amber-400/10 active:bg-amber-400/20 focus-visible:bg-amber-400/10',
  ghost: 'text-text-secondary hover:text-text-primary bg-transparent',
}

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export interface ButtonProps {
  variant?: Variant
  size?: Size
  loading?: boolean
  shine?: boolean
  href?: string
  className?: string
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  shine = false,
  href,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], shine ? 'btn-shine' : '', className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span className={loading ? 'opacity-80' : undefined}>{children}</span>
    </>
  )

  if (href) {
    const isExternal = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        aria-busy={loading || undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
