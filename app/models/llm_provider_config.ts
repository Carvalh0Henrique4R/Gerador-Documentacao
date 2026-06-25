import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Project from '#models/project'

export type LlmProviderName = 'anthropic' | 'openai' | 'google' | 'ollama' | 'none'

export default class LlmProviderConfig extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

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

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
