import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdministrativeLoginComponent } from './administrative-login.component';
import { AdministrativeErrorComponent } from '../administrative-error/administrative-error.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginProviderService } from '../../providers/login-provider/login-provider.service';
import { HttpClient, HttpHandler, } from '@angular/common/http';

describe('AdministrativeLoginComponentTest', () => {
  let component: AdministrativeLoginComponent;
  let fixture: ComponentFixture<AdministrativeLoginComponent>;

  /**
   * ???
   */
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  //???
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AdministrativeLoginComponent, AdministrativeErrorComponent ],
      providers:[ {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { 
          provide: Router, 
          useClass: class { navigate = jasmine.createSpy("navigate");}
        }, LoginProviderService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeLoginComponent);
    component = fixture.componentInstance;
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
});
