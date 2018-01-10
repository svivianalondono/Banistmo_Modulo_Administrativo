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
  errorMessage: string; //Variable para almacenar el mensaje de error
  usernameError: boolean = false; //Variable para almacenar el mensaje de error que valida username como campo obligatorio
  passwordError: boolean = false; //Variable para almacenar el mensaje de error que valida password como campo obligatorio
  //variables para mostrar error en las clases
  classUsername; classPassword;

  //variables para mostrar error al validar campos vacíos
  errorUsername: string; errorPassword: string;


  inputDivUsername; inputDivPassword; //Variables para guardar los div desde el html
  divClass:string = "col-xs-12 col-sm-8 col-md-6 col-lg-4 col-sm-offset-2 col-md-offset-3 col-lg-offset-4"; //Conservar la clase del div
  

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
    this.inputDivUsername = document.getElementById("usernameAdminDiv"); //Obtener el div de username desde el html
    this.inputDivPassword = document.getElementById("passwordAdminDiv"); //Obtener el div de password desde el html
  }

  /**
   * Método para verificar campos vacíos
   * @param text 
   */
  isEmpty (text:string) {
    return text == undefined || text == "";
  }

  /**
   * Método para limpiar inputs y ocultar error.
   */
  clear(){
    this.errorUsername = "";
    this.errorPassword = "";
    this.inputDivUsername.className = this.divClass;
    this.inputDivPassword.className = this.divClass;
    this.error = false;
  }

  /**
   * Método donde se realiza toda la lógica de consumo del microservicio de login
   */
  login() {

    //Se verifica si el campo está vacio
    this.usernameError = this.isEmpty(this.username);
    this.passwordError = this.isEmpty(this.password);

    if (this.usernameError) {
      if (this.passwordError) {
        this.errorUsername = "Por favor verifique los datos ingresados.";
        this.inputDivUsername.className = this.divClass + " has-error";
        this.errorPassword = "Por favor verifique los datos ingresados.";
        this.inputDivPassword.className = this.divClass + " has-error";
        return;
      }else{
        this.errorUsername = "Por favor verifique los datos ingresados.";
        this.inputDivUsername.className = this.divClass + " has-error";
        return;
      } 
    }else{
      if (this.passwordError) {
        this.errorPassword = "Por favor verifique los datos ingresados.";
        this.inputDivPassword.className = this.divClass + " has-error";
        return;
      }
    }

    
    let urlLogin = "http://ec2-18-217-145-174.us-east-2.compute.amazonaws.com:9001/loginStage/login";//Url a la cual se le realizará la petición     
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
          this.router.navigate(['/Home']);//Se enruta al home administrativo
        }
        else { //Bloque de código que se ejecuta en caso de que no retorne el token. Se validan todos los errores.
          //Si el servicio responde con status 200, pero hubo error en la peticion se configura el mensaje de erro de acuerdo al retorno del ws
          switch (response.body["error"]) {
            case "invalid_authentication":
              this.error = true;
              this.errorMessage = "El usurio o la contraseña no son correctos.";
              break;
            case "invalid_request":
              this.error = true;
              this.errorMessage = "invalid_request";
              break;
            case "invalid_client":
              this.error = true;
              this.errorMessage = "invalid_client";
              break;
            default:
              this.error = true;
              this.errorMessage = "Ha ocurrido un error desconocido";
              alert("Unknown error");
              break;
            }
          }
      },
      error => { //Bloque de código que se ejecuta en caso de que el servicio responda con un error
        console.log(error.error)
        switch (error.error["error"]) {
          case "unauthorized_client":
            this.error = true;
            if (error.error["error_description"].includes("Multiple session not allowed.")) {
              this.errorMessage = "El inicio de sesión no fue exitoso\nMúltiples sesiones activas no permitidas"
              //alert("El inicio de sesion no fue exitoso\nmúltiples sesiones activas no permitidas");
            }
            break;
          default:
            this.error = true;
            this.errorMessage = "Error al pedir el token";
            //alert("Error al pedir el token");
            break;
        }
      });  
  }



}
