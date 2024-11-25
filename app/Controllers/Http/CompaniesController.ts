import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Company from "App/Models/Company";

export default class CompanysController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCompany: Company = await Company.findOrFail(params.id);
      await theCompany.load("customer"); //cargar el servicio
      await theCompany.load("NaturalPeople");
      return theCompany;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Company.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Company.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theCompany: Company = await Company.create(body);
    await theCompany.load("customer");
    return theCompany;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCompany: Company = await Company.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theCompany.company_type = body.company_type;
    theCompany.fiscal_address = body.fiscal_address; 
    theCompany.customer_id = body.customer_id;
    await theCompany.load("customer");
    return await theCompany.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theCompany: Company = await Company.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theCompany.delete(); //el teatro que se encontro, eliminelo
  }
}

