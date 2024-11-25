import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Operation from './Operation'
import Municipality from './Municipality'
import Vehiculo from './Vehiculo'

export default class Restriction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion:string

  @column()
  public fecha_inicio:Date

  @column()
  public fecha_fin:Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Operation, {
    foreignKey: 'operation_id' // Clave foránea que relaciona con la operación
  })
  public operation: BelongsTo<typeof Operation>;

  @belongsTo(() => Municipality, {
    foreignKey: 'municipalityId' // Clave foránea que relaciona con el municipio
  })
  public municipality: BelongsTo<typeof Municipality>;

  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculoId' // Clave foránea que relaciona con el vehículo
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;
}
