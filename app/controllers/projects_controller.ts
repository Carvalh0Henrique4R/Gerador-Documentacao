import DocumentationEntry from '#models/documentation_entry'
import LlmProviderConfig, { type LlmProviderName } from '#models/llm_provider_config'
import Project from '#models/project'
import { inertiaPages } from '#services/inertia_pages'
import ProjectDashboardService from '#services/projects/project_dashboard_service'
import { llmProviderConfigValidator, projectValidator } from '#validators/project'
import encryption from '@adonisjs/core/services/encryption'
import type { HttpContext } from '@adonisjs/core/http'

const providersWithoutKey: LlmProviderName[] = ['ollama', 'none']

export default class ProjectsController {
  private readonly dashboardService = new ProjectDashboardService()

  async dashboard(ctx: HttpContext) {
    return ctx.inertia.render(
      inertiaPages.projects.home,
      await this.dashboardService.getDashboardProps(this.userId(ctx))
    )
  }

  async index(ctx: HttpContext) {
    return ctx.inertia.render(
      inertiaPages.projects.list,
      await this.dashboardService.getDashboardProps(this.userId(ctx))
    )
  }

  async create({ inertia }: HttpContext) {
    return inertia.render(inertiaPages.projects.create, {})
  }

  async store(ctx: HttpContext) {
    const { request, response, session } = ctx
    const payload = await request.validateUsing(projectValidator)

    await Project.create({
      ...payload,
      userId: this.userId(ctx),
    })

    session.flash('success', 'Projeto cadastrado com sucesso.')
    return response.redirect().toRoute('projects.index')
  }

  async llmSettings(ctx: HttpContext) {
    const { params, inertia } = ctx
    const project = await this.findUserProjectOrFail(params.id, this.userId(ctx))
    const config = project.llmProviderConfigId
      ? await LlmProviderConfig.find(project.llmProviderConfigId)
      : null

    return inertia.render(inertiaPages.projects.llmSettings, {
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

  async saveLlmSettings(ctx: HttpContext) {
    const { params, request, response, session } = ctx
    const project = await this.findUserProjectOrFail(params.id, this.userId(ctx))
    const payload = await request.validateUsing(llmProviderConfigValidator)
    const existing = project.llmProviderConfigId
      ? await LlmProviderConfig.find(project.llmProviderConfigId)
      : null
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

    const values = {
      provider,
      model: payload.model || null,
      baseUrl: payload.baseUrl || null,
      encryptedApiKey,
      isActive: payload.isActive ?? true,
    }

    const config = existing
      ? await existing.merge(values).save()
      : await LlmProviderConfig.create(values)

    if (project.llmProviderConfigId !== config.id) {
      project.llmProviderConfigId = config.id
      await project.save()
    }

    session.flash('success', 'Configuração de LLM salva com segurança.')
    return response.redirect().toRoute('projects.llm_settings', { id: project.id })
  }

  async documentation(ctx: HttpContext) {
    const { params, inertia } = ctx
    const project = await this.findUserProjectOrFail(params.id, this.userId(ctx))
    const entries = await DocumentationEntry.query()
      .where('project_id', project.id)
      .orderBy('created_at', 'desc')

    return inertia.render(inertiaPages.projects.documentation, {
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

  private userId(ctx: HttpContext) {
    return ctx.jwtUser!.id
  }

  private findUserProjectOrFail(projectId: string, userId: string) {
    return Project.query().where('id', projectId).where('user_id', userId).firstOrFail()
  }
}
