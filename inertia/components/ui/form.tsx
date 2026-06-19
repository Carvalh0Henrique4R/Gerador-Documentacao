import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export function FormShell({ className = '', ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={`ui-form ${className}`} {...props} />
}

export function FormField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
    </label>
  )
}

export function FormActions({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`form-actions ${className}`} {...props} />
}
