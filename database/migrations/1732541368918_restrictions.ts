import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'restrictions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('descripcion')
      table.date('fecha_inicio')
      table.date('fecha_fin')
      table.integer('operation_id').unsigned().references('id').inTable('operations').onDelete('CASCADE')
      table.integer('municipality_id').unsigned().references('id').inTable('municipalities').onDelete('CASCADE')
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos').onDelete('CASCADE')

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
