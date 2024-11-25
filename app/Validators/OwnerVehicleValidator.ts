import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    fecha_asignacion: schema.date({ format: 'yyyy-MM-dd HH:mm:ss'}),// Asegura que la fecha de adquisición tenga el formato yyyy-MM-dd HH:mm:s

    dueno_id: schema.number([
      rules.exists({ table: 'duenos', column: 'id' }),// Asegura que el ID del propietario exista en la tabla 'owners'
      rules.unsigned(),// Asegura que el ID del propietario no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ]),

    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }),// Asegura que el ID del vehículo exista en la tabla 'vehicles'
      rules.unsigned(),// Asegura que el ID del vehículo no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ])
  })

  public messages: CustomMessages = {
    'fecha_asignacion.date': 'La fecha de adquisición debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'dueno_id.exists': 'El propietario especificado no existe.',
    'dueno_id.unsigned': 'El ID del propietario no puede ser negativo.',
    'dueno_id.required': 'El ID del propietario es un campo obligatorio.',
    'vehiculo_id.exists': 'El vehículo especificado no existe.',
    'vehiculo_id.unsigned': 'El ID del vehículo no puede ser negativo.',
    'vehiculo_id.required': 'El ID del vehículo es un campo obligatorio.'
  }
}
