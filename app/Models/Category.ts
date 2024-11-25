import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import CategoryProduct from './CategoryProduct'
import Product from './Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CategoryProduct, {
    foreignKey: 'category_id'
  })
  public categoryproducts: HasMany<typeof CategoryProduct>

  @hasManyThrough([() => Product, () => CategoryProduct], {
    localKey: 'id',
    foreignKey: 'category_id',
    throughLocalKey: 'product_id',
    throughForeignKey: 'id'
  })
  public products: HasManyThrough<typeof Product>
}
