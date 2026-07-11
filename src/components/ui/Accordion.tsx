import { useState } from 'react'
import { Icon } from './Icon'

export interface AccordionItemData {
  id: string
  question: string
  answer: string
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set([items[0]?.id].filter(Boolean) as string[]))

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        const triggerId = `faq-trigger-${item.id}`
        const panelId = `faq-panel-${item.id}`

        return (
          <div key={item.id} className="overflow-hidden rounded-md border border-border-subtle bg-surface">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full min-h-11 items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-text-primary transition-colors hover:text-cyan-300 sm:px-5 sm:py-4 sm:text-base"
              >
                <span>{item.question}</span>
                <Icon
                  name="chevron-down"
                  className={`h-5 w-5 shrink-0 text-cyan-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-3 text-sm text-text-secondary sm:px-5 sm:pb-4">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
