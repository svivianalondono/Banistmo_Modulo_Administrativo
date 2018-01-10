import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginProviderService } from './providers/login-provider/login-provider.service';//Importación del provider de login
import { InterceptorProviderService } from './providers/interceptor-provider/interceptor-provider.service';//Importación del interceptor

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
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
    ),
    HttpClientModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [
    LoginProviderService,
    InterceptorProviderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProviderService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
