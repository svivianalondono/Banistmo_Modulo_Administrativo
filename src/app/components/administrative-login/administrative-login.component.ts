import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrative-login',
  templateUrl: './administrative-login.component.html',
  styleUrls: ['./administrative-login.component.scss']
})
export class AdministrativeLoginComponent implements OnInit {

  anio:number = new Date().getFullYear();//Obtener el año actual

  constructor() { }

  ngOnInit() {
  }

}
