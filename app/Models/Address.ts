import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, hasManyThrough, HasManyThrough, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import DistributionCenter from './DistributionCenter'
import AddreRouteOrder from './AddreRouteOrder'
import Route from './Route'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string //calle

  @column()
  public number: string //numero#

  @column()
  public neighborhood: string //barrio

  @column()
  public reference: string //referencia

  @column()
  public municipality_id: number //municipio_id

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Municipality,{
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>

  @hasOne(() => DistributionCenter,{
    foreignKey: 'address_id'
  })
  public distributionCenter: HasOne<typeof DistributionCenter>

  @hasMany(() => AddreRouteOrder, {
    foreignKey: 'address_id'
  })
  public addrerouteorders: HasMany<typeof AddreRouteOrder>

  @hasManyThrough([() => Route, () => AddreRouteOrder], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'address_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'route_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Route>
}