import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Conductor from './Conductor'

export default class VehicleDriver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public fecha_asignacion: DateTime

  @column.date()
  public fecha_desasignacion: DateTime

  @column()
  public vehiculo_id: number

  @column()
  public conductor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Conductor,{
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>
}
