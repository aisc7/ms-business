import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import Vehiculo from './Vehiculo'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public startDate: DateTime //fecha y hora de la factura

  @column()
  public endDate: DateTime //fecha y hora de la factura

  @column()
  public municipality_id: number //monto total de la factura
  
  @column()
  public vehiculo_id: number//estado de la factura

  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @belongsTo(() => Municipality,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>

    
  @belongsTo(() => Vehiculo,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>
}