import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryProducts extends BaseSchema {
  protected tableName = 'category_products' // Nombre de la tabla intermedia

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.date('fecha_asignacion')
      table.date('fecha_desasignacion')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE') // Clave foránea para `product`
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE') // Clave foránea para `category`
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}