import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'spents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description')
      table.integer('monto')
      table.date('date')
      table.integer('servicio_id').unsigned().references('servicios.id').onDelete('CASCADE')
      table.integer('conductor_id').unsigned().references('conductors.id').onDelete('CASCADE')
      table.integer('dueno_id').unsigned().references('duenos.id').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
