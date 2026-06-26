import { ButtonLink } from '~/components/ui/button'
import type { ProjectWorkspaceVariant } from '../types'
import { ProjectIcon } from './project_icon'

const pageCopy: Record<
  ProjectWorkspaceVariant,
  { eyebrow: string; title: string; description: string }
> = {
  home: {
    eyebrow: 'INÍCIO',
    title: 'Início',
    description: 'Acompanhe os indicadores reais da geração de documentação técnica.',
  },
  projects: {
    eyebrow: 'PROJETOS',
    title: 'Projetos',
    description: 'Gerencie seus repositórios, providers e histórico de documentação.',
  },
}

type ProjectsHeaderProps = {
  variant: ProjectWorkspaceVariant
}

export function ProjectsHeader({ variant }: ProjectsHeaderProps) {
  const copy = pageCopy[variant]

  return (
    <div className="projects-header">
      <div className="projects-heading">
        <span className="projects-eyebrow">{copy.eyebrow}</span>
        <h1>
          {variant === 'home' ? <ProjectIcon name="home" className="projects-title-icon" /> : null}
          {copy.title}
        </h1>
        <p>{copy.description}</p>
      </div>

      <ButtonLink href="/projects/create" className="projects-create-button">
        <ProjectIcon name="plus" className="projects-button-icon" />
        Novo projeto
      </ButtonLink>
    </div>
  )
}
