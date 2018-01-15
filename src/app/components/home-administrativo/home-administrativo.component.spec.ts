
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomeAdministrativoComponent } from './home-administrativo.component';
import {MenuCnbComponent} from '../menu-cnb/menu-cnb.component'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core/src/metadata/directives';
import { AppModule } from '../../app.module';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}


describe('HomeAdministrativoComponent', () => {
  let component: HomeAdministrativoComponent;
  let fixture: ComponentFixture<HomeAdministrativoComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdministrativoComponent, MenuCnbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the menuBar true case 0=true', () => {
    component.switMenu[0] = true;
    component.ocultarMenu(true);
  });

  it('should test the menuBar true case 0=false 1=false', () => {
    component.switMenu[0] = false;
    component.switMenu[1] = false;

    component.ocultarMenu(true);
  });


  it('should test the menuBar false case 0=true', () => {
    component.switMenu[0] = true;
    component.ocultarMenu(false);
  });

  it('should test the menuBar false case 0=false 1=true', () => {
    component.switMenu[0] = false;
    component.switMenu[1] = true;

    component.ocultarMenu(false);
  });

  it('should test the menuBar false case 0=false 1=false', () => {
    component.switMenu[0] = false;
    component.switMenu[1] = false;

    component.ocultarMenu(false);
  });
});




