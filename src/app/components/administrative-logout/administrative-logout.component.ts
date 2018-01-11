import { Component, OnInit } from '@angular/core';
import { RequestHttpService } from '../../providers/request-http/request-http.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-administrative-logout',
  templateUrl: './administrative-logout.component.html',
  styleUrls: ['./administrative-logout.component.scss']
})
export class AdministrativeLogoutComponent implements OnInit {


  private url = "http://ec2-18-217-145-174.us-east-2.compute.amazonaws.com:8080/logout";

  

  // public message = "Su sesión ha cerrado correctamente.";
  constructor(
    private _Request : RequestHttpService
  ) { }

  ngOnInit() {

    this.cerrarSesion();
    

  }
  cerrarSesion(){

    var body:JSON;
    var parametros;
    this._Request.requestHttpToServer("Post",this.url,body,parametros).subscribe(Response =>{
      console.log(Response.body.message);

    },error=> {
      console.log("error")
    });

  }

}
