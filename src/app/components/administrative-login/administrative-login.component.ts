import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrative-login',
  templateUrl: './administrative-login.component.html',
  styleUrls: ['./administrative-login.component.scss']
})
export class AdministrativeLoginComponent implements OnInit {

  year:number = new Date().getFullYear();//Obtener el año actual

  constructor() { }

  ngOnInit() {
  }

  asignarToken(){
    localStorage.setItem("access_token","eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTMwMjQ2ODMsInVzZXJfbmFtZSI6ImRpZWdvIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImVlZWFhNjE1LTc1ZDQtNDJmNC04ZjVkLWFmYWQ1N2UzNjE1YiIsImNsaWVudF9pZCI6ImJhbmlzdG1vQVRNIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.CJ8Vtf-4ZoXXzBcIUA6sk-hELFEXLXBBGDnxMxoe9kGL5GmRPDqAMgscRlFCSu0Mtbsj9UY9tEfWdivJODLOOOHkWBclJJ4VhSPoCMGkdQal3sH1fZf3hndYEX7kDYFzduNNGMHrVtwS0JViUPT_Of6hJjmd8XNQqTq892yzY2gxC6p0YOZnYCA0_V0xie83eIvrZHn8KDeEbTd3Apb57kZNpbBAfrbcRZ1l5Xk-okRVcadO-1DnTSBq-cA2bjBJqlodu_Eo9zqE1Om78p7IhEKtemEBid4WPFfaU3kIA8jrQ87LdhYQx9dnK6Ei6CdrLE-cgzaEIYmjnxcnqPwHFQ");

    alert("se agrego el token...");
  }

}
