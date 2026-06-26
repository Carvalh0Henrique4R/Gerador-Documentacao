import type { ProjectListItem, ProjectStatusView } from './types'

const failureStatuses = ['failed', 'failure', 'error', 'falha']
const generatingStatuses = ['pending', 'processing', 'generating', 'gerando']

export function isFailureStatus(status?: string | null) {
  return failureStatuses.includes((status || '').toLowerCase())
}

function isGeneratingStatus(status?: string | null) {
  return generatingStatuses.includes((status || '').toLowerCase())
}

function relativeTime(dateValue?: string | null) {
  if (!dateValue) return 'Sem histórico'

  const timestamp = new Date(dateValue).getTime()
  if (Number.isNaN(timestamp)) return 'Data indisponível'

  const diffInSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  if (diffInSeconds < 60) return 'Agora'

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} h atrás`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) return 'Ontem'
  if (diffInDays < 30) return `${diffInDays} dias atrás`

  return new Date(dateValue).toLocaleDateString('pt-BR')
}

function formatGeneratedAt(dateValue?: string | null) {
  if (!dateValue) return 'Nunca gerado'

  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'Data indisponível'

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function projectStatus(project: ProjectListItem): ProjectStatusView {
  const status = project.latestDocumentation?.status

  if (isGeneratingStatus(status)) {
    return {
      label: 'Gerando',
      tone: 'warning',
      className: 'projects-status-warning',
      time: formatGeneratedAt(project.latestDocumentation?.createdAt),
      ago: relativeTime(project.latestDocumentation?.createdAt),
    }
  }

  if (isFailureStatus(status)) {
    return {
      label: 'Falha',
      tone: 'muted',
      className: 'projects-status-danger',
      time: formatGeneratedAt(project.latestDocumentation?.createdAt),
      ago: relativeTime(project.latestDocumentation?.createdAt),
    }
  }

  return {
    label: status ? 'Ativo' : 'Sem docs',
    tone: 'success',
    className: 'projects-status-success',
    time: formatGeneratedAt(project.latestDocumentation?.createdAt),
    ago: relativeTime(project.latestDocumentation?.createdAt),
  }
}
