import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryProduct from 'App/Models/CategoryProduct';

export default class CategoryProductsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id)
            await theCategoryProduct.load("product")
            await theCategoryProduct.load("category")
            return theCategoryProduct;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await CategoryProduct.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await CategoryProduct.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategoryProduct: CategoryProduct = await CategoryProduct.create(body);
        return theCategoryProduct;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id);
        const body = request.body();
        theCategoryProduct.fecha_asignacion = body.fecha_asignacion;
        theCategoryProduct.fecha_desasignacion = body.fecha_desasignacion;
        theCategoryProduct.product_id = body.product_id;
        theCategoryProduct.category_id = body.category_id;

        // Confirmar el proceso en la base de datos
        return await theCategoryProduct.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theCategoryProduct.delete();
    }
}