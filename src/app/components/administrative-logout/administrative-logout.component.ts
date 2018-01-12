import { Component, OnInit } from '@angular/core';
import { RequestHttpService } from '../../providers/request-http/request-http.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-administrative-logout',
  templateUrl: './administrative-logout.component.html',
  styleUrls: ['./administrative-logout.component.scss']
})
export class AdministrativeLogoutComponent implements OnInit {


  private url = "http://ec2-18-217-145-174.us-east-2.compute.amazonaws.com:8080/logout"; //Url para realizar el consumo de logout 
  public message = ""; // msn para mostrar la respuesta del servicio
  constructor(
    private _Request : RequestHttpService
  ) { }

  ngOnInit() {

    this.cerrarSesion();
    

  }
  cerrarSesion(){

    var body:JSON;  //variable requerida 
    var parametros; //variable requerida 
    
    this._Request.requestHttpToServer("Post",this.url,body,parametros)
    .subscribe(Response =>{

      if (Response.body.message=="access_token borrado ") {
        console.log(Response.body.message);
        this.message = "Su sesión ha cerrado correctamente.";
        localStorage.clear();
      } else {
        console.log(Response.body.message);
        this.message = "Error al cerrar sesión.";
      }
      
    },error=> {
      this.message = "No hay conexion con el servidor.";
      console.log("error en ts")
    });

  }

}
