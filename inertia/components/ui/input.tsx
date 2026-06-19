import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

export function Input({ className = '', error, ...props }: InputProps) {
  return (
    <>
      <input className={`ui-input ${className}`} data-invalid={Boolean(error)} {...props} />
      {error ? <p className="form-error">{error}</p> : null}
    </>
  )
}
