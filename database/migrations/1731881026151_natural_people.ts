import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'natural_people'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.string('user_id').notNullable()
      table.string("document_type").notNullable()
      table.string("document_number")
      table.dateTime("birth_date")
      table.integer("company_id").nullable() //Puede ser un valor null
      table.integer("customer_id").unsigned().references("customers.id")
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
