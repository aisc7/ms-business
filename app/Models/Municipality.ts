import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import Address from './Address'
import Restriction from './Restriction'
import DistributionCenter from './DistributionCenter'
import Operation from './Operation'
import Vehiculo from './Vehiculo'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public department_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department,{
    // contract_id nombre de la foreing key en la tabla de cuotas
    foreignKey: 'department_id'
  })
  public department: BelongsTo<typeof Department>

  @hasMany(() => Address, {
    foreignKey: 'municipality_id'
  })
  public addresses: HasMany<typeof Address>

  @hasMany(() => DistributionCenter, {
    foreignKey: 'municipality_id'
  })
  public distributioncenters: HasMany<typeof DistributionCenter>

  @hasMany(() => Operation, {
    foreignKey: 'municipality_id'
  })
  public operations: HasMany<typeof Operation>

  @hasManyThrough([() => Vehiculo, () => Operation], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'municipality_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'vehiculo_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Vehiculo>

  @hasMany(() => Restriction)
  public restrictions: HasMany<typeof Restriction>;

}
