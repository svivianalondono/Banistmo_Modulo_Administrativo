import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';
import { MenuCnbComponent } from './components/menu-cnb/menu-cnb.component';
import { AdministrativeErrorComponent } from './components/administrative-error/administrative-error.component';
import { AdministrativeLogoutComponent } from './components/administrative-logout/administrative-logout.component';
import {LoginActivatorService} from './providers/login-activator/login-activator.service'
import { InterceptorProviderService } from './providers/interceptor-provider/interceptor-provider.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { RequestHttpService } from './providers/request-http/request-http.service';

const appRoutes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: 'Home', component: HomeAdministrativoComponent, canActivate: [LoginActivatorService] },  
  { path: 'Logout', component: AdministrativeLogoutComponent, canActivate: [LoginActivatorService]  },  
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
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    LoginActivatorService,
    InterceptorProviderService,
    RequestHttpService,
    
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorProviderService,
    multi: true
    }, 
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
