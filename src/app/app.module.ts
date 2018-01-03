import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';

const routes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdministrativeLoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
