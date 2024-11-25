import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Spent from 'App/Models/Spent';

export default class SpentsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theSpent: Spent = await Spent.findOrFail(params.id)
            await theSpent.load("servicio")
            await theSpent.load("conductor")
            await theSpent.load("dueno")
            
            return theSpent;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Spent.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Spent.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(SpentValidator);
        const body = request.body();
        const theSpent: Spent = await Spent.create(body);
        return theSpent;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theSpent: Spent = await Spent.findOrFail(params.id);
        const body = request.body();
        theSpent.description = body.description;
        theSpent.monto = body.monto;
        theSpent.date = body.date;
        theSpent.servicio_id = body.servicio_id;
        theSpent.conductor_id = body.conductor_id;
        theSpent.dueno_id = body.dueno_id;

        // Confirmar el proceso en la base de datos
        return await theSpent.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theSpent: Spent = await Spent.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theSpent.delete();
    }
}
