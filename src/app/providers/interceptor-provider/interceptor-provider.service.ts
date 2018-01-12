import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Interceptor. Utilizado para interceptar las peticiones de salida
 * En éste se envía la información que va a ir en el header (el authorization requerido).
 */

@Injectable()
export class InterceptorProviderService implements HttpInterceptor {
  
  /**
   * Método constructor
   */
  constructor() { }

  /**
   * Método interceptor
   * @param request 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth; //Variable que contendrá lo que se va a enviar al authorization
    if (localStorage.getItem("access_token") == undefined)//Se verifica que el token exista en el localStorage
      auth = "Basic YmFuaXN0bW9BVE06Y25ic2VjcmV0QVRN";//Authorization requerido para acceder al microservicio de login. Por configuración de ws es éste por defecto.
    else
      auth = "bearer " + localStorage.getItem("access_token");
    request = request.clone({ //Para sobreescribir el request
      setHeaders: {//Adicionamos los headers necesarios
        "Authorization": auth,
        "Content-Type": "application/json"
      }
    });
    return next.handle(request);
  }

  

}
