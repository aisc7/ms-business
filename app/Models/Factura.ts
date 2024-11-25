import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'
import Spent from './Spent'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_emision: string

  @column()
  public monto_total: number

  @column()
  public estado: string

  @column()
  public cuota_id: number|null

  @column()
  public spent_id: number|null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cuota, {
    foreignKey: 'cuota_id',
  })
  public cuota: BelongsTo<typeof Cuota>  

  @belongsTo(() => Spent, {
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de quota
    foreignKey: "spent_id",
  })
  public spent: BelongsTo<typeof Spent>;

}
