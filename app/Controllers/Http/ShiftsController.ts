import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Shift from "App/Models/Shift";
//import ShiftValidator from "App/Validators/ShiftValidator";

export default class ShiftsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theShift: Shift = await Shift.findOrFail(params.id);
      await theShift.load("conductor"); //*Devuelve que conductor tiene ese turno

      return theShift;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Shift.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Shift.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theShift: Shift = await Shift.create(body);
    await theShift.load("conductor"); //*Devuelve que conductor tiene ese turno

    return theShift;
  }

  public async update({ params, request }: HttpContextContract) {
    const theShift: Shift = await Shift.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theShift.start_time = body.start_time; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theShift.end_time = body.end_time; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theShift.location = body.location; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theShift.conductor_id = body.conductor_id;
    await theShift.load("conductor"); //*Devuelve que conductor tiene ese turno

    return await theShift.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theShift: Shift = await Shift.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theShift.delete(); //el teatro que se encontro, eliminelo
  }
}
