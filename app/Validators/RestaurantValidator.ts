import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RestaurantValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    
    servicio_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "servicios", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "servicio_id.exists": "El id del servicio no existe.",
  };
}
