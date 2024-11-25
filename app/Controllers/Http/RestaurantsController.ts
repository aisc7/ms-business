import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Restaurant from "App/Models/Restaurant";

export default class RestaurantsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
      await theRestaurant.load("service"); //cargar el servicio
      return theRestaurant;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Restaurant.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Restaurant.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theRestaurant: Restaurant = await Restaurant.create(body);
    await theRestaurant.load("service");
    return theRestaurant;
  }

  public async update({ params, request }: HttpContextContract) {
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theRestaurant.stars = body.stars; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theRestaurant.servicio_id = body.servicio_id;
    await theRestaurant.load("service");
    return await theRestaurant.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theRestaurant.delete(); //el teatro que se encontro, eliminelo
  }
}