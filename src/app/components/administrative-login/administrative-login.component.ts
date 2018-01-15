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
  errorUsername: string; errorPassword: string;//variables para mostrar error al validar campos vacíos
  inputDivUsername; inputDivPassword; //Variables para guardar los div desde el html
  

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
    this.inputDivUsername.className = "";
    this.inputDivPassword.className = "";
    this.error = false;
  }

  /**
   * Método para validar los campos del formulario
   */
  validateForm(){
    this.usernameError = this.isEmpty(this.username);
    this.passwordError = this.isEmpty(this.password);
 
    if (this.usernameError) {
      this.errorUsername = "Este campo es requerido";
      this.inputDivUsername.className = "has-error";
    }
    if (this.passwordError) {
      this.errorPassword = "Este campo es requerido";
      this.inputDivPassword.className = "has-error";
    }
    
    return this.usernameError || this.passwordError; 
  }

  //Los siguientes métodos se utilizan para realizar la petición al microservicio de login

  /**
   * Método para mostrar el error, si se presenta alguno al loguearse
   * Si el servicio responde con status 200, pero hubo error en la petición se configura el mensaje de error de acuerdo al retorno del ws
   * @param error 
   */
  showErrorService(error) { //Se validan todos los errores.
    switch (error) {
      case "invalid_authentication":
        this.error = true;
        this.errorMessage = "Usuario o contraseña incorrectos, por favor verifique";
        break;
      case "invalid_request":
        this.error = true;
        this.errorMessage = "Solicitud no válida";
        break;
      case "invalid_client":
        this.error = true;
        this.errorMessage = "El cliente no es válido";
        break;
      default:
        this.error = true;
        this.errorMessage = "Ha ocurrido un error desconocido";
        break;
    }
  }


  /**
   * Método para mostrar error en la petición de login
   * Se ejecuta cuando hay errores de multiples sesiones, o error con la comunicación al microservicio
   * @param error 
   */
  showOtherErrorService(error) {
    switch (error.error["error"]) {
      case "unauthorized_client":
        this.error = true;
        if (error.error["error_description"].includes("Multiple session not allowed.")) {
          this.errorMessage = "El inicio de sesión no fue exitoso\nMúltiples sesiones activas no permitidas."
          //alert("El inicio de sesion no fue exitoso\nmúltiples sesiones activas no permitidas");
        }
        break;
      default:
        this.error = true;
        this.errorMessage = "Error al solicitar el token";
        //alert("Error al solicitar el token");
        break;
    }
  }

  /**
   * Método para crear los parámetros que se enviarán en la petición
   */
  createLoginParams() {
    return new HttpParams() //Parámetros adicionales a enviar en la petición.
    .append("client_id", "banistmoCO")
    .append("username", this.username)
    .append("password", this.password)
    .append("grant_type", "password");
  }

  /**
   * Método para el manejo de la respuesta del ws
   * @param response 
   */
  handleRequest (response){
    if (response.body["access_token"] != undefined) { //Si retorna el token de acceso
      localStorage.setItem("access_token", response.body["access_token"]); //Se guarda el token en el localStorage
      this.router.navigate(['/Home']);//Se enruta al home transaccional
    }
    else { //Mostrar el error de acuerdo a la respuesta
      this.showErrorService(response.body["error"]);
    }
  }

  /**
   * Método donde se realiza toda la lógica de consumo del microservicio de login
   */
  login() {

    //Se verifica si el campo está vacio
    if (this.validateForm()){
      return; 
    }
    
    let urlLogin ="https://0v7brt9d84.execute-api.us-west-2.amazonaws.com/loginStage/authentication/login"
    //let urlLogin = "http://ec2-18-217-145-174.us-east-2.compute.amazonaws.com:9001/loginStage/login";//Url a la cual se le realizará la petición     
    let body: JSON; //Variable para guardar el cuerpo que se enviará en la peticion.
    let params = this.createLoginParams();
    
    this.loginProvider.requestHttpToServer("POST", urlLogin, body, params) //Llamado al método que hace la petición al microservicio
      .subscribe(this.handleRequest,
      error => { //Bloque de código que se ejecuta en caso de que el servicio responda con un error
        this.showOtherErrorService(error);
      });
  }

}
