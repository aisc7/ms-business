import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import AdministratorValidator from "App/Validators/AdministratorValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theAdministrator: Administrator = await Administrator.findOrFail(
          params.id
        );
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${theAdministrator.user_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          }
        );
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información de usuario en el microservicio",
            404
          );
        }
        await theAdministrator.load("servicio");
        return { Administrator: theAdministrator, usuario: userResponse.data }; 
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Administrator.query().paginate(page, perPage); 
        } else {
          return await Administrator.query(); 
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const body = request.body();
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        await request.validate(AdministratorValidator); 

        return response.notFound({
          error:
            "Información de usuario no encontrada",
        });
      }
      // Crear el Administrator si la validación y la verificación de usuario son exitosas
      await request.validate(AdministratorValidator);
      const theAdministrator: Administrator = await Administrator.create(body);
      await theAdministrator.load("servicio");

      return theAdministrator;
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    ); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theAdministrator.user_id = body.user_id; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    await theAdministrator.load("servicio");

    return await theAdministrator.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theAdministrator.delete(); //el teatro que se encontro, eliminelo
  }
}