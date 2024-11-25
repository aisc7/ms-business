import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Conductor from './Conductor'
import Factura from './Factura'
import Dueno from './Dueno'

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
  public dueno_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>

  
  @hasOne(() => Factura, {
    //TIENE UNA FACTURA
    foreignKey: "spent_id",
  })
  public factura: HasOne<typeof Factura>;

  @belongsTo(() => Conductor,{
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>  

  @belongsTo(() => Dueno,{
    foreignKey: 'dueno_id'
  })
  public dueno: BelongsTo<typeof Dueno>  
}
