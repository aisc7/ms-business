import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DistributionCenterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]),
  
    phone: schema.string({}, [
      rules.required(),
      rules.regex(/^[0-9+\-()\s]+$/), // Permite números, espacios, paréntesis, guiones y el signo más
      rules.unique({ table: 'distribution_centers', column: 'phone' }), // Asegura que el número de teléfono sea único en la tabla 'distribution_centers'
      rules.minLength(10), // Asegura que el número de teléfono tenga al menos 10 dígitos
      rules.maxLength(10)  // Asegura que el número de teléfono tenga como máximo 10 dígitos
    ]),
  
    email: schema.string({}, [
      rules.email(),// Asegura que el correo electrónico tenga un formato válido
      rules.required(),// Asegura que el campo no esté vacío
      rules.unique({ table: 'distribution_centers', column: 'email' })
    ]),
  
    capacity: schema.number([
      rules.required(),
      rules.unsigned(), // Asegura que la capacidad sea un número entero positivo y no negativo
      rules.range(1, 400000) // Asegura que la capacidad esté entre 1 y 400000 m^3(metros cubicos)
    ]),
  
    address_id: schema.number([
      rules.exists({ table: 'addresses', column: 'id' }),// Asegura que el ID de la dirección exista en la tabla 'addresses'
      rules.unsigned(),// Asegura que el ID de la dirección no sea negativo
      rules.required(),// Asegura que el campo no esté vacío
      rules.unique({ table: 'distribution_centers', column: 'address_id' })// Asegura que el address_id sea único
    ]),
  
    municipality_id: schema.number([
      rules.exists({ table: 'municipalities', column: 'id' }),// Asegura que el ID del municipio exista en la tabla 'municipalities'
      rules.unsigned(),// Asegura que el ID del municipio no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
    'name.alphaNum': 'El nombre solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'phone.required': 'El número de teléfono es obligatorio.',
    'phone.regex': 'El número de teléfono solo puede contener números, espacios, paréntesis, guiones y el signo más.',
    'phone.unique': 'El número de teléfono ya está en uso.',
    'email.required': 'El correo electrónico es obligatorio.',
    'email.email': 'El correo electrónico debe ser válido.',
    'email.unique': 'El correo electrónico ya está en uso.',
    'capacity.required': 'La capacidad es obligatoria.',
    'capacity.unsigned': 'La capacidad no puede ser negativa.',
    'capacity.range': 'La capacidad debe estar entre 1 y 100.',
    'address_id.exists': 'La dirección especificada no existe.',
    'address_id.unsigned': 'El ID de la dirección no puede ser negativo.',
    'address_id.required': 'El ID de la dirección es un campo obligatorio.',
    'address_id.unique': 'El ID de la dirección ya está en uso.',
    'municipality_id.exists': 'El municipio especificado no existe.',
    'municipality_id.unsigned': 'El ID del municipio no puede ser negativo.',
    'municipality_id.required': 'El ID del municipio es un campo obligatorio.'
  }
}