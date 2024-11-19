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
  public cuota_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cuota, {
    foreignKey: 'cuota_id',
  })
  public cuota: BelongsTo<typeof Cuota>  

  
  // Relación 'HasOne' que indica que una factura puede tener un único gasto asociado (uno a uno).
  @hasOne(() => Spent, {
    foreignKey: 'factura_id', // La clave foránea en 'Spent' que hace referencia a 'Factura'.
  })
  public spent: HasOne<typeof Spent> // Propiedad para acceder al gasto asociado a la factura.

}
