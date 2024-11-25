import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Factura from "App/Models/Factura";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";

export default class FacturasController {
  // Método para obtener una factura específica por su ID o listar todas las facturas
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      try {
        let theFactura: Factura = await Factura.findOrFail(params.id);

        await theFactura.load("spent", (spentQuery) => {
          spentQuery.preload("conductor");
        });

        // Verificar si la relación conductor existe
        const license = theFactura.spent?.conductor?.licencia;

        if (!theFactura.spent?.conductor) {
          return { message: "Conductor no encontrado." };
        }

        return { factura: theFactura, licencia: license };
      } catch (error) {
        return { message: "Factura no encontrada." };
      }
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);

        return await Factura.query().paginate(page, perPage);
      } else {
        return await Factura.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theFactura: Factura = await Factura.create(body);

    // Cargar relaciones necesarias
    if (body.spent_id) {
      await theFactura.load("spent", (spentQuery) => {
        spentQuery.preload("conductor");
      });
    } else if (body.cuota_id) {
      await theFactura.load("cuota", (cuotaQuery) => {
        cuotaQuery.preload("contract", (contractQuery) => {
          contractQuery.preload("customer");
        });
      });
    }

    // Determinar el tipo de factura y obtener el destinatario
    let recipient;
    let emailTemplate;

    if (theFactura.spent_id && theFactura.spent) {
      // Caso: Factura para conductor
      const user = theFactura.spent?.conductor?.user_id;
      
      if (!user) {
        return { message: "Conductor no encontrado." };
      }

      const responseUser = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${user}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      if (!responseUser.data.email) {
        return { message: "Correo no disponible" };
      }

      recipient = responseUser.data.email;
      emailTemplate = this.createConductorFacturaEmail(theFactura);

    } else if (theFactura.cuota_id && theFactura.cuota) {
      // Caso: Factura para cliente
   
      const customer = theFactura.cuota?.contract?.customer.user_id;
      
      if (!customer) {
        return { message: "Cliente no encontrado o sin correo." };
      }

      const responseUser = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${customer}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      if (!responseUser.data.email) {
        return { message: "Correo no disponible" };
      }

      recipient = responseUser.data.email;
      emailTemplate = this.createCustomerFacturaEmail(theFactura);

    } else {
      return { message: "Tipo de factura inválido. Debe tener spent_id o cuota_id." };
    }

    // Enviar el correo
    const payEmail = {
      subject: "Factura Generada para Servicio de Carga",
      recipient: recipient,
      body_html: emailTemplate,
    };

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

    return {
      message: "Correo enviado correctamente",
      theFactura,
    };
  }

  private createConductorFacturaEmail(factura: Factura) {
    return `
      <p>Estimado conductor,</p>
      <p>Nos complace informarle que se ha generado una nueva factura en nuestro sistema con los siguientes detalles:</p>
      <table>
        <tr><th>Detalle</th><th>Información</th></tr>
        <tr><td><b>ID de la factura:</b></td><td>${factura.id}</td></tr>
        <tr><td><b>Fecha de emisión:</b></td><td>${factura.fecha_emision}</td></tr>
        <tr><td><b>Estado de la factura:</b></td><td>${factura.estado}</td></tr>
        <tr><td><b>ID de la cuota:</b></td><td>${factura.cuota_id}</td></tr>
        <tr><td><b>Gastos asociados:</b></td><td>${factura.spent? factura.spent.monto: "Ninguno"}</td></tr>
        <tr><td><b>ID del gasto:</b></td><td>${factura.spent_id}</td></tr>
        <tr><td><b>Descripción del gasto:</b></td><td>${factura.spent?.description || "N/A"}</td></tr>
        <tr><td><b>Monto del gasto:</b></td><td>${factura.spent?.monto || "N/A"}</td></tr>
      </table>
      <p>Gracias por su servicio y confianza.</p>
      <p><b>Atentamente,</b></p>
      <p>Gestión de Servicios de Transporte de Carga</p>
    `;
  }

  private createCustomerFacturaEmail(factura: Factura) {
    return `
      <p>Estimado cliente,</p>
      <p>Nos complace informarle que se ha generado una nueva factura en nuestro sistema con los siguientes detalles:</p>
      <table>
        <tr><th>Detalle</th><th>Información</th></tr>
        <tr><td><b>ID de la factura:</b></td><td>${factura.id}</td></tr>
        <tr><td><b>Fecha de emisión:</b></td><td>${factura.fecha_emision}</td></tr>
        <tr><td><b>Estado de la factura:</b></td><td>${factura.estado}</td></tr>
        <tr><td><b>ID de la cuota:</b></td><td>${factura.cuota_id}</td></tr>
        <tr><td><b>Monto de la cuota:</b></td><td>${factura.cuota?.monto || "N/A"}</td></tr>
        <tr><td><b>Fecha de vencimiento:</b></td><td>${factura.cuota?.fecha_vencimiento || "N/A"}</td></tr>
        <tr><td><b>Estado de pago:</b></td><td>${factura.cuota?.estado_pago || "N/A"}</td></tr>
      </table>
      <p>Gracias por su confianza.</p>
      <p><b>Atentamente,</b></p>
      <p>Gestión de Servicios de Transporte de Carga</p>
    `;
  }


  // Método para actualizar la información de una factura
  public async update({ params, request }: HttpContextContract) {
    const theFactura: Factura = await Factura.findOrFail(params.id);
    const body = request.body();

    theFactura.fecha_emision = body.fecha_emision;
    theFactura.monto_total = body.monto_total;
    theFactura.estado = body.estado;

    return await theFactura.save();
  }

  
  public async procesarPago({ request, params }: HttpContextContract) {
    try {
      // Buscar la factura por ID
      const factura = await Factura.findOrFail(params.id);

      // Cargar las relaciones necesarias
      await factura.load('spent');
      await factura.load('spent', (spentQuery) => {
        spentQuery.preload('conductor');
      });

      // Verificar el estado de la factura
      if (factura.estado !== 'pendiente') {
        return {
          success: false,
          message: 'La factura no está en estado pendiente de pago',
        };
      }

      const conductor = factura.spent?.conductor;
      const user = factura.spent?.conductor?.user_id;

      if (!conductor) {
        return { success: false, message: 'Conductor no encontrado.' };
      }

      // Obtener los datos del conductor desde MS_SECURITY
      const responseUser = await axios.get(
        `${Env.get('MS_SECURITY')}/users/${user}`,
        {
          headers: { Authorization: request.headers().authorization || '' },
        }
      );

      if (!responseUser.data.email || !responseUser.data.name) {
        return {
          success: false,
          message: 'Correo o nombre no disponible desde MS_SECURITY',
        };
      }

      // Preparar los datos para la solicitud de pago
      const paymentRequest = {
        card_number: request.input('card_number'),
        exp_year: request.input('exp_year'),
        exp_month: request.input('exp_month'),
        cvc: request.input('cvc'),
        name: responseUser.data.name, // Usamos el nombre desde MS_SECURITY
        email: responseUser.data.email, // Usamos el correo desde MS_SECURITY
        phone: conductor?.telefono || '',
        city: request.input('city'),
        address: request.input('address'),
        cell_phone: request.input('cell_phone'),
        value: factura.monto_total,
        factura_id: factura.id,
        cuota_id: factura.cuota_id,
        bill: `BILL-${factura.id}`,
      };

      // Realizar la solicitud de pago
      const paymentResponse = await axios.post(
        `${Env.get('MS_PAYMENTS')}/process-payment`,
        paymentRequest
      );

      // Verificar si el pago fue aprobado
      if (paymentResponse.data.status === 'approved') {
        // Enviar notificación de pago exitoso por correo electrónico
        await axios.post(`${Env.get('MS_NOTIFICATIONS')}/send-email`, {
          subject: 'Confirmación de Pago',
          recipient: responseUser.data.email, // Usamos el correo desde MS_SECURITY
          body_html: `
            <p>Estimado ${responseUser.data.name},</p>
            <p>Su pago por un valor de ${factura.monto_total} ha sido procesado exitosamente.</p>
            <p>Detalles de la transacción:</p>
            <ul>
              <li>Número de factura: ${factura.id}</li>
              <li>Fecha de pago: ${new Date().toLocaleDateString()}</li>
              <li>Monto: ${factura.monto_total}</li>
            </ul>
            <p>Gracias por su pago.</p>
          `,
        });

        // Cambiar el estado de la factura a "pagado"
        factura.estado = 'pagado';
        await factura.save();

        // Devolver respuesta de éxito
        return {
          success: true,
          message: 'Pago procesado exitosamente',
          payment: paymentResponse.data,
        };
      } else {
        // Si el pago no fue aprobado, devolver error
        return {
          success: false,
          message: 'El pago no pudo ser procesado',
          payment: paymentResponse.data,
        };
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      return {
        success: false,
        message: 'Error al procesar el pago',
        error: error.message,
      };
    }
  }

  // Método para eliminar una factura
  public async delete({ params, response }: HttpContextContract) {
    const theFactura: Factura = await Factura.findOrFail(params.id);
    await theFactura.delete();
    return response.ok({ message: "Factura eliminada" });
  }
}