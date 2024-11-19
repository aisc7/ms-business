import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'owner_vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha_asignacion')
      table.date('fecha_desasignacion')
      table.integer('vehiculo_id').unsigned().references('vehiculos.id').onDelete('CASCADE')
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
