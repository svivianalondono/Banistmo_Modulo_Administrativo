import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-administrativo',
  templateUrl: './home-administrativo.component.html',
  styleUrls: ['./home-administrativo.component.scss']
})
export class HomeAdministrativoComponent implements OnInit {
  public menuCNB : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  mostrarMainCNB(){
    if(this.menuCNB)
      this.menuCNB = false;
    else
      this.menuCNB = true;
  }

}
