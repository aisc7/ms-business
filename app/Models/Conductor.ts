import { DateTime } from 'luxon'
import { BaseModel, column, HasMany,hasOne, HasOne, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import VehicleDriver from './VehicleDriver'
import Vehiculo from './Vehiculo'
import Spent from './Spent'
import Servicio from './Servicio'
import Shift from './Shift'
import Dueno from './Dueno'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public nombre: string

  @column()
  public licencia: string

  @column()
  public tipo_licencia: string

  @column()
  public telefono: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Shift, {
    foreignKey: 'conductor_id',
  })
  public shifts: HasMany<typeof Shift>;  

  @hasMany(() => VehicleDriver, {
    foreignKey: 'conductor_id'
  })
  public vehicledrivers: HasMany<typeof VehicleDriver>

  @hasOne(() => Dueno, {
    foreignKey: "conductor_id",
  })
  public owner: HasOne<typeof Dueno>;

  @hasManyThrough([() => Vehiculo, () => VehicleDriver], {
    localKey: 'id', // ID en Conductor
    foreignKey: 'conductor_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'vehiculo_id', // Clave foránea en VehicleDriver que referencia al vehículo
    throughForeignKey: 'id' // ID en Vehiculo
  })
  public vehiculos: HasManyThrough<typeof Vehiculo>

  @hasMany(() => Spent, {
    foreignKey: 'conductor_id'
  })
  public spents: HasMany<typeof Spent>

  @hasManyThrough([() => Servicio, () => Spent], {
    localKey: 'id', // ID en Conductor
    foreignKey: 'conductor_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'servicio_id', // Clave foránea en VehicleDriver que referencia al vehículo
    throughForeignKey: 'id' // ID en Vehiculo
  })
  public servicios: HasManyThrough<typeof Servicio>
}
