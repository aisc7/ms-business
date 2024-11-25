import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleDriver from 'App/Models/VehicleDriver';

export default class VehicleDriversController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id)
            await theVehicleDriver.load("vehiculo")
            await theVehicleDriver.load("conductor")
            return theVehicleDriver;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await VehicleDriver.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await VehicleDriver.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theVehicleDriver: VehicleDriver = await VehicleDriver.create(body);
        return theVehicleDriver;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id);
        const body = request.body();
        theVehicleDriver.fecha_asignacion = body.fecha_asignacion;
        theVehicleDriver.fecha_desasignacion = body.fecha_desasignacion;
        theVehicleDriver.vehiculo_id = body.vehiculo_id;
        theVehicleDriver.conductor_id = body.conductor_id;

        // Confirmar el proceso en la base de datos
        return await theVehicleDriver.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theVehicleDriver.delete();
    }
}
