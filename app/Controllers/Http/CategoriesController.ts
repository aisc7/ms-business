import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';

export default class CategorysController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theCategory: Category = await Category.findOrFail(params.id)
            await theCategory.load("categoryproducts", Query=>{
                Query.preload("product")
            })
            return theCategory;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Category.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Category.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(CategoryValidator);
        const body = request.body();
        const theCategory: Category = await Category.create(body);
        return theCategory;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theCategory: Category = await Category.findOrFail(params.id);
        const body = request.body();
        theCategory.name = body.name;

        // Confirmar el proceso en la base de datos
        return await theCategory.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theCategory: Category = await Category.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theCategory.delete();
    }
}
