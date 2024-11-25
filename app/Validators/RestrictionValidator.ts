import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestrictionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    municipality_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'municipalities', column: 'id' })
    ]),

    operation_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'operations', column: 'id' })
    ]),
    
    vehiculo_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'vehiculos', column: 'id' })
    ]),
    descripcion: schema.string({ trim: true }, [
      rules.required()
    ]),
    fecha_inicio: schema.date({}, [
      rules.required()
    ]),
    fecha_fin: schema.date({}, [
      rules.required()
    ])
  })

  public messages: CustomMessages = {
    'municipality_id.required': 'El ID del municipio es obligatorio',
    'municipality_id.unsigned': 'El ID del municipio debe ser un número entero positivo',
    'municipality_id.exists': 'El ID del municipio no existe en la base de datos',

    'operation_id.required': 'El ID de la operación es obligatorio',
    'operation_id.unsigned': 'El ID de la operación debe ser un número entero positivo',
    'operation_id.exists': 'El ID de la operación no existe en la base de datos',

    'vehiculo_id.required': 'El ID del vehículo es obligatorio',
    'vehiculo_id.unsigned': 'El ID del vehículo debe ser un número entero positivo',
    'vehiculo_id.exists': 'El ID del vehículo no existe en la base de datos',

    'descripcion.required': 'La descripción es obligatoria',

    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria'
  }
}