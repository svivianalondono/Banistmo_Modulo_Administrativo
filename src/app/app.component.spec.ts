import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';
import { MenuCnbComponent } from './components/menu-cnb/menu-cnb.component';
import { AdministrativeLoginComponent } from './components/administrative-login/administrative-login.component';
import { AdministrativeErrorComponent } from './components/administrative-error/administrative-error.component';
import { AdministrativeLogoutComponent } from './components/administrative-logout/administrative-logout.component';
import { LoginActivatorService } from './providers/login-activator/login-activator.service'
import { RequestHttpService } from './providers/request-http/request-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InterceptorProviderService } from './providers/interceptor-provider/interceptor-provider.service';
import { APP_BASE_HREF } from '@angular/common';




const routes: Routes = [
  { path: 'Login', component: AdministrativeLoginComponent },
  { path: 'Home', component: HomeAdministrativoComponent, canActivate: [LoginActivatorService] },
  { path: 'Logout', component: AdministrativeLogoutComponent, canActivate: [LoginActivatorService] },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeAdministrativoComponent,
        AdministrativeLoginComponent,
        AdministrativeErrorComponent,
        AdministrativeLogoutComponent,
        MenuCnbComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
          routes,
          { enableTracing: true } // <-- debugging purposes only
        ),
        HttpClientModule,
        FormsModule

      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        LoginActivatorService,
        InterceptorProviderService,
        RequestHttpService,

        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorProviderService,
          multi: true
        },
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
