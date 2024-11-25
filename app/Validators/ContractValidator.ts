import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ContractValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    fecha_inicio: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
    fecha_fin: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
    customer_id: schema.number([
      rules.required(),
      rules.unsigned(), //que no sea negativo
    ]),
  });

  public messages: CustomMessages = {};
}
