import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string
  options: Array<{ label: string; value: string }>
}

export function Select({ className = '', error, options, ...props }: SelectProps) {
  return (
    <>
      <select className={`ui-select ${className}`} data-invalid={Boolean(error)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="form-error">{error}</p> : null}
    </>
  )
}
