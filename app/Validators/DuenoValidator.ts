import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DuenoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
    ]),

    conductor_id: schema.number([
      //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
      rules.exists({ table: "conductors", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {
    "user_id.required": "El ID de usuario es obligatorio.",
    "conductor_id.exists": "El id del conductor no existe.",
  };
}
