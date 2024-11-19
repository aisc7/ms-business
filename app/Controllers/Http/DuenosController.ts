import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo de contexto para la solicitud HTTP.
import Dueno from 'App/Models/Dueno' // Importa el modelo 'Dueno' que representa los dueños en la base de datos.
import axios from "axios";
import { Exception } from "@adonisjs/core/build/standalone";
import Env from "@ioc:Adonis/Core/Env";
import DuenoValidator from 'App/Validators/DuenoValidator';

export default class DuenosController {

  // Método para obtener un dueño específico por su ID o listar todos los dueños
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca al dueño por su ID. Si no lo encuentra, lanzará una excepción.
      let theDueno: Dueno = await Dueno.findOrFail(params.id)
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${theDueno.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );
      // Carga las relaciones 'ownervehicles' y 'vehiculo' asociadas al dueño
      await theDueno.load("ownervehicles", Query => {
        Query.preload("vehiculo") // Precarga la relación 'vehiculo' dentro de 'ownervehicles'
      })

      await theDueno.load("conductor")
      
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception(
          "usuario no encontrado en el microservicio",
          404
        );
      }
      await theDueno.load("conductor")

      return { cliente: theDueno, usuario: userResponse.data };

     
    } else {
      const data = request.all() // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1) // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20) // Elementos por página, por defecto 20.
        
        // Devuelve una lista de dueños con paginación y precarga la relación 'ownervehicles'.
        return await Dueno.query().preload("ownervehicles").paginate(page, perPage)
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todos los dueños con la relación 'ownervehicles' precargada.
        return await Dueno.query().preload("ownervehicles")
      }
    }
  }

  // Método para crear un nuevo dueño
  public async create({ request, response}: HttpContextContract) {
    // Aquí puedes agregar la validación de datos, por ejemplo: await request.validate(DuenoValidator);
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.
    
    const userResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );

    if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
      return response.notFound({
        error:
        "Usuario no encontrado, verifique que el codigo sea correcto",
      });
    }
    await request.validate(DuenoValidator);
    // Crea un nuevo dueño en la base de datos con los datos proporcionados.
    const theDueno: Dueno = await Dueno.create(body);
    
    //se realiza la carga con la actualizacion
    await theDueno.load("conductor")
    await theDueno.load("ownervehicles")
    // Devuelve el dueño recién creado.
    return theDueno;
  }

  // Método para actualizar la información de un dueño
  public async update({ params, request }: HttpContextContract) {
    // Busca el dueño por su ID. Si no se encuentra, lanzará una excepción.
    const theDueno: Dueno = await Dueno.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos del dueño con los nuevos valores proporcionados.
    theDueno.nombre = body.nombre;
    theDueno.email = body.email;

    // Guarda los cambios en la base de datos.
    return await theDueno.save();
  }

  // Método para eliminar un dueño por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca el dueño por su ID. Si no se encuentra, lanzará una excepción.
    const theDueno: Dueno = await Dueno.findOrFail(params.id);
    
    // Elimina el dueño de la base de datos.
    await theDueno.delete();
    
    // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
    return response.status(204);
  }
}
