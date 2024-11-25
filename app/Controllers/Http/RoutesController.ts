import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';

export default class RoutesController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theRoute: Route = await Route.findOrFail(params.id)
            await theRoute.load("contract")
            await theRoute.load("vehiculo")
            await theRoute.load("batches")
            await theRoute.load("addrerouteorders", Query=>{
                Query.preload("address")
            })
            return theRoute;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Route.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Route.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theRoute: Route = await Route.create(body);
        return theRoute;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theRoute: Route = await Route.findOrFail(params.id);
        const body = request.body();
        theRoute.starting_place = body.starting_place;
        theRoute.ending_place = body.ending_place;
        theRoute.distance = body.distance;
        theRoute.delivery_date = body.delivery_date;
        theRoute.contract_id = body.contract_id;
        theRoute.vehiculo_id = body.vehiculo_id;

        // Confirmar el proceso en la base de datos
        return await theRoute.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theRoute: Route = await Route.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theRoute.delete();
    }
}