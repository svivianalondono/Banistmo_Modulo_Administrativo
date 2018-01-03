import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';
import { MenuCnbComponent } from './components/menu-cnb/menu-cnb.component';


const routes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: 'Home', component: HomeAdministrativoComponent },  
  { path: 'CNBMenu', component: MenuCnbComponent },  
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeAdministrativoComponent,
    AdministrativeLoginComponent,
    MenuCnbComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
