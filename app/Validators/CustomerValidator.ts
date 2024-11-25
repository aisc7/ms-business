import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.number([rules.required()]),
    order_count: schema.number([rules.required()]),
  });

  public messages: CustomMessages = {
    "phone.required": "El número de teléfono es obligatorio.",
    "phone.range":
      "El número de teléfono debe estar entre 5 y 1000000000000.",
    "phone.unsigned": "El número de teléfono no puede ser negativo.",
    "order_count.required": "El número de pedidos es obligatorio.",
  };
}
