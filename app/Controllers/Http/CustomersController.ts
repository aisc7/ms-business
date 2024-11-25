import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";
import CustomerValidator from "App/Validators/CustomerValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from "@adonisjs/core/build/standalone";

//Aca se hacen todas las operaciones del crud
export default class CustomersController {
  //logica de funcionamiento del controlador

  // Método para encontrar un cliente (Customer)
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theCustomer: Customer = await Customer.findOrFail(params.id);
        //se llama al ms-security para validar a los usuarios
      
        await theCustomer.load("company");
        await theCustomer.load("contracts");
        await theCustomer.load("naturalperson");
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${theCustomer.user_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          }
        );
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información del usuario en el sistema",
            404
          );
        }
        return { cliente: theCustomer, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Customer.query().paginate(page, perPage);
        } else {
          return await Customer.query(); // Espera la respuesta de la base de datos
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
      // Validar datos usando el CustomerValidator
      const body = request.body();
      // Llamada al MS_SECURITY para validar al usuario
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );
      // Verificar si no se encontró información del usuario en el microservicio
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({
          error:
            "No se encontró información del usuario, verifique que el id sea correcto",
        });
      }

      // Crear el driver si la validación y la verificación de usuario son exitosas
      await request.validate(CustomerValidator);
      const theCustomer: Customer = await Customer.create(body);
      await theCustomer.load("naturalperson");
      await theCustomer.load("company");
      await theCustomer.load("contracts");
      return theCustomer;
    } catch (error) {
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
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const body = request.body();
    theCustomer.user_id = body.user_id;
    theCustomer.name = body.name;
    theCustomer.email = body.email;
    theCustomer.phone = body.phone;
    theCustomer.order_count = body.order_count;

    await theCustomer.load("naturalperson");
    await theCustomer.load("company");
    await theCustomer.load("contracts");
    return await theCustomer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    await theCustomer.delete();
    return response.status(200).json({
      message: "Cliente eliminado con éxito",
    });
  }
}
