import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] }),
      rules.unique({ table: 'categories', column: 'name' }) 
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
    'name.alphaNum': 'El nombre solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
  }
}
