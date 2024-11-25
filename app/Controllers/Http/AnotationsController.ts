import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Anotation from 'App/Models/Anotation'
import AnotationValidator from 'App/Validators/AnotationValidator'
import OwnerVehicle from 'App/Models/OwnerVehicle'
import axios from 'axios'

export default class AnotationsController {

    // Buscar por ID o listar por página/todos
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            // Buscar por ID
            const theAnotation = await Anotation.findOrFail(params.id)
            await theAnotation.load('addreroute') 
            return theAnotation
        } else {
            const data = request.all()
            // Listar por página
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Anotation.query().paginate(page, perPage)
            } else {
                // Listar todas las anotaciones
                return await Anotation.all()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();  // Obtener el cuerpo de la solicitud
    
        // Crear la anotación
        const theAnotation = await Anotation.create(body);  
    
              // Validación de los datos usando NaturalPersonValidator
        await request.validate(AnotationValidator);
        try {
            // 1. Obtener la relación 'addreroute' de la anotación
            await theAnotation.load('addreroute', (query) => {
                query.preload('route');  // Preload la relación 'route' dentro de 'addreroute'
            });
    
            // 2. Obtener la ruta relacionada con 'addreroute'
            const route = theAnotation.addreroute?.route;  // Acceder a 'route' a través de 'addreroute'
    
            if (!route) {
                throw new Error('No route associated with this address route order.');
            }
    
            // 3. Cargar el contrato relacionado con la ruta
            await route.load('contract');  // Cargar la relación 'contract' dentro de la ruta
    
            const contract = route.contract;  // Obtener el contrato relacionado
    
            if (!contract) {
                throw new Error('No contract associated with this route.');
            }
    
            // 4. Obtener el cliente asociado al contrato
            const customer = contract.customer;  // Asumiendo que la relación 'customer' está definida correctamente en el modelo de 'Contract'
    
            if (!customer) {
                throw new Error('No customer associated with this contract.');
            }
    
            // 5. Obtener el dueño del vehículo asociado a la ruta
            await route.load('vehiculo');  // Cargar la relación 'vehiculo' dentro de la ruta
            const vehicle = route.vehiculo;
    
            if (!vehicle) {
                throw new Error('No vehicle associated with this route.');
            }
    
            // 6. Obtener el dueño del vehículo (OwnerVehicle)
            const ownerVehicle = await OwnerVehicle.query().where('vehiculo_id', vehicle.id).firstOrFail();
            const owner = await ownerVehicle.related('dueno').query().firstOrFail();
    

          

            // 7. Devolver la anotación junto con los datos cargados
            return {
                theAnotation,
                route,
                contract,
                customer,
                vehicle,
                owner
            };
        } catch (error) {
            // Manejo de errores
            return { error: error.message };
        }
    }
    
    // Función para enviar correo a MS_NOTIFICATIONS
  private async sendEmailToMSNotifications(toEmail: string, subject: string, body: string) {
    try {
      const response = await axios.post(`${process.env.MS_NOTIFICATIONS}/send_email`, {
        email: toEmail,
        subject: subject,
        body: body
      });
      return response.data;
    } catch (error) {
      return { error: 'Error sending email to MS_NOTIFICATIONS', details: error.message };
    }
  }

    // Eliminar una Anotación
    public async delete({ params, response }: HttpContextContract) {
        const theAnotation = await Anotation.findOrFail(params.id)
        await theAnotation.delete()
        response.status(204)
        return
    }
}
