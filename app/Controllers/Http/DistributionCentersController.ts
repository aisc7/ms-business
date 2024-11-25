import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistributionCenter from 'App/Models/DistributionCenter';

export default class DistributionCentersController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id)
            await theDistributionCenter.load('municipality')
            await theDistributionCenter.load("address")
            return theDistributionCenter;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DistributionCenter.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await DistributionCenter.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(DistributionCenterValidator);
        const body = request.body();
        const theDistributionCenter: DistributionCenter = await DistributionCenter.create(body);
        return theDistributionCenter;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
        const body = request.body();
        theDistributionCenter.name = body.name;
        theDistributionCenter.phone = body.phone;
        theDistributionCenter.email = body.email;
        theDistributionCenter.capacity = body.capacity;
        theDistributionCenter.address_id = body.address_id;
        theDistributionCenter.municipality_id = body.municipality_id;
        // Confirmar el proceso en la base de datos
        return await theDistributionCenter.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theDistributionCenter.delete();
    }
}