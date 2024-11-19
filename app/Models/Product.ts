import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import CategoryProduct from './CategoryProduct'
import Category from './Category'
import Batch from './Batch'
import Customer from './Customer'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string
  
  @column()
  public batch_id: number

  @column()
  public customer_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CategoryProduct, {
    foreignKey: 'product_id'
  })
  public categoryproducts: HasMany<typeof CategoryProduct>

  @hasManyThrough([() => Category, () => CategoryProduct], {
    localKey: 'id',
    foreignKey: 'product_id',
    throughLocalKey: 'category_id',
    throughForeignKey: 'id'
  })
  public categories: HasManyThrough<typeof Category>

  @belongsTo(() => Batch, {
    foreignKey: 'batch_id'//Clave foránea que relaciona con la identidad dominante
  })
  public batch: BelongsTo<typeof Batch>

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'//Clave foránea que relaciona con la identidad dominante
  })
  public customer: BelongsTo<typeof Customer>
}
