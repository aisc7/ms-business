import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address';

export default class AddresssController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theAddress: Address = await Address.findOrFail(params.id)
            await theAddress.load('municipality')
            await theAddress.load("distributionCenter")
            await theAddress.load("addrerouteorders", Query=>{
                Query.preload("route")
            })
            return theAddress;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Address.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Address.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(AddressValidator);
        const body = request.body();
        const theAddress: Address = await Address.create(body);
        return theAddress;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theAddress: Address = await Address.findOrFail(params.id);
        const body = request.body();
        theAddress.street = body.street;
        theAddress.number = body.number;
        theAddress.neighborhood = body.neighborhood;
        theAddress.reference = body.reference;
        theAddress.municipality_id = body.municipality_id;
        // Confirmar el proceso en la base de datos
        return await theAddress.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theAddress: Address = await Address.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theAddress.delete();
    }
}