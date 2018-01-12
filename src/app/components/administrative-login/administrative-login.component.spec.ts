import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdministrativeLoginComponent } from './administrative-login.component';
import { AdministrativeErrorComponent } from '../administrative-error/administrative-error.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginProviderService } from '../../providers/login-provider/login-provider.service';
import { HttpClient, HttpHandler, } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Observable} from 'rxjs';

fdescribe('AdministrativeLoginComponentTest', () => {
  let component: AdministrativeLoginComponent;
  let fixture: ComponentFixture<AdministrativeLoginComponent>;
  let client: LoginProviderService; 
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
      imports: [ FormsModule, HttpClientModule],
      declarations: [ AdministrativeLoginComponent, AdministrativeErrorComponent ],
      providers:[ {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { 
          provide: Router, 
          useClass: class { navigate = jasmine.createSpy("navigate");}
        }, LoginProviderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeLoginComponent);
    component = fixture.componentInstance;
    client = fixture.debugElement.injector.get(LoginProviderService);

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

  let JSONResponse ={body: {"access_token": "MuyBien"}};
  it('should get the token',() =>{
    component.password ="1234";
    component.username = "Hola";
    spy = spyOn(client, 'requestHttpToServer').and.returnValue(Observable.of(JSONResponse));
    component.login();
    fixture.whenStable().then((response:boolean) => {
      expect((localStorage.getItem("access_token"))).toBe("MuyBien");
    });
  });

  it ('should clear', () =>{
    component.errorUsername ="Hola";
    component.clear();
    expect(component.errorUsername).toBe("");
  })
});
