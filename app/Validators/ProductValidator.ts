import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]),

    description: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]),

    customer_id: schema.number([
      rules.required(),
      rules.exists({ table: 'customers', column: 'id' })
    ]),

    batch_id: schema.number([
      rules.required(),
      rules.exists({ table: 'batches', column: 'id' })
    ])
  })
  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
    'name.alphaNum': 'El nombre solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'description.required': 'La descripción es obligatoria.',
    'description.alphaNum': 'La descripción solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'customer_id.required': 'El ID del cliente es obligatorio.',
    'customer_id.exists': 'El ID del cliente no existe.',
    'batch_id.required': 'El ID del lote es obligatorio.',
  }
}
