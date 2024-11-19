import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string;
  
  @column()
  public servicio_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio, {
    foreignKey: "servicio_id",
  })
  public servicio: BelongsTo<typeof Servicio>;
}
