import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('name', 160).notNullable()
      table.string('repository_url', 500).notNullable()
      table.string('git_provider', 40).notNullable()
      table.string('webhook_secret', 500).notNullable()
      table.uuid('llm_provider_config_id').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
