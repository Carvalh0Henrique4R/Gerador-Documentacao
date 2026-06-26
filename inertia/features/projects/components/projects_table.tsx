import { Link } from '@adonisjs/inertia/react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import {
  initials,
  llmProviderLabelFromProject,
  projectDescription,
  providerLabel,
  repositoryLabel,
} from '../formatters'
import { projectStatus } from '../project_status'
import type { ProjectListItem } from '../types'
import { ProjectIcon } from './project_icon'

type ProjectsTableProps = {
  projects: ProjectListItem[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const paginationStart = projects.length > 0 ? 1 : 0
  const paginationEnd = Math.min(projects.length, 10)

  return (
    <Card className="projects-table-card">
      <CardHeader className="projects-table-header">
        <CardTitle>Projetos cadastrados</CardTitle>
        <span className="projects-table-count">
          {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
        </span>
      </CardHeader>

      <ProjectsToolbar />

      <div className="projects-table-wrap">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Repositório</th>
              <th>Provider</th>
              <th>Provider LLM</th>
              <th>Última geração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <ProjectTableRow index={index} key={project.id} project={project} />
            ))}
          </tbody>
        </table>

        {projects.length === 0 ? (
          <div className="projects-empty-state">
            <h3>Nenhum projeto cadastrado</h3>
            <p>Cadastre o primeiro repositório para configurar o fluxo de documentação.</p>
          </div>
        ) : null}
      </div>

      <footer className="projects-pagination">
        <p>
          Mostrando {paginationStart} a {paginationEnd} de {projects.length} projetos
        </p>
        <div className="projects-pagination-controls">
          <button className="projects-page-button" type="button" aria-label="Página anterior">
            ‹
          </button>
          <span className="projects-page-current">1</span>
          <button className="projects-page-button" type="button" aria-label="Próxima página">
            ›
          </button>
          <button className="projects-page-size" type="button">
            10 por página
            <ProjectIcon name="chevronDown" className="projects-chevron-down" />
          </button>
        </div>
      </footer>
    </Card>
  )
}

function ProjectsToolbar() {
  return (
    <div className="projects-toolbar">
      <div className="projects-toolbar-group">
        <label className="projects-search">
          <ProjectIcon name="search" className="projects-search-icon" />
          <Input aria-label="Buscar projetos" placeholder="Buscar projetos..." type="search" />
        </label>
        <Select
          aria-label="Filtrar por status"
          className="projects-select projects-status-select"
          defaultValue="all"
          options={[
            { label: 'Status: Todos', value: 'all' },
            { label: 'Ativo', value: 'active' },
            { label: 'Gerando', value: 'generating' },
            { label: 'Falha', value: 'failed' },
          ]}
        />
      </div>

      <div className="projects-toolbar-group projects-toolbar-group-right">
        <button className="projects-control projects-sort-button" type="button">
          <ProjectIcon name="sortDesc" className="projects-control-icon" />
          Última geração
          <ProjectIcon name="chevronDown" className="projects-chevron-down" />
        </button>
        <Button
          className="projects-control projects-refresh-button"
          type="button"
          variant="secondary"
        >
          <ProjectIcon name="refresh" className="projects-control-icon" />
          Atualizar
        </Button>
      </div>
    </div>
  )
}

function ProjectTableRow({ index, project }: { index: number; project: ProjectListItem }) {
  const status = projectStatus(project)

  return (
    <tr>
      <td>
        <div className="projects-name-cell">
          <span className={`projects-avatar tone-${index % 3}`}>{initials(project.name)}</span>
          <div>
            <strong>{project.name}</strong>
            <small>{projectDescription(project)}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="projects-repo-cell">
          <ProjectIcon name="github" className="projects-github-icon" />
          <span>{repositoryLabel(project.repositoryUrl)}</span>
        </div>
      </td>
      <td>
        <Badge className="projects-pill">
          <ProjectIcon name="github" className="projects-github-icon small" />
          {providerLabel(project.gitProvider)}
        </Badge>
      </td>
      <td>
        <Badge className="projects-pill projects-pill-llm" tone="muted">
          {llmProviderLabelFromProject(project)}
        </Badge>
      </td>
      <td>
        <span className="projects-date">{status.time}</span>
        <small>{status.ago}</small>
      </td>
      <td>
        <div className="projects-actions">
          <Link href={`/projects/${project.id}/settings/llm`}>LLM</Link>
          <Link href={`/projects/${project.id}/documentation`}>Docs</Link>
          {/* <button type="button" aria-label={`Mais ações para ${project.name}`}>
            <ProjectIcon name="moreVertical" className="projects-more-icon" />
          </button> */}
        </div>
      </td>
    </tr>
  )
}
