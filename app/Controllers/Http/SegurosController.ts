import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';

export default class SegurosController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theSeguro: Seguro = await Seguro.findOrFail(params.id)
            await theSeguro.load('vehiculo')
            return theSeguro;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Seguro.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Seguro.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(SeguroValidator);
        const body = request.body();
        const theSeguro: Seguro = await Seguro.create(body);
        return theSeguro;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theSeguro: Seguro = await Seguro.findOrFail(params.id);
        const body = request.body();
        theSeguro.compania = body.compania;
        theSeguro.numeroPoliza = body.numeroPoliza;
        theSeguro.fechaVencimiento = body.fechaVencimiento;
        theSeguro.vehiculo_id = body.vehiculo_id;

        // Confirmar el proceso en la base de datos
        return await theSeguro.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theSeguro: Seguro = await Seguro.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theSeguro.delete();
    }
}
