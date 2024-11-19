import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract';
import Factura from './Factura';

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto: number

  @column()
  public fecha_vencimiento: Date;

  @column()
  public estado_pago: string

  @column()
  public contract_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Contract,{
    // contract_id nombre de la foreing key en la tabla de cuotas
    foreignKey: 'contract_id'
  })
  public contract: BelongsTo<typeof Contract>

  @hasOne(() => Factura, {
    foreignKey: 'cuota_id', // La clave foránea en el modelo Factura
  })
  public factura: HasOne<typeof Factura>
  
}
