import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/comAdministrative.json';

@Component({
  selector: 'app-menu-cnb',
  templateUrl: './menu-cnb.component.html',
  styleUrls: ['./menu-cnb.component.scss']
})
export class MenuCnbComponent implements OnInit {
  mainAdminJson = (<any>data);
  mainAdminArray: any=[];
  llave:boolean = false;


  constructor() {  
    for (let i in this.mainAdminJson) {     
      if (this.mainAdminJson[i].subMenu) {
        this.mainAdminArray.push(this.AddArray(this.mainAdminJson[i]));
      }else{
        this.mainAdminArray.push(this.mainAdminJson[i].title)
      }      
    }
    console.log(this.mainAdminJson);
      console.log("array: "+this.mainAdminArray);  
      for (let i in this.mainAdminArray){
        console.log("index: "+i+" dato: "+this.mainAdminArray[i]+" typo de dato: "+typeof this.mainAdminArray[i]);
         
      }  
    
  }

  ngOnInit() {
  }

  private AddArray(vector) {
    let ArrayItem: any=[];
    ArrayItem.push(vector.title);
    for (let j in vector) {  
      if (!(vector[j].title==undefined)) {
        ArrayItem.push(vector[j].title);
      }          
      if (vector[j].subMenu) {
        ArrayItem.push(this.AddArray(vector[j]));
      }     
           
    }
    return ArrayItem;
  }

  validarDato(dato){
    return typeof dato;
  }

}
