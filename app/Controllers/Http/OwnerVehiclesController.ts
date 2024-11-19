import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OwnerVehicle from 'App/Models/OwnerVehicle';

export default class OwnerVehiclesController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id)
            await theOwnerVehicle.load("vehiculo")
            await theOwnerVehicle.load("dueno")
            return theOwnerVehicle;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await OwnerVehicle.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await OwnerVehicle.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.create(body);
        return theOwnerVehicle;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
        const body = request.body();
        theOwnerVehicle.fechaAsignacion = body.fechaAsignacion;
        theOwnerVehicle.fechaDesasignacion = body.fechaDesasignacion;
        theOwnerVehicle.vehiculo_id = body.vehiculo_id;
        theOwnerVehicle.dueno_id = body.dueno_id;

        // Confirmar el proceso en la base de datos
        return await theOwnerVehicle.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theOwnerVehicle.delete();
    }
}