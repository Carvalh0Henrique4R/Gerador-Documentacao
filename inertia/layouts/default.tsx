import { type Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { type ReactElement, useEffect } from 'react'
import { Form, Link } from '@adonisjs/inertia/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { props, url } = usePage<Data.SharedProps>()
  useEffect(() => {
    toast.dismiss()
  }, [url])

  useEffect(() => {
    if (props.flash?.error) {
      toast.error(props.flash.error)
    }
    if (props.flash?.success) {
      toast.success(props.flash.success)
    }
  }, [props.flash])

  return (
    <>
      <header>
        <div>
          <div>
            <Link href="/" className="brand">
              Gerador Doc
            </Link>
          </div>
          <div>
            <nav>
              <Link href="/projects" className={url.startsWith('/projects') ? 'current' : ''}>
                Projetos
              </Link>
              {children.props.user ? (
                <>
                  <span>{children.props.user.initials}</span>
                  <Form route="session.destroy">
                    <button type="submit"> Logout </button>
                  </Form>
                </>
              ) : (
                <>
                  <Link href="/signup">Signup</Link>
                  <Link href="/login">Login</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Toaster position="top-center" richColors />
    </>
  )
}
