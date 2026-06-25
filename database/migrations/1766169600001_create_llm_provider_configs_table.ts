import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'llm_provider_configs'

  async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('provider', 40).notNullable()
      table.string('model', 160).nullable()
      table.text('encrypted_api_key').nullable()
      table.string('base_url', 500).nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.alterTable('projects', (table) => {
      table
        .foreign('llm_provider_config_id')
        .references('id')
        .inTable(this.tableName)
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.defer((db) =>
      db.rawQuery(
        'ALTER TABLE "projects" DROP CONSTRAINT IF EXISTS "projects_llm_provider_config_id_foreign"'
      )
    )

    this.schema.dropTable(this.tableName)
  }
}
