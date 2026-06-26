import { ProjectWorkspace } from '~/features/projects/components/project_workspace'
import type { ProjectDashboardProps } from '~/features/projects/types'

export default function ProjectsHome(props: ProjectDashboardProps) {
  return <ProjectWorkspace {...props} variant="home" />
}
