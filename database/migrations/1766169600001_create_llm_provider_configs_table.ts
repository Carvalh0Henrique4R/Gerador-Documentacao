import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'llm_provider_configs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
      table.string('provider', 40).notNullable()
      table.string('model', 160).nullable()
      table.text('encrypted_api_key').nullable()
      table.string('base_url', 500).nullable()
      table.boolean('is_active').notNullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
