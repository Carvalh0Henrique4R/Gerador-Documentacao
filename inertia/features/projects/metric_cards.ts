import { isFailureStatus } from './project_status'
import type { ProjectMetricCard } from './types'

export const projectMetricCards: ProjectMetricCard[] = [
  {
    key: 'projects',
    label: 'Projetos',
    value: (projects, stats) => stats?.projects ?? projects.length,
    hint: 'Total cadastrados',
    tone: 'orange',
  },
  {
    key: 'docs',
    label: 'Documentações',
    value: (projects, stats) =>
      stats?.documentations ??
      projects.reduce((total, project) => total + (project.documentationCount || 0), 0),
    hint: 'Geradas no total',
    tone: 'blue',
  },
  {
    key: 'failures',
    label: 'Falhas',
    value: (projects, stats) =>
      stats?.failures ??
      projects.filter((project) => isFailureStatus(project.latestDocumentation?.status)).length,
    hint: 'Últimos 7 dias',
    tone: 'red',
  },
  {
    key: 'providers',
    label: 'Providers',
    value: (projects, stats) =>
      stats?.providers ?? new Set(projects.map((project) => project.gitProvider)).size,
    hint: 'Git providers ativos',
    tone: 'violet',
  },
]
