import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginProviderService } from './providers/login-provider/login-provider.service';//Importación del provider de login
import { InterceptorProviderService } from './providers/interceptor-provider/interceptor-provider.service';//Importación del interceptor

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';
import { AdministrativeErrorComponent } from './components/administrative-error/administrative-error.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdministrativeLoginComponent,
    AdministrativeErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule
    
  ],
  providers: [
    LoginProviderService,
    { provide: APP_BASE_HREF, useValue: '/' },
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
