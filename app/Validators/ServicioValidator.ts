import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    descripcion: schema.string([
      rules.required(), // Asegura que el campo no esté vacío

      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(200),
    ]), //que rechaze la peticion en lugar de ingresar información basura a la base de datos
  });

  public messages: CustomMessages = {
    "descripcion.required": "La descripción es obligatoria.",
    "date.format": "El formato de la fecha es incorrecto.",
    "conductor_id.exists": "El id del conductor no existe.",
  };
}
