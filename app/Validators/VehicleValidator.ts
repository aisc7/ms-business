import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo_vehiculo: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] }),
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    capacidad_peso: schema.number([
      rules.required(),
      rules.unsigned(), // No permite valores negativos
      rules.range(1, 50000), // Rango en kilogramos, ajustar según sea necesario
    ]),
    capacidad_volumen: schema.number([
      rules.required(),
      rules.unsigned(), // No permite valores negativos
      rules.range(1, 10000), // Rango en metros cúbicos, ajustar según sea necesario
    ]),
    estado: schema.string({}, [
      rules.required(),
      rules.alpha(), // Solo permite caracteres alfabéticos
      rules.maxLength(20),
    ]),
  });

  public messages: CustomMessages = {
    'tipo_vehiculo.required': 'El tipo de vehículo es obligatorio.',
    'tipo_vehiculo.alphaNum': 'El tipo de vehículo solo puede contener letras, números, espacios, guiones bajos y guiones.',
    'tipo_vehiculo.minLength': 'El tipo de vehículo debe tener al menos 2 caracteres.',
    'tipo_vehiculo.maxLength': 'El tipo de vehículo no puede tener más de 50 caracteres.',
    'capacidad_peso.required': 'La capacidad de peso es obligatoria.',
    'capacidad_peso.unsigned': 'La capacidad de peso no puede ser negativa.',
    'capacidad_peso.range': 'La capacidad de peso debe estar entre 1 y 50000 kilogramos.',
    'capacidad_volumen.required': 'La capacidad de volumen es obligatoria.',
    'capacidad_volumen.unsigned': 'La capacidad de volumen no puede ser negativa.',
    'capacidad_volumen.range': 'La capacidad de volumen debe estar entre 1 y 10000 metros cúbicos.',
    'estado.required': 'El estado del vehículo es obligatorio.',
    'estado.alpha': 'El estado solo puede contener letras.',
    'estado.maxLength': 'El estado no puede tener más de 20 caracteres.',
  };
}