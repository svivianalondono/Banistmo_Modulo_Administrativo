import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-administrativo',
  templateUrl: './home-administrativo.component.html',
  styleUrls: ['./home-administrativo.component.scss']
})
export class HomeAdministrativoComponent implements OnInit {
  public menuCNB : boolean = false; //valida que las opciones del menu navbar del canal CNB se muestr o no.
  public home : boolean = true; //valida que las opciones del home se muestre o no.
  public switMenu = [false,false]; //valida que los 2 menus no se solapen. 
  
  // variable temporal para separar
  Separar= ["","","","","","",""]

  constructor() { }

  ngOnInit() {
  }

  cerrarDiv(){
    this.home = false;
    this.menuCNB = false;
  }

  mostrarMain(key){
    // alert("entro a mostrar");
    this.cerrarDiv();
    switch (key) {
      
      case 'home':
      // alert("entro a home");
        this.home = true;
        break;
      case 'CNB':        
        this.menuCNB = true;        
        break;
    
      default:
        break;
    }
   
  }

  ocultarMenu(value){
    // validamos quien esta hacieno la peticion
    if (value) {
      // validamos si el elemento esta activo
      if (this.switMenu[0]) {
        this.switMenu[0] = false;
      } else {
        if (this.switMenu[1]) {
          document.getElementById("secondMenuToggle").click();
          this.switMenu[1] = false;          
        }
        this.switMenu[0] = true;
      }   
      // console.log("navar: " + this.switMenu[1] +" y swit: "+ this.switMenu[0] )
    } else {
      if (this.switMenu[1]) {
        this.switMenu[1] = false;
      } else {
        if (this.switMenu[0]) {
          document.getElementById("menu-switch").click();
          this.switMenu[0] = false;
        }
        this.switMenu[1] = true;
      }
      // console.log("navar: " + this.switMenu[1] +" y swit: "+ this.switMenu[0] )
    } 
  }

}
