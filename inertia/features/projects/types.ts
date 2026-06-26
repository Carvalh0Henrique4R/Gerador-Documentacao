export type ProjectListItem = {
  id: string
  name: string
  repositoryUrl: string
  gitProvider: string
  llmProvider?: string
  documentationCount?: number
  latestDocumentation?: {
    status: string
    createdAt: string
  } | null
}

export type ProjectDashboardStats = {
  projects: number
  documentations: number
  failures: number
  providers: number
}

export type ProjectDashboardProps = {
  projects?: ProjectListItem[]
  stats?: ProjectDashboardStats
  user?: ProjectUser
}

export type ProjectUser = {
  fullName?: string | null
  email?: string | null
  initials?: string | null
}

export type CurrentProjectUser = {
  name: string
  email: string
  initials: string
}

export type ProjectWorkspaceVariant = 'home' | 'projects'

export type ProjectMetricCard = {
  key: 'projects' | 'docs' | 'failures' | 'providers'
  label: string
  value: (projects: ProjectListItem[], stats?: ProjectDashboardStats) => number
  hint: string
  tone: 'orange' | 'blue' | 'red' | 'violet'
}

export type ProjectStatusView = {
  label: string
  tone: 'success' | 'warning' | 'muted'
  className: string
  time: string
  ago: string
}
