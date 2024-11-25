import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SeguroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_vencimiento: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
      rules.after('today'),
      rules.afterField('start_date') // Asegura que la fecha de fin sea posterior a la fecha de inicio
    ]),
    compania: schema.string({ trim: true }, [// Asegura que el campo no tenga espacios en blanco al principio y al final
      rules.required(),// Asegura que el campo no esté vacío
      rules.maxLength(255)// Asegura que el campo no tenga más de 255 caracteres
    ]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }),
      rules.unsigned(),// Asegura que el ID del vehículo no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ])
  })

  
  public messages: CustomMessages = {
    'fecha_vencimiento.date': 'La fecha de fin de la poliza debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'fecha_vencimiento.required': 'La fecha de fin de la poliza es obligatoria.',
    'fecha_vencimiento.after': 'La fecha de fin de la poliza debe ser posterior a la fecha actual.',
    'fecha_vencimiento.afterField': 'La fecha de fin de la poliza debe ser posterior a la fecha de inicio.',
    'compania.required': 'La compañia de seguros es obligatoria.',
    'compania.maxLength': 'La compañia de seguros no puede tener más de 255 caracteres.',
    'vehiculo_id.exists': 'El vehículo especificado no existe.',
    'vehiculo_id.unsigned': 'El ID del vehículo no puede ser negativo.',
    'vehiculo_id.required': 'El ID del vehículo es un campo obligatorio.'
  }
}
