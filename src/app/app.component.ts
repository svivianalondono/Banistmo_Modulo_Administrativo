/* Modulo Administrativo Canales Banistmo
 * En este programa se crearán todas las funcionalidades del módulo administrativo
 * de canales, para Banistmo.
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';


  ngOnInit(){
    window.onbeforeunload = function () {
      localStorage.clear();
      return '';
    };
  }  
    
    
}
