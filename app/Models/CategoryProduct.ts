import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Category from './Category'

export default class CategoryProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_asignacion: Date

  @column()
  public fecha_desasignacion: Date

  @column()
  public product_id: number

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product,{
    foreignKey: 'product_id'
  })
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Category,{
    foreignKey: 'category_id'
  })
  public category: BelongsTo<typeof Category>
}
