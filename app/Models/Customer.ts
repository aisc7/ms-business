import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Product from './Product'
import Company from './Company'
import NaturalPerson from './NaturalPerson'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  //id que se obtiene del ms-security
  @column()
  public userId: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string 

  @column()
  public order_count: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Contract, {
    foreignKey: 'customer_id'
  })
  public contracts: HasMany<typeof Contract>

  @hasMany(() => Product, {
    foreignKey: 'customer_id'
  })
  public products: HasMany<typeof Product>

  @hasOne(() => Company, {
    foreignKey: "customer_id",
  })
  public company: HasOne<typeof Company>

  @hasOne(() => NaturalPerson, {
    foreignKey: "customer_id",
  })
  public naturalperson: HasOne<typeof NaturalPerson>
}
