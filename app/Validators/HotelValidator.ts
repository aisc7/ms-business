import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    stars: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
    ]),
    service_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "services", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {
    "stars.required": "Las estrellas del hotel son obligatorias.",
    "service_id.exists": "El id del servicio no existe.",
  };
}
