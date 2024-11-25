import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import AddreRouteOrder from './AddreRouteOrder'

export default class Anotation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha:DateTime

  @column()
  public descripcion:string

  @column()
  public addreroute_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => AddreRouteOrder, {
    foreignKey: 'addreroute_id'//Clave foránea que relaciona con la identidad dominante
  })
  public addreroute: BelongsTo<typeof AddreRouteOrder>
}
