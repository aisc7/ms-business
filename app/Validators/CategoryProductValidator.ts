import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    category_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'categories', column: 'id' })
    ]),
    product_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'products', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'category_id.required': 'El ID de categoría es obligatorio',
    'category_id.unsigned': 'El ID de categoría debe ser un número entero positivo',
    'category_id.exists': 'El ID de categoría no existe en la base de datos',
  
    'product_id.required': 'El ID de producto es obligatorio',
    'product_id.unsigned': 'El ID de producto debe ser un número entero positivo',
    'product_id.exists': 'El ID de producto no existe en la base de datos'
  }
}
