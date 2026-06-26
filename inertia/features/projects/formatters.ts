import type { CurrentProjectUser, ProjectListItem, ProjectUser } from './types'

const gitProviderLabels: Record<string, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  bitbucket: 'Bitbucket',
  azure_devops: 'Azure DevOps',
  other: 'Outro',
}

const llmProviderLabels: Record<string, string> = {
  anthropic: 'Anthropic',
  google: 'Google',
  none: 'Sem LLM',
  ollama: 'Ollama',
  openai: 'OpenAI',
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function repositoryLabel(repositoryUrl: string) {
  return repositoryUrl
    .replace(/^https?:\/\//, '')
    .replace(/^git@/, '')
    .replace(':', '/')
}

export function providerLabel(provider: string) {
  return gitProviderLabels[provider?.toLowerCase()] || provider || 'GitHub'
}

export function projectDescription(project: ProjectListItem) {
  const slug = repositoryLabel(project.repositoryUrl).split('/').pop() || project.name

  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .slice(0, 38)
}

export function llmProviderLabelFromProject(project: ProjectListItem) {
  return llmProviderLabels[project.llmProvider || ''] || project.llmProvider || 'Sem LLM'
}

export function resolveCurrentUser(user?: ProjectUser): CurrentProjectUser {
  const fallbackName = 'João da Silva'
  const name = user?.fullName || fallbackName

  return {
    name,
    email: user?.email || 'joao@empresa.com',
    initials: user?.initials || initials(name),
  }
}
