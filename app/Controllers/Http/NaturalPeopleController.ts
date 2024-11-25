import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NaturalPerson from "App/Models/NaturalPerson";
import NaturalPersonValidator from "App/Validators/NaturalPersonValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from "@adonisjs/core/build/standalone";

export default class NaturalPeopleController {
  // Método para encontrar una persona natural
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        await theNaturalPerson.load("Company");
        await theNaturalPerson.load("customer");
        return theNaturalPerson;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await NaturalPerson.query().paginate(page, perPage);
        } else {
          return await NaturalPerson.query();
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para crear una nueva persona natural
  public async create({ request, response }: HttpContextContract) {
    try {
      const body = request.body();

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({
          error: "No se encontró información de usuario, verifique que el código sea correcto",
        });
      }
      
      // Validación de los datos usando NaturalPersonValidator
      await request.validate(NaturalPersonValidator);

      // Creación de la persona natural
      const theNaturalPerson: NaturalPerson = await NaturalPerson.create(body);
      await theNaturalPerson.load("Company");
      await theNaturalPerson.load("customer");

      return theNaturalPerson;
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

  // Método para actualizar una persona natural
  public async update({ params, request }: HttpContextContract) {
    try {
      const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
      const body = request.body();

      theNaturalPerson.user_id = body.user_id;
      theNaturalPerson.document_type = body.document_type;
      theNaturalPerson.document_number = body.document_number;
      theNaturalPerson.birth_date = body.birth_date;
      theNaturalPerson.company_id = body.company_id;
      theNaturalPerson.customer_id = body.customer_id;

      await theNaturalPerson.load("Company");
      await theNaturalPerson.load("customer");

      await theNaturalPerson.save();
      return theNaturalPerson;
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para eliminar una persona natural
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
      await theNaturalPerson.delete();
      return response.status(200).json({
        message: "Persona natural eliminada con éxito",
      });
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }
}
