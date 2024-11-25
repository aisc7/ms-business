import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Conductor from "App/Models/Conductor";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import ConductorValidator from "App/Validators/ConductorValidator";

export default class ConductorsController {
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theConductor: Conductor = await Conductor.findOrFail(params.id);
        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${theConductor.user_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          }
        );
        await theConductor.load("spents");
        await theConductor.load("shifts");
        await theConductor.load("vehicledrivers");
        await theConductor.load("vehiculos");
        await theConductor.load("servicios");
        await theConductor.load("owner");

        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información de usuario en el microservicio",
            404
          );
        }

        return { conductor: theConductor, user: userResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Conductor.query().paginate(page, perPage);
        } else {
          return await Conductor.query();
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
      
      // Validar el conductor
      await request.validate(ConductorValidator);

      // Verificar usuario en el microservicio
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({
          error:
            "No se encontró información de usuario, verifique que el código sea correcto",
        });
      }

      // Crear el conductor
      const theConductor: Conductor = await Conductor.create(body);
      return theConductor;
    } catch (error) {
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    const body = request.body();

    theConductor.user_id = body.user_id;
    theConductor.licencia = body.licencia;
    theConductor.tipo_licencia = body.tipo_licencia;
    theConductor.telefono = body.telefono;

    return await theConductor.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(params
    )}
  
  }