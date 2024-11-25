import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SpentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    monto: schema.number([
      rules.required(), // Asegura que el campo no esté vacío

      rules.unsigned(), //que no sea negativo
      rules.range(50, 100000000),
    ]), //rango

    conductor_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "conductors", column: "id" }),
    ]),

    servicio_id: schema.number([
      //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
      rules.exists({ table: "servicios", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "monto.required": "El monto es obligatorio.",
    "monto.unsigned": "El monto no puede ser negativo",
    "conductor_id.exists": "El id del conductor no existe.",
    "servicio_id.exists": "El id del servicio no existe."
  };
}
