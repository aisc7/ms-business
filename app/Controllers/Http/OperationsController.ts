import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operation from 'App/Models/Operation';

export default class OperationsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theOperation: Operation = await Operation.findOrFail(params.id)
            await theOperation.load("vehiculo")
            await theOperation.load("municipality")
            return theOperation;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operation.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Operation.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOperation: Operation = await Operation.create(body);
        return theOperation;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theOperation: Operation = await Operation.findOrFail(params.id);
        const body = request.body();
        theOperation.startDate = body.startDate;
        theOperation.endDate = body.endDate;
        theOperation.vehiculo_id = body.vehiculo_id;
        theOperation.municipality_id = body.municipality_id;

        // Confirmar el proceso en la base de datos
        return await theOperation.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theOperation: Operation = await Operation.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theOperation.delete();
    }
}