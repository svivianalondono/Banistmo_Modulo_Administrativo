import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginProviderService } from '../../providers/login-provider/login-provider.service';
import { HttpParams } from '@angular/common/http';

/**
 * Componente que contiene la lógica de login
 */

@Component({
  selector: 'app-administrative-login',
  templateUrl: './administrative-login.component.html',
  styleUrls: ['./administrative-login.component.scss']
})
export class AdministrativeLoginComponent implements OnInit {

  year:number = new Date().getFullYear();//Variable para obtener el año actual.
  username: string; //Varible para guardar el usuario logueado
  password: string; //Varible para guardar la contraseña del usuario logueado
  error: boolean = false; //Para controlar el mensaje de error
  //variables para mostrar error en las clases
  classUsername; classPassword;

  //variables para mostrar error
  errorUsername; errorPassword;

  //validaciones de los campos 
  validate = [false, false];

  testName;

  /**
   * Método constructor
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginProvider: LoginProviderService) { }

  /**
   * Método ngOnInit, se ejecuta inmediatamente después de creado el componente
   */
  ngOnInit() {
  }

  /**
   * Método donde se realiza toda la lógica de consumo del microservicio de login
   */
  login() {
    if (this.username == "diego") { //Verifica que el usario ingresado sea diego
      let urlLogin = "/loginStage/authentication/login"; //Url a la cual se le realizará la petición
      let body: JSON; //Variable para guardar el cuerpo que se enviará en la peticion.
      let params = new HttpParams() //Parámetros adicionales a enviar en la petición.
        .append("client_id", "banistmoATM")
        .append("username", this.username)
        .append("password", this.password)
        .append("grant_type", "password");

      this.loginProvider.requestHttpToServer("POST",urlLogin, body, params) //Llamado al método que hace la petición al micro servicio
        .subscribe(response => {
          let valid = false;
          if (response.body["access_token"] != undefined) { //Si retorna el token de acceso
            valid = true;
            localStorage.setItem("access_token", response.body["access_token"]); //Se guarda el token en el localStorage
          }
          else { //Bloque de código que se ejecuta en caso de que no retorne el token. Se validan todos los errores.
            switch (response.body["error"]) { //En caso de error
              case "invalid_authentication":
                break;
              case "invalid_request":
                break;
              case "invalid_client":
                this.error = true;
                break;
              default:
                this.error = true;
                alert("Unknown error");
                break;
            }
          }
          if (valid) { //Si retornó el token y valid es true
            console.log("access_token", localStorage.getItem("access_token"))
            if (this.username == "diego") { //Verifica que el usuario sea el correcto
              console.log ("EL usuario es correcto")
              //this.router.navigate(['/Home']);
            } else { //Si no es correcto el usuario, se muestra mensaje de error
              this.error = true;
            }
          }
        },
        error => { //Bloque de código que se ejecuta en caso de que el servicio responda con un error
          console.log(error.error)
          switch (error.error["error"]) {
            case "unauthorized_client":
              this.error = true;
              if (error.error["error_description"].includes("Multiple session not allowed.")) {
                alert("El inicio de sesion no fue exitoso\nmúltiples sesiones activas no permitidas");
              }
              break;
            default:
              alert("Error al pedir el token");
              break;
          }
        });
    }
    else { //Si se ingresa usuario diferente a diego, muestra mensaje de error
      this.error = true;
    }
  }

  loginP(){
    alert(
      "prueba"
    )
    //this.router.navigate(['/imprimir']);
  }


  /**
   * Método para validar el input de username
   * @param input 
   */
  userFieldValidation(input) {
    let inputDiv = document.getElementById("usernameAdminDiv"); //Obtener el div desde el html
    let divClass:string = "col-xs-12 col-sm-8 col-md-6 col-lg-4 col-sm-offset-2 col-md-offset-3 col-lg-offset-4"; //Conservar la clase del div
    //Se verifica si el campo está vacio
    if (input.value == "undefined" || input.value == null || input.value == " ") {
      if (input.value == null) {
        inputDiv.className = divClass + " has-error";
        this.errorUsername = "Por favor verifique los datos ingresados 1";
        this.validate[0] = false;
      } else {
        inputDiv.className = divClass + " ";
        this.errorUsername = "";
        this.validate[0] = false;
      }
    } else {
      if (!input.pristine) {
        if (input.valid) {
          this.errorUsername = "";
          inputDiv.className = divClass + " ";
          this.validate[0] = true;
        } else {
          this.errorUsername = "Por favor verifique los datos ingresados. 2";
          inputDiv.className = divClass + " has-error";
          this.validate[0] = false;
        }
      } else {
        this.errorUsername = " Por favor verifique los datos ingresados 3";
        inputDiv.className = divClass + " has-error";
        this.validate[0] = false;
      }
    }
    
  }


}
