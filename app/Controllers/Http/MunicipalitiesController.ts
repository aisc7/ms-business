import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality';

export default class MunicipalitysController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theMunicipality: Municipality = await Municipality.findOrFail(params.id)
            await theMunicipality.load('department')
            await theMunicipality.load("addresses")
            await theMunicipality.load("distributioncenters")
            await theMunicipality.load("operations", Query=>{
                Query.preload("vehiculo")
            })
            return theMunicipality;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Municipality.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Municipality.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(MunicipalityValidator);
        const body = request.body();
        const theMunicipality: Municipality = await Municipality.create(body);
        return theMunicipality;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
        const body = request.body();
        theMunicipality.name = body.name;
        theMunicipality.description = body.description;
        theMunicipality.department_id = body.department_id;

        // Confirmar el proceso en la base de datos
        return await theMunicipality.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theMunicipality.delete();
    }
}