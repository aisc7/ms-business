import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleDriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    conductor_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "conductors", column: "id" }),
    ]),

    //! PARA CUANDO ESTÉ LA CLASE VEHICLE
    vehiculo_id: schema.number([
      //*REVISA que el vehiculo con ese id si exista en la tabla de conductores
      rules.exists({ table: "vehiculos", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "conductor_id.exists": "El id del conductor no existe.",
    "vehiculo_id.exists": "El id del vehiculo no existe.",
  };
}
