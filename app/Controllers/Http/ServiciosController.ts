import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio';

export default class ServiciosController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theServicio: Servicio = await Servicio.findOrFail(params.id)
            await theServicio.load('administrador')
            await theServicio.load("hotel")
            await theServicio.load("restaurant")
            await theServicio.load("spents", Query=>{
                Query.preload("conductor")
            })
            return theServicio;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Servicio.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Servicio.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(ServicioValidator);
        const body = request.body();
        const theServicio: Servicio = await Servicio.create(body);
        return theServicio;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        const body = request.body();
        theServicio.descripcion = body.descripcion;
        theServicio.costo = body.costo;

        // Confirmar el proceso en la base de datos
        return await theServicio.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theServicio.delete();
    }
}
