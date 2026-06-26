import { resolveCurrentUser } from '../formatters'
import type { ProjectDashboardProps, ProjectWorkspaceVariant } from '../types'
import { ProjectsHeader } from './projects_header'
import { ProjectsMetrics } from './projects_metrics'
import { ProjectsSidebar } from './projects_sidebar'
import { ProjectsTable } from './projects_table'

type ProjectWorkspaceProps = ProjectDashboardProps & {
  variant: ProjectWorkspaceVariant
}

export function ProjectWorkspace({ projects = [], stats, user, variant }: ProjectWorkspaceProps) {
  return (
    <section className="projects-dashboard">
      <ProjectsSidebar currentUser={resolveCurrentUser(user)} variant={variant} />

      <div className="projects-content">
        <div className="projects-shell">
          <ProjectsHeader variant={variant} />
          {variant === 'home' ? <ProjectsMetrics projects={projects} stats={stats} /> : null}
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </section>
  )
}
