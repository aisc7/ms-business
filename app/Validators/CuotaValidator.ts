import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class QuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    monto: schema.number([rules.required(),// Asegura que el campo no esté vacío
      rules.unsigned(), // Asegura que la cantidad sea un número entero positivo y no negativo
      rules.range(10000, 2500000) // Asegura que la cantidad esté entre 1 y 1000000
    ]),

    fecha_vencimiento: schema.date({ format: 'yyyy-MM-dd HH:mm:ss'}, [
      rules.required(),
      rules.after('today') // Asegura que la fecha de vencimiento sea posterior a la fecha actual,
    ]),
    estado_pago: schema.boolean([
      rules.required()// Asegura que el campo no esté vacío
      
    ]),
    contract_id: schema.number(
      [rules.exists({ table: 'contracts', column: 'id' }),
      rules.unsigned(),// Asegura que el ID del contrato no sea negativo
      rules.required(),// Asegura que el campo no esté vacío
   /*    rules.unique({ table: 'quotas', column: 'contract_id' }) // Asegura que el contract_id sea único */
    ]
    ),

  })

 
  public messages: CustomMessages = {
    'monto.required': 'El monto es obligatorio.',
    'monto.unsigned': 'El monto no puede ser negativo.',
    'monto.range': 'El monto debe estar entre 10000 y 2500000.',
    'fecha_vencimiento.required': 'La fecha de vencimiento es obligatoria.',
    'fecha_vencimiento.after': 'La fecha de vencimiento debe ser posterior a la fecha actual.',
    'estado_pago.required': 'El estado es obligatorio.',
    'contract_id.exists': 'El contrato especificado no existe.',
    'contract_id.unsigned': 'El ID del contrato no puede ser negativo.',
    'contract_id.required': 'El ID del contrato es un campo obligatorio.',
    'contract_id.unique': 'El ID del contrato ya está en uso.'
  }
}
