import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Municipality from './Municipality'

export default class DistributionCenter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string //nombre
 
  @column()
  public phone: string //celular

  @column()
  public email: string //correo electronico

  @column()
  public capacity: number //capacidad

  
  @column()
  public address_id: number //direccion

  @column()
  public municipality_id: number //municipio_id
 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Address,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'address_id'
  })
  public address: BelongsTo<typeof Address>

  @belongsTo(() => Municipality,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>
}