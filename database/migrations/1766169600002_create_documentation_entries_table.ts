import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documentation_entries'

  async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table
        .uuid('project_id')
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
      table.string('source_type', 40).notNullable()
      table.string('source_ref', 255).notNullable()
      table.string('status', 40).notNullable()
      table.text('generated_content').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
