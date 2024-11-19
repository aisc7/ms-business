import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department';

export default class DepartmentsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theDepartment: Department = await Department.findOrFail(params.id)
            await theDepartment.load('municipalities')
            return theDepartment;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Department.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Department.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(DepartmentValidator);
        const body = request.body();
        const theDepartment: Department = await Department.create(body);
        return theDepartment;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theDepartment: Department = await Department.findOrFail(params.id);
        const body = request.body();
        theDepartment.name = body.name;
        theDepartment.description = body.description;

        // Confirmar el proceso en la base de datos
        return await theDepartment.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theDepartment: Department = await Department.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theDepartment.delete();
    }
}