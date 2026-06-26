import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import { type FormEvent, useEffect, useState } from 'react'
import { ProjectIcon, type ProjectIconName } from '~/features/projects/components/project_icon'
import { csrfHeaders } from '~/lib/csrf'

type FeatureCard = {
  icon: ProjectIconName
  title: string
  description: string
}

const featureCards: FeatureCard[] = [
  {
    icon: 'gitBranch',
    title: 'Integração com Git',
    description: 'Conecte repositórios e gere documentação automaticamente.',
  },
  {
    icon: 'bookOpen',
    title: 'Documentação Padronizada',
    description: 'Estruturas consistentes e fáceis de navegar.',
  },
  {
    icon: 'lock',
    title: 'Privacidade e Controle',
    description: 'Use seu próprio provider de LLM ou fallback sem LLM.',
  },
  {
    icon: 'barChart3',
    title: 'Histórico e Auditoria',
    description: 'Acompanhe todas as gerações e revise mudanças.',
  },
]

const projects = [
  [
    'API de Pagamentos',
    'api-pagamentos',
    'github.com/org/api-pagamentos',
    'OpenAI',
    '2 min atrás',
    'Sucesso',
  ],
  ['Web App', 'web-app', 'github.com/org/web-app', 'Azure OpenAI', '15 min atrás', 'Sucesso'],
  [
    'Serviço de Notificações',
    'svc-notificacoes',
    'github.com/org/svc-notificacoes',
    'Fallback',
    '1 h atrás',
    'Sucesso',
  ],
  ['Biblioteca JS', 'lib-js', 'github.com/org/lib-js', 'OpenAI', '3 h atrás', 'Falha'],
]

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return new URLSearchParams(window.location.search).get('login') === '1'
  })
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoginOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLoginOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLoginOpen])

  const handleStart = async () => {
    setIsCheckingAuth(true)
    setLoginError(null)

    try {
      const response = await fetch('/auth/me', {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        router.visit('/home')
        return
      }

      setIsLoginOpen(true)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmittingLogin(true)
    setLoginError(null)

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...csrfHeaders(),
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = (await response.json().catch(() => null)) as { message?: string } | null

      if (!response.ok) {
        setLoginError(data?.message ?? 'Não foi possível realizar o login.')
        return
      }

      router.visit('/home')
    } finally {
      setIsSubmittingLogin(false)
    }
  }

  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-copy">
          <p className="home-eyebrow">BYOK • FALLBACK SEM LLM</p>
          <h1>
            Gerador automático de <span>documentação técnica</span>
          </h1>
          <p className="home-lead">
            Cadastre projetos, configure o provedor de LLM por repositório e acompanhe as
            documentações geradas por eventos de Git.
          </p>
          <div className="home-actions">
            <button
              type="button"
              className="home-button home-button-primary"
              onClick={handleStart}
              disabled={isCheckingAuth}
            >
              <ProjectIcon name="code" className="home-button-icon" />
              {isCheckingAuth ? 'Validando' : 'Começar'}
            </button>
            <a className="home-button home-button-secondary" href="#como-funciona">
              <ProjectIcon name="bookOpen" className="home-button-icon" />
              Como funciona
            </a>
          </div>
          <div className="home-highlights" aria-label="Principais características">
            <div>
              <ProjectIcon name="zap" className="home-highlight-icon" />
              <strong>Automático</strong>
              <small>Gere docs a cada push no Git.</small>
            </div>
            <div>
              <ProjectIcon name="shield" className="home-highlight-icon" />
              <strong>Seguro</strong>
              <small>BYOK e fallback sem LLM.</small>
            </div>
            <div>
              <ProjectIcon name="upload" className="home-highlight-icon" />
              <strong>Flexível</strong>
              <small>Configure por repositório.</small>
            </div>
          </div>
        </div>

        <div className="home-visual" aria-hidden="true">
          <div className="home-sun" />
          <div className="home-dots" />
          <div className="home-dashboard">
            <aside className="home-sidebar">
              <div className="home-mini-brand">
                <span />
                Docneitor
              </div>
              <nav>
                <span className="active">Projetos</span>
                <span>Documentações</span>
                <span>Provedores</span>
                <span>Configurações</span>
              </nav>
              <div className="home-user">
                <span>U</span>
                <div>
                  <strong>Usuário</strong>
                  <small>usuario@email.com</small>
                </div>
              </div>
            </aside>
            <div className="home-panel">
              <div className="home-panel-header">
                <div>
                  <h2>Projetos</h2>
                  <p>Acompanhe e gerencie seus repositórios.</p>
                </div>
                <button type="button">+ Novo projeto</button>
              </div>
              <table className="home-project-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Repositório</th>
                    <th>Provedor</th>
                    <th>Última geração</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(([name, slug, repo, provider, generatedAt, status]) => (
                    <tr key={slug}>
                      <td>
                        <strong>{name}</strong>
                        <small>{slug}</small>
                      </td>
                      <td>{repo}</td>
                      <td>{provider}</td>
                      <td>{generatedAt}</td>
                      <td>
                        <span className={status === 'Sucesso' ? 'success' : 'failure'}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="home-panel-footer">
                <strong>4 projetos</strong>
                <div>
                  <span>‹</span>
                  <span className="current">1</span>
                  <span>›</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-feature-strip" id="como-funciona">
        {featureCards.map((feature) => (
          <article key={feature.title}>
            <span className="home-feature-icon" aria-hidden="true">
              <ProjectIcon name={feature.icon} />
            </span>
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>

      {isLoginOpen ? (
        <div
          className="home-login-overlay"
          role="presentation"
          onMouseDown={() => setIsLoginOpen(false)}
        >
          <div
            className="home-login-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-login-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="home-login-close"
              aria-label="Fechar login"
              onClick={() => setIsLoginOpen(false)}
            >
              ×
            </button>
            <div className="home-login-header">
              <p>ACESSO AO SISTEMA</p>
              <h2 id="home-login-title">Entrar no Docneitor</h2>
            </div>
            <form className="home-login-form" onSubmit={handleLogin}>
              <label htmlFor="landing-login-email">
                E-mail
                <input
                  id="landing-login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label htmlFor="landing-login-password">
                Senha
                <input
                  id="landing-login-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>
              {loginError ? <p className="home-login-error">{loginError}</p> : null}
              <button type="submit" className="home-login-submit" disabled={isSubmittingLogin}>
                {isSubmittingLogin ? 'Entrando' : 'Entrar'}
              </button>
            </form>
            <p className="home-login-signup">
              Ainda não tem conta? <Link href="/signup">Criar cadastro</Link>
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
