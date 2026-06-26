import { ProjectWorkspace } from '~/features/projects/components/project_workspace'
import type { ProjectDashboardProps } from '~/features/projects/types'

export default function ProjectsList(props: ProjectDashboardProps) {
  return <ProjectWorkspace {...props} variant="projects" />
}
