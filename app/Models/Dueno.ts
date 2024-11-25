import { DateTime } from 'luxon'
import { BaseModel, column, HasMany,belongsTo, BelongsTo, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import OwnerVehicle from './OwnerVehicle'
import Vehiculo from './Vehiculo'
import Conductor from './Conductor'
import Spent from './Spent'

export default class Dueno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public conductor_id: number;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'dueno_id'
  })
  public ownervehicles: HasMany<typeof OwnerVehicle>

  @hasManyThrough([() => Vehiculo, () => OwnerVehicle], {
    localKey: 'id',
    foreignKey: 'dueno_id',
    throughLocalKey: 'vehiculo_id',
    throughForeignKey: 'id'
  })
  public vehiculos: HasManyThrough<typeof Vehiculo>


  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id",
  })
  public conductor: BelongsTo<typeof Conductor>;

  @hasMany(() => Spent, {
    foreignKey: 'dueno_id'
  })
  public spents: HasMany<typeof Spent>


  
}