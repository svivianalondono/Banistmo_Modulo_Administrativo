import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeAdministrativoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
