import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theProduct: Product = await Product.findOrFail(params.id)
            await theProduct.load("batch")
            await theProduct.load("customer")
            await theProduct.load("categoryproducts", Query=>{
                Query.preload("category")
            })
            return theProduct;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Product.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Product.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(ProductValidator);
        const body = request.body();
        const theProduct: Product = await Product.create(body);
        return theProduct;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theProduct: Product = await Product.findOrFail(params.id);
        const body = request.body();
        theProduct.name = body.name;
        theProduct.batch_id = body.batch_id;
        theProduct.customer_id = body.customer_id;

        // Confirmar el proceso en la base de datos
        return await theProduct.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theProduct: Product = await Product.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theProduct.delete();
    }
}
