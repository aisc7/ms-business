import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    telefono: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.range(5, 10000000000000),
      rules.unsigned(), //que no sea negativo
    ]),
  });

  public messages: CustomMessages = {
    'user_id.required': 'El ID de usuario es obligatorio.',
    'telefono.required': 'El número de teléfono es obligatorio.',
    'telefono.range': 'El número de teléfono debe estar entre 5 y 1000000000000.',
    'telefono.unsigned': 'El número de teléfono no puede ser negativo.'
  };
}
