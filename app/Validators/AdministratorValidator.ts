import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    service_id: schema.number([
      rules.exists({ table: "services", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
