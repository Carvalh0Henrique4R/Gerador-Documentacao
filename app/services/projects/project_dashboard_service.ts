import type DocumentationEntry from '#models/documentation_entry'
import Project from '#models/project'

const failureStatuses = new Set(['failed', 'failure', 'error', 'falha'])

export type ProjectDashboardItem = {
  id: string
  name: string
  repositoryUrl: string
  gitProvider: string
  llmProvider: string
  documentationCount: number
  latestDocumentation: {
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
  projects: ProjectDashboardItem[]
  stats: ProjectDashboardStats
}

export default class ProjectDashboardService {
  async getDashboardProps(userId: string): Promise<ProjectDashboardProps> {
    const projects = await Project.query()
      .where('user_id', userId)
      .preload('llmProviderConfig')
      .preload('documentationEntries', (query) => query.orderBy('created_at', 'desc'))
      .orderBy('created_at', 'desc')

    const documentationEntries = projects.flatMap((project) => project.documentationEntries)

    return {
      projects: projects.map((project) => this.serializeProject(project)),
      stats: {
        projects: projects.length,
        documentations: documentationEntries.length,
        failures: this.countFailures(documentationEntries),
        providers: new Set(projects.map((project) => project.gitProvider)).size,
      },
    }
  }

  private serializeProject(project: Project): ProjectDashboardItem {
    const latestDocumentation = project.documentationEntries[0] || null

    return {
      id: project.id,
      name: project.name,
      repositoryUrl: project.repositoryUrl,
      gitProvider: project.gitProvider,
      llmProvider: project.llmProviderConfig?.provider || 'none',
      documentationCount: project.documentationEntries.length,
      latestDocumentation: latestDocumentation
        ? {
            status: latestDocumentation.status,
            createdAt: latestDocumentation.createdAt.toISO() || '',
          }
        : null,
    }
  }

  private countFailures(entries: DocumentationEntry[]) {
    return entries.filter((entry) => failureStatuses.has(entry.status.toLowerCase())).length
  }
}
