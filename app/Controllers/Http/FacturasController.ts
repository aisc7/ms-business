import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"; // Importa el tipo de contexto para la solicitud HTTP.
import Factura from "App/Models/Factura"; // Importa el modelo 'Factura' que representa las facturas en la base de datos.
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";

export default class FacturasController {
  // Método para obtener una factura específica por su ID o listar todas las facturas
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca la factura por su ID. Si no la encuentra, lanzará una excepción.
      let theFactura: Factura = await Factura.findOrFail(params.id);

      // Carga la relación 'spent' asociada a la factura
      await theFactura.load("spent");

      await theFactura.load("spent", (spentQuery) => {
        spentQuery.preload("conductor");
      });
      let license = theFactura.spent.conductor?.licencia;
      return { factura: theFactura, licencia: license };
    } else {
      const data = request.all(); // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1); // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20); // Elementos por página, por defecto 20.

        // Devuelve una lista de facturas con paginación.
        return await Factura.query().paginate(page, perPage);
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todas las facturas.
        return await Factura.query();
      }
    }
  }

  // Método para crear una nueva factura
  public async create({ request }: HttpContextContract) {
    // Aquí puedes agregar la validación de datos, por ejemplo: await request.validate(FacturaValidator);
    //await request.validate(FacturaValidator);
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.

    // Crea una nueva factura en la base de datos con los datos proporcionados.
    const theFactura: Factura = await Factura.create(body);

    // Carga la relación 'cuota' asociada a la factura.
    await theFactura.load("cuota");
    await theFactura.load("spent", (spentQuery) => {
      spentQuery.preload("conductor"); // Carga la relación 'driver' asociada a 'spent'
    });
    const user = theFactura.spent.conductor?.userId;
    const responseUser = await axios.get(
      `${Env.get("MS_SECURITY")}/users/${user}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );
    if (!responseUser.data.email) {
      return {
        message: "Correo no disponible",
      };
    }

    const payEmail = {
      subject: "Factura Generada para Servicio de Carga",
      recipient: responseUser.data.email,
      body_html: `
      <p>Estimado conductor,</p>

      <p>Nos complace informarle que se ha generado una nueva factura en nuestro sistema con los siguientes detalles:</p>

      <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
        <tr style="background-color: #f2f2f2;">
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Detalle</th>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Información</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID de la factura:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            theFactura.id
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha de emisión:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            theFactura.fecha_emision
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Total a pagar:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            theFactura.monto_total
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Estado de la factura:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            theFactura.estado
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID de la cuota:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            theFactura.cuota_id
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Gastos asociados:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            theFactura.spent ? theFactura.spent.monto : "Ninguno"
          }</td>
        </tr>
      </table>

      <p style="margin-top: 20px;">Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>

      <p>Gracias por su servicio y confianza.</p>

      <p style="margin-top: 20px;"><b>Atentamente,</b></p>
      <p>Gestión de Servicios de Transporte de Carga</p>
    `,
    };

    // Enviar el correo
    try {
      const emailResponse = await axios.post(
        `${Env.get("MS_NOTIFICATIONS")}/send-email`,
        payEmail
      );

      if (emailResponse.status === 200) {
        console.log("Correo enviado exitosamente");
      } else {
        console.warn("Error al enviar el correo");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }

        // Retornar la factura junto con un mensaje de éxito
        return {
          message: "Correo enviado correctamente", theFactura,
        }
  }

  // Método para actualizar la información de una factura
  public async update({ params, request }: HttpContextContract) {
    // Busca la factura por su ID. Si no la encuentra, lanzará una excepción.
    const theFactura: Factura = await Factura.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos de la factura con los nuevos valores proporcionados.
    theFactura.fecha_emision = body.fecha_emision;
    theFactura.monto_total = body.monto_total;
    theFactura.estado = body.estado;

    // Guarda los cambios en la base de datos.
    return await theFactura.save();
  }


  public async procesarPago({ request, params }: HttpContextContract) {
    try {
      // 1. Obtener la factura
      const factura = await Factura.findOrFail(params.id);
      await factura.load('spent');
      await factura.load('spent', (spentQuery) => {
        spentQuery.preload('conductor');
      });
  
      // 2. Verificar que la factura esté pendiente de pago
      if (factura.estado !== 'pendiente') {
        return {
          success: false,
          message: 'La factura no está en estado pendiente de pago'
        };
      }
  
      // 3. Obtener datos del conductor
      const conductor = factura.spent.conductor;
      
      // 4. Construir objeto de pago directamente
      const paymentRequest = {
        // Datos de la tarjeta del request
        card_number: request.input('card_number'),
        exp_year: request.input('exp_year'),
        exp_month: request.input('exp_month'),
        cvc: request.input('cvc'),
        
        // Datos del conductor
        name: conductor?.nombre || '',
        email: conductor?.email || '',
        phone: conductor?.telefono || '',
        
        // Datos de ubicación del request
        city: request.input('city'),
        address: request.input('address'),
        cell_phone: request.input('cell_phone'),
        
        // Datos de la factura
        value: factura.monto_total,
        factura_id: factura.id,
        cuota_id: factura.cuota_id,
        bill: `BILL-${factura.id}`
      };
  
      // 5. Enviar solicitud al microservicio de pagos
      const paymentResponse = await axios.post(
        `${Env.get('MS_PAYMENTS')}/process-payment`,
        paymentRequest
      );
  
      // 6. Si el pago fue exitoso
      if (paymentResponse.data.status === 'approved') {
        // Enviar correo de confirmación
        await axios.post(
          `${Env.get('MS_NOTIFICATIONS')}/send-email`,
          {
            subject: 'Confirmación de Pago',
            recipient: conductor?.email,
            body_html: `
              <p>Estimado ${conductor?.nombre},</p>
              <p>Su pago por un valor de ${factura.monto_total} ha sido procesado exitosamente.</p>
              <p>Detalles de la transacción:</p>
              <ul>
                <li>Número de factura: ${factura.id}</li>
                <li>Fecha de pago: ${new Date().toLocaleDateString()}</li>
                <li>Monto: ${factura.monto_total}</li>
              </ul>
              <p>Gracias por su pago.</p>
            `
          }
        );
  
        // Actualizar estado de la factura
        factura.estado = 'pagado';
        await factura.save();
  
        return {
          success: true,
          message: 'Pago procesado exitosamente',
          payment: paymentResponse.data
        };
      } else {
        return {
          success: false,
          message: 'El pago no pudo ser procesado',
          payment: paymentResponse.data
        };
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      return {
        success: false,
        message: 'Error al procesar el pago',
        error: error.message
      };
    }
  }

  // Método para eliminar una factura por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca la factura por su ID. Si no la encuentra, lanzará una excepción.
    const theFactura: Factura = await Factura.findOrFail(params.id);
    await theFactura.load("spent"); // Carga la relación 'spent' asociada a la factura.

    // Si la factura no tiene ningún gasto asociado (es decir, la relación 'spent' es nula)
    if (theFactura["spent"] == null) {
      // Elimina la factura de la base de datos.
      await theFactura.delete();

      // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
      return response.status(204);
    } else {
      // Si la factura tiene gastos asociados, no se puede eliminar.
      return response.status(400).json({
        alert: "No se puede eliminar la factura porque tiene un gasto asociado",
      });
    }
  }

}