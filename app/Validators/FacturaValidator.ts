import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_emision: schema.date(
      { format: "yyyy-MM-dd HH:mm:ss" },
      [rules.after("today")] // Asegura que la fecha de la factura sea posterior a la fecha actual
    ),

    monto_total: schema.number([
      rules.required(),
      rules.unsigned(), // Asegura que la cantidad sea un número entero positivo y no negativo
    ]),
    estado: schema.boolean([
      rules.required(), // Asegura que el campo no esté vacío
    ]),

    cuota_id: schema.number([
      rules.exists({ table: "quotas", column: "id" }),
      rules.unsigned(), // Asegura que el ID del contrato no sea negativo
      rules.required(),
    ]), // Asegura que el campo no esté vacío
  });

  public messages: CustomMessages = {
    "fecha_emision.date":
      "La fecha de la factura debe tener el formato yyyy-MM-dd HH:mm:ss.",
    "fecha_emision.after":
      "La fecha de la factura debe ser posterior a la fecha actual.",
    "monto_total.required": "El monto_total es obligatorio.",
    "monto_total.unsigned": "El monto_total no puede ser negativo.",
    "estado.required": "El estado es obligatorio.",
    "cuota_id.exists": "La cuota especificada no existe.",
    "cuota_id.unsigned": "El ID de la cuota no puede ser negativo.",
    "cuota_id.required": "El ID de la cuota es un campo obligatorio.",
  };
}
