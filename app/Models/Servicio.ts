import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Spent from './Spent'
import Conductor from './Conductor'
import Administrator from './Administrator'
import Hotel from './Hotel'
import Restaurant from './Restaurant'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion: string

  @column()
  public costo: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Spent, {
    foreignKey: 'servicio_id'
  })
  public spents: HasMany<typeof Spent>

  @hasManyThrough([() => Conductor, () => Spent], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'servicio_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'conductor_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Conductor>

  @hasOne(() => Administrator, {
    foreignKey: 'servicio_id', // La clave foránea en el modelo Factura
  })
  public administrador: HasOne<typeof Administrator>

  @hasOne(() => Hotel, {
    foreignKey: "servicio_id",
  })
  public hotel: HasOne<typeof Hotel>

  @hasOne(() => Restaurant, {
    foreignKey: "servicio_id",
  })
  public restaurant: HasOne<typeof Restaurant>
}
