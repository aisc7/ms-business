import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import axios from 'axios';
import Restriction from 'App/Models/Restriction';
import Municipality from 'App/Models/Municipality';
import RestrictionValidator from 'App/Validators/RestrictionValidator';

export default class RestrictionsController {
  public async create({ request, response }: HttpContextContract) {
    const body = request.body(); // Obtener el cuerpo de la solicitud

    // Validación de los datos usando RestrictionValidator
    await request.validate(RestrictionValidator);

    try {
      // Crear la restricción
      const theRestriction = await Restriction.create(body);

      // 1. Cargar el municipio relacionado con la restricción
      const municipality = await Municipality.find(theRestriction.municipality);
      if (!municipality) {
        return response.status(404).json({
          message: 'El municipio especificado no existe.',
        });
      }

      // 2. Cargar los vehículos relacionados con el municipio, incluyendo a sus conductores
      await municipality.load('operations', (operationsQuery) => {
        operationsQuery.preload('vehiculo', (vehiculoQuery) => {
          vehiculoQuery.preload('conductores'); // Preload de los conductores asociados al vehículo
        });
      });

      // Verificar si hay vehículos asociados al municipio
      const operations = municipality.operations;
      if (!operations || operations.length === 0) {
        return response.status(400).json({
          message: 'No hay vehículos asociados al municipio.',
        });
      }

      // 3. Enviar la restricción a cada conductor
      for (const operation of operations) {
        const vehiculo = operation.vehiculo;
        if (vehiculo && vehiculo.conductores) {
          for (const conductor of vehiculo.conductores) {
            await this.sendEmailToMSNotifications(
              conductor.email,
              'Nueva Restricción',
              `Se ha creado una nueva restricción en el municipio ${municipality.name}: ${theRestriction.descripcion}`
            );
            console.log(`Restricción enviada a ${conductor.id}`);
          }
        }
      }

      return response.status(201).json({
        message: 'Restricción creada y notificaciones enviadas.',
        data: theRestriction,
      });
    } catch (error) {
      console.error('Error creando restricción:', error);
      return response.status(500).json({
        message: 'Hubo un error al crear la restricción.',
        error: error.message,
      });
    }
  }

  // Función para enviar correo a MS_NOTIFICATIONS
  private async sendEmailToMSNotifications(toEmail: string, subject: string, body: string) {
    try {
      const response = await axios.post(`${process.env.MS_NOTIFICATIONS}/send_email`, {
        email: toEmail,
        subject: subject,
        body: body,
      });
      return response.data;
    } catch (error) {
      console.error('Error enviando email:', error);
      return { error: 'Error enviando email a MS_NOTIFICATIONS', details: error.message };
    }
  }
  // Eliminar una restricción
  public async delete({ params, response }: HttpContextContract) {
    const theRestriction = await Restriction.findOrFail(params.id);
    await theRestriction.delete();
    response.status(204);
    return;
  }
}
