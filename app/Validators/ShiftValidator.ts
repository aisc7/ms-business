import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ShiftValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    location: schema.string([
      rules.required(), // Asegura que el campo no esté vacío

      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(30),
    ]), //que rechaze la peticion en lugar de ingresar información basura a la base de datos
    start_time: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
    end_time: schema.date({
      format: "yyyy-MM-dd",
    }),
    conductor_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "conductors", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "location.required": "La ubicación es obligatoria.",
    "start_time.format": "La fecha de inicio está en el formato incorrecto.",
    "end_time.format": "La fecha final está en el formato incorrecto.",

    "conductor_id.exists": "El id del conductor no existe.",
  };
}
