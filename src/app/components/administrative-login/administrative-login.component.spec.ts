import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdministrativeLoginComponent } from './administrative-login.component';
import { AdministrativeErrorComponent } from '../administrative-error/administrative-error.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestHttpService } from '../../providers/request-http/request-http.service';
import { HttpClient, HttpHandler, } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('AdministrativeLoginComponentTest', () => {
  let component: AdministrativeLoginComponent;
  let fixture: ComponentFixture<AdministrativeLoginComponent>;
  let client: RequestHttpService;
  let spy: jasmine.Spy;

  /**
   * ???
   */
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  //???
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [AdministrativeLoginComponent, AdministrativeErrorComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
      {
        provide: Router,
        useClass: class { navigate = jasmine.createSpy("navigate"); }
        }, RequestHttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeLoginComponent);
    component = fixture.componentInstance;
    client = fixture.debugElement.injector.get(RequestHttpService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test para probar la función isEmpty cuando el string es vacío
   */
  it('should validate a empty string', () => {
    expect(component.isEmpty("")).toBeTruthy();
  });

  /**
   * Test para probar la función isEmpty cuando el string es indefinido
   */
  it('should validate a undefined value', () => {
    expect(component.isEmpty(undefined)).toBeTruthy();
  });

  /**
   * Test para probar la función isEmpty cuando el string contiene caracteres
   */
  it('should validate a correct username', () => {
    expect(component.isEmpty("diego")).toBeFalsy();
  });

  /**
   * Test para probar la función showErrorService cuando el usuario o contraseña son incorrectos
   */
  it('should validate incorrect username and password', () => {
    component.showErrorService("invalid_authentication");
    expect(component.error).toBeTruthy();
    expect(component.errorMessage).toEqual("Usuario o contraseña incorrectos, por favor verifique");
  });

  /**
   * Test para probar la función showErrorService cuando la solicitud no es válida o hay error en los parámetros
   */
  it('should validate invalid request', () => {
    component.showErrorService("invalid_request");
    expect(component.error).toBeTruthy();
    expect(component.errorMessage).toEqual("Solicitud no válida");
  });

  /**
   * Test para probar la función showErrorService cuando el clien_id es incorrecto
   */
  it('should validate invalid client', () => {
    component.showErrorService("invalid_client");
    expect(component.error).toBeTruthy();
    expect(component.errorMessage).toEqual("El cliente no es válido");
  });

  /**
   * Test para probar la función showErrorService cuando se presenta un error desconocido
   */
  it('should validate other error', () => {
    component.showErrorService("other error");
    expect(component.error).toBeTruthy();
    expect(component.errorMessage).toEqual("Ha ocurrido un error desconocido");
  });

  /**
   * Test para probar la función clear
   */
  it('should clear', () => {
    component.errorUsername = "Hide error";
    component.clear();
    expect(component.errorUsername).toBe("");
  });

  /**
   * Test para probar la función handleRequest cuando retorna el token correctamente
   */
  let JSONResponse;
  it('should get the token', () => {
    JSONResponse = { body: { "access_token": "TokenCode" } };
    component.username = "Esteban";
    component.password = "1234";
    spy = spyOn(client, 'requestHttpToServer').and.returnValue(Observable.of(JSONResponse));
    component.handleRequest(JSONResponse);
    fixture.whenStable().then((response: boolean) => {
      expect((localStorage.getItem("access_token"))).toBe("TokenCode");
    });
  });

  /**
  * Test para probar la función handleRequest cuando retorna el token correctamente
  */
  it('should not get the token', () => {
    JSONResponse = { body: { "local": "TokenCode" } };
    component.username = "Esteban";
    component.password = "1234";
    spy = spyOn(client, 'requestHttpToServer').and.returnValue(Observable.of(JSONResponse));
    component.handleRequest(JSONResponse);
    fixture.whenStable().then((response: boolean) => {
      expect((localStorage.getItem("access_token"))).toBe("TokenCode");
    });
  });

  /**
  * Test para probar la función handleRequest cuando existen múltiples sesiones para un mismo usuario
  */
  let JSONError;
  it('should get throw error', () => {
    JSONError = { error: { error: "unauthorized_client", error_description: "Multiple session not allowed." } };
    component.username = "Esteban";
    component.password = "1234";
    spy = spyOn(client, 'requestHttpToServer').and.returnValue(Observable.throw(JSONError));
    component.login();
    fixture.whenStable().catch((response) => {
      expect(response).toBe(JSONError);
    });
  });

  /**
  * Test para probar la función handleRequest cuando se presenta un error
  */
  it('should get throw error with default', () => {
    JSONError = { error: { error: "unauthorized_client2", error_description: "Multiple session not allowed." } };
    component.username = "Esteban";
    component.password = "1234";
    spy = spyOn(client, 'requestHttpToServer').and.returnValue(Observable.throw(JSONError));
    component.login();
    fixture.whenStable().catch((response) => {
      expect(response).toBe(JSONError);
    });
  });

  /**
   * Método para probar la función login
   */
  it('should return early', () => {
    component.login();
  });
  
  it('should validate a correct username without special characters', () => {
    expect(component.isAlphanumeric("diego")).toBeTruthy();
  });

  it('should validate a correct username with special characters', () => {
    component.username = "diego*";
    component.validateForm();
    expect(component.errorUsername).toBe("No se aceptan caracteres especiales");
  });


});
