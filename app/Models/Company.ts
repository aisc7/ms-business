import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import NaturalPerson from './NaturalPerson'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_type: string

  @column()
  public fiscal_address: string

  @column()
  public customer_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, { 
    foreignKey: "customer_id",
  })
  public customer: BelongsTo<typeof Customer>;

  @hasOne(() => NaturalPerson, {
    foreignKey: "company_id", //Clave foránea que relaciona la identidad dominada
  })
  public NaturalPeople: HasOne<typeof NaturalPerson>;

}