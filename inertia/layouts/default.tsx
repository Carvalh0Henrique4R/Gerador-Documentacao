import { type Data } from '@generated/data'
import { csrfHeaders } from '~/lib/csrf'
import { toast, Toaster } from 'sonner'
import { router, usePage } from '@inertiajs/react'
import { type ReactElement, useEffect } from 'react'
import { Link } from '@adonisjs/inertia/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { props, url } = usePage<Data.SharedProps>()
  const isProjectsDashboard = url === '/home' || url === '/projects'
  const isLanding = url === '/'

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

  const handleLogout = async () => {
    await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...csrfHeaders(),
      },
    })

    router.visit('/')
  }

  return (
    <>
      {!isProjectsDashboard && (
        <header className={isLanding ? 'landing-header' : undefined}>
          <div className={isLanding ? 'landing-header-inner' : undefined}>
            <div className={isLanding ? 'landing-brand-wrap' : undefined}>
              <Link href="/" className={isLanding ? 'brand landing-brand' : 'brand'}>
                <span className={isLanding ? 'landing-brand-text' : undefined}>Docneitor</span>
                {isLanding ? <small>Documentação técnica assistida</small> : null}
              </Link>
            </div>
            <div className={isLanding ? 'landing-nav-wrap' : undefined}>
              <nav
                className={isLanding ? 'landing-nav' : undefined}
                aria-label="Navegação principal"
              >
                {/* {isLanding ? (
                  <div className="landing-nav-links">
                    <a href="#como-funciona">Como funciona</a>
                  </div>
                ) : null} */}
                {children.props.user ? (
                  <div className={isLanding ? 'landing-nav-actions' : undefined}>
                    {isLanding ? (
                      <Link href="/home" className="landing-nav-link">
                        Início
                      </Link>
                    ) : null}
                    <span className="user-initials">{children.props.user.initials}</span>
                    <button type="button" className="nav-logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className={isLanding ? 'landing-nav-actions' : undefined}>
                    {/* <Link href="/login" className={isLanding ? 'landing-nav-link' : undefined}>
                      Entrar
                    </Link> */}
                    <Link
                      href="/signup"
                      className={isLanding ? 'landing-nav-secondary' : undefined}
                    >
                      Criar conta
                    </Link>
                    {isLanding ? (
                      <Link href="/home" className="landing-nav-primary">
                        Login
                      </Link>
                    ) : null}
                  </div>
                )}
              </nav>
            </div>
          </div>
        </header>
      )}
      <main className={isProjectsDashboard ? 'main-projects-dashboard' : undefined}>
        {children}
      </main>
      <Toaster position="top-center" richColors />
    </>
  )
}
