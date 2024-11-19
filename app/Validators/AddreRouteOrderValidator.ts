import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddreRouteOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
 
    address_id: schema.number([
        rules.exists({ table: 'addresses', column: 'id' }),
        rules.unsigned(),
        rules.required()
      ]),
 
      route_id: schema.number([
        rules.required(),
        rules.unsigned(),
        rules.exists({ table: 'routes', column: 'id' }),
      ])
    })
  
  public messages: CustomMessages = {
    'address_id.required': 'La dirección es requerida',
    'address_id.exists': 'La dirección no existe',
    'address_id.unsigned': 'La dirección debe ser un número entero positivo',
    'route_id.required': 'La ruta es requerida',
    'route_id.exists': 'La ruta no existe',
    'route_id.unsigned': 'La ruta debe ser un número entero positivo'
  }
}
