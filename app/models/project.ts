import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import DocumentationEntry from '#models/documentation_entry'
import LlmProviderConfig from '#models/llm_provider_config'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare repositoryUrl: string

  @column()
  declare gitProvider: string

  @column({ serializeAs: null })
  declare webhookSecret: string

  @column()
  declare llmProviderConfigId: string | null

  @belongsTo(() => LlmProviderConfig)
  declare llmProviderConfig: BelongsTo<typeof LlmProviderConfig>

  @hasMany(() => DocumentationEntry)
  declare documentationEntries: HasMany<typeof DocumentationEntry>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
