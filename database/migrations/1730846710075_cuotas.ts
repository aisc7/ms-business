import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('monto');
      table.date('fecha_vencimiento');
      table.string('estado_pago');
      table.integer("contract_id").unsigned().references("contracts.id").onDelete("CASCADE")
      
      table.timestamps(true);  // Esto crea `created_at` y `updated_at` automáticamente
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
