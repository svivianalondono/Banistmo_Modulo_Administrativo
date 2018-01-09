import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Importación para hacer uso del cliente http
import { HttpParams } from '@angular/common/http/src/params';
//import { request } from 'https';
import { Observable } from 'rxjs/Observable';

/**
 * Provider para consumir el microservicio de login
 */
@Injectable()
export class LoginProviderService {

  /**
   * Método constructor
   * @param http 
   */
  constructor(public http: HttpClient) { }

  /**
   * Método para realizar la petición http al micro servicio
   * @param requestType Tipo de petición
   * @param url La url a la que se le va a hacer la petición
   * @param bodyRequest El body que puede requerirse enviar al hacer la petición
   * @param queryString Parametros adicionales que se requieran enviar como queryParams
   */
  requestHttpToServer(requestType: string, url: string, bodyRequest: JSON, queryString: HttpParams): Observable<any> {
    return this.http.request(requestType, url,
      {
        body: bodyRequest,
        observe: "response",
        params: queryString
      })
  }

}
