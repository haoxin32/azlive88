import { Icon, type IconName } from './Icon'

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: IconName
  title: string
  description: string
}) {
  return (
    <article
      className="flex flex-col gap-3 rounded-md border border-border-subtle bg-surface p-5 shadow-card
        transition-colors duration-300 hover:border-border-strong"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-300">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="text-base font-bold text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </article>
  )
}
