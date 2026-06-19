import vine from '@vinejs/vine'

export const projectValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(160),
  repositoryUrl: vine.string().trim().url().maxLength(500),
  gitProvider: vine.enum(['github', 'gitlab', 'bitbucket', 'azure_devops', 'other']),
  webhookSecret: vine.string().trim().minLength(8).maxLength(500),
})

export const llmProviderConfigValidator = vine.create({
  provider: vine.enum(['anthropic', 'openai', 'google', 'ollama', 'none']),
  model: vine.string().trim().maxLength(160).optional().nullable(),
  apiKey: vine.string().trim().maxLength(1000).optional().nullable(),
  baseUrl: vine.string().trim().url().maxLength(500).optional().nullable(),
  isActive: vine.boolean().optional(),
})
