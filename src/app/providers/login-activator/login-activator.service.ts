import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';

@Injectable()
export class LoginActivatorService {

  constructor(private _router: Router) { }

  canActivate(    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTMwMjQ2ODMsInVzZXJfbmFtZSI6ImRpZWdvIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImVlZWFhNjE1LTc1ZDQtNDJmNC04ZjVkLWFmYWQ1N2UzNjE1YiIsImNsaWVudF9pZCI6ImJhbmlzdG1vQVRNIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.CJ8Vtf-4ZoXXzBcIUA6sk-hELFEXLXBBGDnxMxoe9kGL5GmRPDqAMgscRlFCSu0Mtbsj9UY9tEfWdivJODLOOOHkWBclJJ4VhSPoCMGkdQal3sH1fZf3hndYEX7kDYFzduNNGMHrVtwS0JViUPT_Of6hJjmd8XNQqTq892yzY2gxC6p0YOZnYCA0_V0xie83eIvrZHn8KDeEbTd3Apb57kZNpbBAfrbcRZ1l5Xk-okRVcadO-1DnTSBq-cA2bjBJqlodu_Eo9zqE1Om78p7IhEKtemEBid4WPFfaU3kIA8jrQ87LdhYQx9dnK6Ei6CdrLE-cgzaEIYmjnxcnqPwHFQ";
    if (localStorage.getItem("access_token")===token) {      
      return true;      
    }else{   
      alert ("La sesión no esta iniciada.")   
      this._router.navigate(['/Login']);
    }
    
  }
    

}
