import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';

export default class CuotasController {

        public async find({ request, params }: HttpContextContract) {
          // Listar un elemento por Id
          if (params.id) {
            let theCuota = await Cuota.findOrFail(params.id)
            
            // Cargar la relación 'factura'
            await theCuota.load('factura')
            await theCuota.load("contract")
            
            return theCuota
          } else {
            const data = request.all()
            
            // Listar elementos por página
            if ("page" in data && "per_page" in data) {
              const page = request.input('page', 1)
              const perPage = request.input("per_page", 20)
              
              // Paginar las cuotas y precargar la relación 'factura'
              return await Cuota.query().preload('factura').paginate(page, perPage)
            } else {
              // Listar todas las cuotas y precargar la relación 'factura'
              return await Cuota.query().preload('factura')
            }
          }
        }      

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(CuotaValidator);
        const body = request.body();
        const theCuota: Cuota = await Cuota.create(body);
        return theCuota;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        const body = request.body();
        theCuota.monto = body.monto;
        theCuota.fecha_vencimiento = body.fecha_vencimiento;
        theCuota.estado_pago = body.estado_pago;
        // Confirmar el proceso en la base de datos
        return await theCuota.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        await theCuota.load("factura");
        
        if (theCuota["factura"] == null) {
            // Retorno la acción de borrado
            await theCuota.delete();
            return response.status(204);
        } else {
            // Respuesta si la cuota tiene una factura asignada
            return response.status(400).json({
                alert: "No se puede eliminar la cuota porque tiene una factura asignada"
            });
        }
    }
}
