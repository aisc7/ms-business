import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NaturalPersonValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    document_type: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),

    document_number: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(20),
    ]),

    birth_date: schema.date({}, [
      rules.required(),
      rules.before('today'),
    ]),

    company_id: schema.number.optional([
      rules.unsigned(),
      rules.exists({ table: 'companies', column: 'id' }),
    ]),

    customer_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'customers', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'document_type.required': 'El tipo de documento es obligatorio',
    'document_type.maxLength': 'El tipo de documento no puede exceder los 255 caracteres',

    'document_number.required': 'El número de documento es obligatorio',
    'document_number.maxLength': 'El número de documento no puede exceder los 20 caracteres',

    'birth_date.required': 'La fecha de nacimiento es obligatoria',
    'birth_date.before': 'La fecha de nacimiento debe ser anterior a hoy',

    'company_id.unsigned': 'El ID de la empresa debe ser un número entero positivo',
    'company_id.exists': 'El ID de la empresa no existe en la base de datos',

    'customer_id.required': 'El ID del cliente es obligatorio',
    'customer_id.unsigned': 'El ID del cliente debe ser un número entero positivo',
    'customer_id.exists': 'El ID del cliente no existe en la base de datos',
  }
}
