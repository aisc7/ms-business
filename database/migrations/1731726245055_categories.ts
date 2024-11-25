import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('name').notNullable() // Columna para el nombre de la categoría
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Fecha de creación
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()) // Fecha de actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}