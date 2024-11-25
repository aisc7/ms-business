/**import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class Security {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    //se convierte la carta en json(viene el token, ruta y el metodo en el que se esta apuntando)
    let theRequest = request.toJSON()
    console.log(theRequest);

    //aca se valida si en la carta viene el token
    if (theRequest.headers.authorization) {
      //quita la palabra bearer ya que lo que no tiene el bearer es el token, aca se obtieneel token 
      let token = theRequest.headers.authorization.replace("Bearer ", "")
      //se arma un json que tiene url y metodo, arma el permiso para preguntar al ms de seguridad si el usuario puede entrar o no 
      let thePermission: object = {
        url: theRequest.url,
        method: theRequest.method
      }
      //conexion del ms-security con ms-cinema 
      try {
        //verdadero o falso si entra o no entra, le dice a axios que si llama de tipo post a una api, va al servidor de seguridad, apunta al endpoint permissios-validation en security, manda en el body la informacion de un permiso porqueen l clase permiso hay de atributos url y metodo 
        const result = await axios.post(`${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`, thePermission,
          {
            //en la peticion se envia en el encabezado de la peticion se envian los headers donde esta la autorizacion con el token 
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        //respuesta del ms-security
        console.log("La respuesta de ms-security >" + result.data + "<")
        //si la respuesta es verdadera, entonces deja pasar al usuario 
        if (result.data == true) {
          console.log(result.data)
          //este es el que deja pasar 
          await next()
        } else {
          //sino, devuelve un error 401
          console.log("no puede ingresar")
          return response.status(401)
        }
      } catch (error) {
        console.error(error)
        return response.status(401)
      }
    }else{
      return response.status(401) 
    }

  }
}
**/