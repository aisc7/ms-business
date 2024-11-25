import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date("fecha_inicio")
      table.date("fecha_fin")
      table.string("estado")
      table.string('detalles_servicio')
      table.integer("customer_id").unsigned().references("customers.id").onDelete("CASCADE")

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
