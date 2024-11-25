import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FacturasSchema extends BaseSchema {
  protected tableName = 'facturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fecha_emision')
      table.integer('monto_total')
      table.string('estado')
      
      // Foreign Key
      table.integer('cuota_id').unsigned().references('id').inTable('cuotas').onDelete('CASCADE')
    //NO ELIMINAR >:/
      table.integer('spent_id').unsigned().references('id').inTable('spents').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
