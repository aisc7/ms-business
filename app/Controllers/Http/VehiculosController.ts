import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';

export default class VehiculosController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id)
            await theVehiculo.load("seguros")
            await theVehiculo.load("vehicledrivers", Query=>{
                Query.preload("conductor")
            })
            await theVehiculo.load("ownervehicles", Query=>{
                Query.preload("dueno")
            })
            await theVehiculo.load("routes", Query=>{
                Query.preload("contract")
            })
            await theVehiculo.load("operations", Query=>{
                Query.preload("municipality")
            })
            return theVehiculo;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Vehiculo.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Vehiculo.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(VehiculoValidator);
        const body = request.body();
        const theVehiculo: Vehiculo = await Vehiculo.create(body);
        return theVehiculo;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
        const body = request.body();
        theVehiculo.tipo_vehiculo = body.tipo_vehiculo;
        theVehiculo.capacidad_peso = body.capacidad_peso;
        theVehiculo.capacidad_volumen = body.capacidad_volumen;
        theVehiculo.estado = body.estado;
        // Confirmar el proceso en la base de datos
        return await theVehiculo.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theVehiculo.delete();
    }
}
