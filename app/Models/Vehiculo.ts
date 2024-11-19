import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough} from '@ioc:Adonis/Lucid/Orm'
import VehicleDriver from './VehicleDriver'
import Conductor from './Conductor'
import OwnerVehicle from './OwnerVehicle'
import Dueno from './Dueno'
import Route from './Route'
import Contract from './Contract'
import Seguro from './Seguro'
import Operation from './Operation'
import Municipality from './Municipality'

export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_vehiculo: string

  @column()
  public capacidad_peso: number

  @column()
  public capacidad_volumen: number

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => VehicleDriver, {
    foreignKey: 'vehiculo_id'
  })
  public vehicledrivers: HasMany<typeof VehicleDriver>

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'vehiculo_id'
  })
  public ownervehicles: HasMany<typeof OwnerVehicle>

  @hasMany(() => Route, {
    foreignKey: 'vehiculo_id'
  })
  public routes: HasMany<typeof Route>

  @hasMany(() => Seguro, {
    foreignKey: 'vehiculo_id'
  })
  public seguros: HasMany<typeof Seguro>

  @hasMany(() => Operation, {
    foreignKey: 'vehiculo_id'
  })
  public operations: HasMany<typeof Operation>

  @hasManyThrough([() => Conductor, () => VehicleDriver], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'vehiculo_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'conductor_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Conductor>

  @hasManyThrough([() => Municipality, () => Operation], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'vehiculo_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'municipality_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public municipalities: HasManyThrough<typeof Municipality>

  @hasManyThrough([() => Dueno, () => OwnerVehicle], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'vehiculo_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'dueno_id', // Clave foránea en VehicleDriver que referencia al Dueno
    throughForeignKey: 'id' // ID en Dueno
  })
  public duenos: HasManyThrough<typeof Dueno>

  @hasManyThrough([() => Contract, () => Route], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'vehiculo_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'contract_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public contracts: HasManyThrough<typeof Contract>
}
