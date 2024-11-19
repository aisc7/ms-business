import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Route from './Route'
import Batch from './Batch'

export default class AddreRouteOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  address_id: number //direccion ID

  @column()
  route_id: number //ruta ID

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Address, {
    foreignKey: 'address_id',
  })
  public address: BelongsTo<typeof Address>

  @belongsTo(() => Route, {
    foreignKey: 'route_id' //Clave foránea que relaciona con la clase dominante
  })
  public route: BelongsTo<typeof Route>

  
  @hasOne(() => Batch, {
    foreignKey: 'addreroute_id' //Clave foránea que relaciona con la clase dominada 
  })
  public batch: HasOne<typeof Batch>
}