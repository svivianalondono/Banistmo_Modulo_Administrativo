import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';
=======
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';
>>>>>>> 9fe9a488b212833788f43a0409c2871ed779e230

const routes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomeAdministrativoComponent
=======
    AdministrativeLoginComponent
>>>>>>> 9fe9a488b212833788f43a0409c2871ed779e230
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
