import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-administrativo',
  templateUrl: './home-administrativo.component.html',
  styleUrls: ['./home-administrativo.component.scss']
})
export class HomeAdministrativoComponent implements OnInit {
  public menuCNB : boolean = false;
  public home : boolean = true;

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

}
