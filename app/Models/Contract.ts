import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota';
import Route from './Route';
import Vehiculo from './Vehiculo';
import Customer from './Customer';

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio: Date;

  @column()
  public fecha_fin: Date;

  @column()
  public estado: string

  @column()
  public detalles_servicio: string

  @column()
  public customer_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Cuota,{
    // nombre de la clave foránea en el modelo Cuota
    foreignKey: 'contract_id'
  })
  public cuotas: HasMany<typeof Cuota>

  @hasMany(() => Route, {
    foreignKey: 'contract_id'
  })
  public routes: HasMany<typeof Route>

  @hasManyThrough([() => Vehiculo, () => Route], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'contract_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'vehicle_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public vehicles: HasManyThrough<typeof Vehiculo>

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id' // clave foránea que relaciona Contract con Customer
  })
  public customer: BelongsTo<typeof Customer>
}
