import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    street: schema.string({}, [
      rules.regex(/^[a-zA-Z0-9\s_-]+$/), // Permite caracteres alfanuméricos, espacios, guiones bajos y guiones
      rules.required() // Asegura que el campo no sea nulo
    ]),
    number: schema.string({}, [
      rules.regex(/^[a-zA-Z0-9\s_-]+$/), // Permite caracteres alfanuméricos, espacios, guiones bajos y guiones
      rules.required() // Asegura que el campo no sea nulo
    ]),
    neighborhood: schema.string({}, [
      rules.regex(/^[a-zA-Z0-9\s_-]+$/), // Permite caracteres alfanuméricos, espacios, guiones bajos y guiones
      rules.required() // Asegura que el campo no sea nulo

    ]),

    reference: schema.string({}, [
      rules.regex(/^[a-zA-Z0-9\s_-]+$/),
    ]),

    municipality_id: schema.number([
      rules.exists({ table: 'municipalities', column: 'id' }), // Asegura que el valor exista en la tabla de municipios
      rules.required()// Asegura que el campo no sea nulo
      , rules.unsigned(),
    ]),


  })

public messages: CustomMessages = {
  'street.regex': 'La calle solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
  'street.required': 'La calle es obligatoria.',
  'number.regex': 'El número solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
  'number.required': 'El número es obligatorio.',
  'neighborhood.regex': 'El barrio solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
  'neighborhood.required': 'El barrio es obligatorio.',
  'reference.regex': 'La referencia solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
  'municipality_id.exists': 'El municipio especificado no existe.',
  'municipality_id.required': 'El municipio es obligatorio.',
  'municipality_id.unsigned': 'El ID del municipio no puede ser negativo.',
}
}