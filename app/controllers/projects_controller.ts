import DocumentationEntry from '#models/documentation_entry'
import LlmProviderConfig, { type LlmProviderName } from '#models/llm_provider_config'
import Project from '#models/project'
import { llmProviderConfigValidator, projectValidator } from '#validators/project'
import encryption from '@adonisjs/core/services/encryption'
import type { HttpContext } from '@adonisjs/core/http'

const providersWithoutKey: LlmProviderName[] = ['ollama', 'none']

export default class ProjectsController {
  async index({ inertia }: HttpContext) {
    const projects = await Project.query().orderBy('created_at', 'desc')

    return inertia.render('projects/index', {
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        repositoryUrl: project.repositoryUrl,
        gitProvider: project.gitProvider,
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('projects/create', {})
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(projectValidator)

    await Project.create(payload)

    session.flash('success', 'Projeto cadastrado com sucesso.')
    return response.redirect().toRoute('projects.index')
  }

  async llmSettings({ params, inertia }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const config = await LlmProviderConfig.findBy('project_id', project.id)

    return inertia.render('projects/llm_settings', {
      project,
      config: config
        ? {
            provider: config.provider,
            model: config.model,
            baseUrl: config.baseUrl,
            isActive: config.isActive,
            hasApiKey: Boolean(config.encryptedApiKey),
          }
        : null,
    })
  }

  async saveLlmSettings({ params, request, response, session }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const payload = await request.validateUsing(llmProviderConfigValidator)
    const existing = await LlmProviderConfig.findBy('project_id', project.id)
    const provider = payload.provider as LlmProviderName
    const normalizedApiKey = payload.apiKey?.trim() || null

    if (
      !providersWithoutKey.includes(provider) &&
      !normalizedApiKey &&
      !existing?.encryptedApiKey
    ) {
      session.flash('error', 'Informe uma API key para este provider.')
      return response.redirect().back()
    }

    const encryptedApiKey = providersWithoutKey.includes(provider)
      ? null
      : normalizedApiKey
        ? encryption.encrypt(normalizedApiKey)
        : existing?.encryptedApiKey || null

    await LlmProviderConfig.updateOrCreate(
      { projectId: project.id },
      {
        projectId: project.id,
        provider,
        model: payload.model || null,
        baseUrl: payload.baseUrl || null,
        encryptedApiKey,
        isActive: Boolean(payload.isActive),
      }
    )

    session.flash('success', 'Configuração de LLM salva com segurança.')
    return response.redirect().toRoute('projects.llm_settings', { id: project.id })
  }

  async documentation({ params, inertia }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const entries = await DocumentationEntry.query()
      .where('project_id', project.id)
      .orderBy('created_at', 'desc')

    return inertia.render('projects/documentation', {
      project: {
        id: project.id,
        name: project.name,
      },
      entries: entries.map((entry) => ({
        id: entry.id,
        sourceType: entry.sourceType,
        sourceRef: entry.sourceRef,
        status: entry.status,
        createdAt: entry.createdAt.toISO() || '',
      })),
    })
  }
}
