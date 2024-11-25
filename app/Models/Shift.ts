import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_time: Date

  @column()
  public end_time: Date

  @column()
  public location: string

  @column()
  public conductor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Conductor, {
    //que está contenido en los conductores
    foreignKey: "conductor_id", 
  })
  public conductor: BelongsTo<typeof Conductor>;
}
