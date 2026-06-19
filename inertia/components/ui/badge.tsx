import type { HTMLAttributes } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'success' | 'warning' | 'muted'
}

export function Badge({ className = '', tone = 'default', ...props }: BadgeProps) {
  return <span className={`ui-badge ui-badge-${tone} ${className}`} {...props} />
}
