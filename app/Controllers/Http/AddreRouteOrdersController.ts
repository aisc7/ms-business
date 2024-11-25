import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddreRouteOrder from 'App/Models/AddreRouteOrder';

export default class AddreRouteOrdersController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.findOrFail(params.id)
            await theAddreRouteOrder.load("address")
            await theAddreRouteOrder.load("route")
            return theAddreRouteOrder;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await AddreRouteOrder.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await AddreRouteOrder.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.create(body);
        return theAddreRouteOrder;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.findOrFail(params.id);
        const body = request.body();
        theAddreRouteOrder.address_id = body.address_id;
        theAddreRouteOrder.route_id = body.route_id;

        // Confirmar el proceso en la base de datos
        return await theAddreRouteOrder.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theAddreRouteOrder.delete();
    }
}