import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Vehiculo from './Vehiculo'
import Batch from './Batch'
import AddreRouteOrder from './AddreRouteOrder'
import Address from './Address'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public startingPlace: string

  @column()
  public endingPlace: string

  @column()
  public distance: number

  @column()
  public deliveryDate: DateTime

  @column()
  public contract_id: number

  @column()
  public vehiculo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Contract,{
    foreignKey: 'contract_id'
  })
  public contract: BelongsTo<typeof Contract>

  @belongsTo(() => Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @hasMany(() => Batch, {
    foreignKey: "route_id", //Clave foránea que relaciona la identidad dominada
  })
  public batches: HasMany<typeof Batch>;

  @hasMany(() => AddreRouteOrder, {
    foreignKey: 'route_id'
  })
  public addrerouteorders: HasMany<typeof AddreRouteOrder>

  @hasManyThrough([() => Address, () => AddreRouteOrder], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'route_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'address_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Address>
}
