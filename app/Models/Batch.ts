import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import Route from "./Route";
import Schedule from "./AddreRouteOrder";
import AddreRouteOrderValidator from "App/Validators/AddreRouteOrderValidator";
import AddreRouteOrder from "./AddreRouteOrder";

export default class Batch extends BaseModel {
  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number;

  @column() // Define la cantidad de productos en el lote.
  public quantity: number;

  @column()
  public route_id: number;

  @column()
  public addreroute_id: number;

  @column.dateTime({ autoCreate: true }) // Fecha de creación automática.
  public createdAt: DateTime;

  // Relación uno a muchos con Product (un lote puede incluir varios productos).
  @hasMany(() => Product, {
    foreignKey: "batch_id", // Clave foránea en Product que apunta a Batch.
  })
  public products: HasMany<typeof Product>;

  // Relación uno a muchos con Route (un lote está asociado a una ruta).
  @belongsTo(() => Route, {
    foreignKey: "route_id", // Clave foránea en Route que apunta a Batch.
  })
  public routes: BelongsTo<typeof Route>;

  // Relación de pertenencia a Schedule
  @belongsTo(() => AddreRouteOrder, {
    foreignKey: "addreroute_id", // La clave foránea es schedule_id
  })
  public addreroute: BelongsTo<typeof AddreRouteOrder>;
}
