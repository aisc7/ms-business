import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanyValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    company_type: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]),
    fiscal_address: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]),
    customer_id: schema.number([
      rules.exists({ table: 'customers', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'company_type.required': 'El tipo de compañía es obligatorio.',
    'company_type.alphaNum': 'El tipo de compañía solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'fiscal_address.required': 'La dirección fiscal es obligatoria.',
    'fiscal_address.alphaNum': 'La dirección fiscal solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'customer_id.exists': 'El cliente no existe.'
  }
}
