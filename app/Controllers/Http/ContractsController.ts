import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Contract from "App/Models/Contract";
import ContractValidator from "App/Validators/ContractValidator";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";

export default class ContractController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let contract: Contract = await Contract.findOrFail(params.id);

      await contract.load("routes");
      await contract.load("cuotas");
      await contract.load("vehicles");

      return contract;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Contract.query().paginate(page, perPage);
      } else {
        return await Contract.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ContractValidator);
    const body = request.body();
    const contract: Contract = await Contract.create(body);
    await contract.load("cuotas");
    await contract.load("routes");

    await contract.load("customer", (query) => {
      query.preload("naturalperson");
    });

    const user = contract.customer.naturalperson?.user_id;
    const userResponse = await axios.get(
      // Para obtener la información del usuario desde MS_Seguridad
      `${Env.get("MS_SECURITY")}/users/${user}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );
    if (!userResponse.data.email) {
      // Verificar que se encontró el email de ese usuario
      return {
        message: "El correo del usuario no está disponible.",
      };
    }
    const emailPayload = {
      subject: "Nuevo contrato",
      recipient: userResponse.data.email, // Email del cliente
      body_html: `<p>Estimado cliente,</p>

<p>Nos complace informarle que se ha generado un nuevo contrato con los siguientes detalles:</p>

<table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
  <tr style="background-color: #f2f2f2;">
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Detalle</th>
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Información</th>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID del contrato:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contract.id}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Estado:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contract.estado}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha inicial:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contract.fecha_inicio}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha final:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contract.fecha_fin}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID del cliente:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contract.customer_id}</td>
  </tr>
</table>

<p>Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>

<p>Gracias por confiar en nuestros servicios.</p>

<p style="margin-top: 20px;"><b>Atentamente,</b></p>
<p>Gestión de servicios de transporte de carga</p>
`,
    };
    // Llamada al microservicio de notificaciones
    const emailResponse = await axios.post(
      `${Env.get("MS_NOTIFICATIONS")}/send-email`,
      emailPayload
    );
    if (!emailResponse.data || emailResponse.status !== 200) {
      console.warn("No se pudo enviar el correo de confirmación.");
    }

    return contract;
  }

  public async update({ params, request }: HttpContextContract) {
    const contract: Contract = await Contract.findOrFail(params.id);
    const body = request.body();
    contract.fecha_inicio = body.fecha_inicio;
    contract.fecha_fin = body.fecha_fin;
    contract.estado = body.estado;
    contract.detalles_servicio = body.detalles_servicio;
    contract.customer_id = body.customer_id;

    return await contract.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const contract: Contract = await Contract.findOrFail(params.id);
    await contract.delete();
    return response.status(200).json({
      message: "Contrato eliminado con éxito",
    });
  }
}
