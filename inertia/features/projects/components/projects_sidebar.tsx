import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import { csrfHeaders } from '~/lib/csrf'
import type { CurrentProjectUser, ProjectWorkspaceVariant } from '../types'
import { ProjectIcon } from './project_icon'

type ProjectsSidebarProps = {
  currentUser: CurrentProjectUser
  variant: ProjectWorkspaceVariant
}

export function ProjectsSidebar({ currentUser, variant }: ProjectsSidebarProps) {
  const isHome = variant === 'home'
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isUserMenuOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isUserMenuOpen])

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
    <aside className="projects-sidebar" aria-label="Navegação de projetos">
      <div className="projects-sidebar-top">
        <Link href="/" className="projects-brand">
          <span className="projects-brand-mark" aria-hidden="true" />
          <span>Docneitor</span>
        </Link>
      </div>

      <nav className="projects-nav">
        <Link href="/home" className={isHome ? 'active' : ''}>
          <ProjectIcon name="home" className="projects-nav-icon" />
          Início
        </Link>
        <Link href="/projects" className={!isHome ? 'active' : ''}>
          <ProjectIcon name="folder" className="projects-nav-icon" />
          Projetos
        </Link>
        {/* <a href="#documentacoes">
          <ProjectIcon name="fileText" className="projects-nav-icon" />
          Documentações
        </a>
        <a href="#providers">
          <ProjectIcon name="cpu" className="projects-nav-icon" />
          Providers
        </a>
        <a href="#configuracoes">
          <ProjectIcon name="settings" className="projects-nav-icon" />
          Configurações
        </a> */}
      </nav>

      <div className="projects-sidebar-footer">
        <div className="projects-user-menu" ref={userMenuRef}>
          {isUserMenuOpen ? (
            <div className="projects-user-actions" role="menu" aria-label="Ações do usuário">
              <button
                type="button"
                className="projects-user-action"
                role="menuitem"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <ProjectIcon name="settings" className="projects-user-action-icon" />
                Configurações
              </button>
              <button
                type="button"
                className="projects-user-action projects-user-action-danger"
                role="menuitem"
                onClick={handleLogout}
              >
                <ProjectIcon name="logOut" className="projects-user-action-icon" />
                Logout
              </button>
            </div>
          ) : null}

          <button
            type="button"
            className="projects-user"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="menu"
            onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
          >
            <span className="projects-user-avatar">{currentUser.initials}</span>
            <span className="projects-user-text">
              <strong>{currentUser.name}</strong>
              <small>{currentUser.email}</small>
            </span>
            <ProjectIcon
              name="chevronDown"
              className={`projects-chevron-down ${isUserMenuOpen ? 'open' : ''}`}
            />
          </button>
        </div>
      </div>
    </aside>
  )
}
