import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';
import { MenuCnbComponent } from './components/menu-cnb/menu-cnb.component';
import { AdministrativeErrorComponent } from './components/administrative-error/administrative-error.component';
import { AdministrativeLogoutComponent } from './components/administrative-logout/administrative-logout.component';


const appRoutes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: 'Home', component: HomeAdministrativoComponent },  
  { path: 'Logout', component: AdministrativeLogoutComponent },  
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,

    HomeAdministrativoComponent,
    AdministrativeLoginComponent,
    MenuCnbComponent,
    AdministrativeErrorComponent,    
    AdministrativeLogoutComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
