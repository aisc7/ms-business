import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('name').notNullable() // Nombre del producto
      table.text('description').notNullable() // Descripción del producto
      table.integer('batch_id').unsigned().references('batches.id').onDelete('CASCADE')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE')
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}