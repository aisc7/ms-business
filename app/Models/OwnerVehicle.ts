import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Dueno from './Dueno'

export default class OwnerVehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fechaAsignacion: DateTime

  @column()
  public fechaDesasignacion: DateTime

  @column()
  public vehiculo_id: number

  @column()
  public dueno_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Dueno,{
    foreignKey: 'dueno_id'
  })
  public dueno: BelongsTo<typeof Dueno>
}
