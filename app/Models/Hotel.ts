import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Servicio from "./Servicio";

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stars: number;
  
  @column()
  public servicio_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Servicio, { 
    foreignKey: "servicio_id",
  })
  public service: BelongsTo<typeof Servicio>;
}