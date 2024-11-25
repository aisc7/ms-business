import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batch from 'App/Models/Batch'

export default class BatchesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theBatch: Batch = await Batch.findOrFail(params.id)
            await theBatch.load("products")
            await theBatch.load("routes")
            return theBatch;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Batch.query().paginate(page, perPage)
            } else {
                return await Batch.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theBatch: Batch = await Batch.create(body);
        await theBatch.load("routes")
        return theBatch;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBatch: Batch = await Batch.findOrFail(params.id);
        const body = request.body();
        theBatch.quantity = body.quantity;
        theBatch.route_id = body.route_id;
        await theBatch.load("routes")
        return await theBatch.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBatch: Batch = await Batch.findOrFail(params.id);
        await theBatch.delete();
        return response.status(200).json({
            message: 'Lote eliminado con éxito'
        });
    }
}