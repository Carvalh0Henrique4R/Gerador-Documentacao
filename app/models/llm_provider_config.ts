import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Project from '#models/project'

export type LlmProviderName = 'anthropic' | 'openai' | 'google' | 'ollama' | 'none'

export default class LlmProviderConfig extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectId: number

  @column()
  declare provider: LlmProviderName

  @column()
  declare model: string | null

  @column({ serializeAs: null })
  declare encryptedApiKey: string | null

  @column()
  declare baseUrl: string | null

  @column()
  declare isActive: boolean

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
