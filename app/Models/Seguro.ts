import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'

export default class Seguro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public compania: string

  @column()
  public numeroPoliza: number

  @column()
  public fechaVencimiento: Date

  @column()
  public vehiculo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo,{
    // contract_id nombre de la foreing key en la tabla de cuotas
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>
}
