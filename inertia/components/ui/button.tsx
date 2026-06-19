import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from '@adonisjs/inertia/react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

type ButtonLinkProps = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  return <button className={`ui-button ui-button-${variant} ${className}`} {...props} />
}

export function ButtonLink({ className = '', variant = 'primary', ...props }: ButtonLinkProps) {
  return <Link className={`ui-button ui-button-${variant} ${className}`} {...props} />
}
