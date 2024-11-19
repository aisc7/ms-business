import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hotel from "App/Models/Hotel";

export default class HotelsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theHotel: Hotel = await Hotel.findOrFail(params.id);
      await theHotel.load("service"); //cargar el servicio
      return theHotel;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Hotel.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Hotel.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theHotel: Hotel = await Hotel.create(body);
    await theHotel.load("service");
    return theHotel;
  }

  public async update({ params, request }: HttpContextContract) {
    const theHotel: Hotel = await Hotel.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theHotel.stars = body.stars; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theHotel.servicio_id = body.servicio_id;
    await theHotel.load("service");
    return await theHotel.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theHotel: Hotel = await Hotel.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theHotel.delete(); //el teatro que se encontro, eliminelo
  }
}