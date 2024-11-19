import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Conductor from './Conductor'
import Factura from './Factura'

export default class Spent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public monto: number

  @column()
  public date: DateTime

  @column()
  public servicio_id: number

  @column()
  public conductor_id: number

  @column()
  public factura_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>

  
  // Relación 'BelongsTo' que indica que un gasto pertenece a una factura.
  @belongsTo(() => Factura, {
    foreignKey: 'factura_id', // La clave foránea 'factura_id' en 'Spent' que hace referencia a la factura.
  })
  public factura: BelongsTo<typeof Factura> // Propiedad para acceder a la factura relacionada con este gasto.


  @belongsTo(() => Conductor,{
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>  
}
