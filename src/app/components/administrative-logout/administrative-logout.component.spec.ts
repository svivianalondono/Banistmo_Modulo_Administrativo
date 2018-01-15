import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeLogoutComponent } from './administrative-logout.component';
import { RequestHttpService } from '../../providers/request-http/request-http.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


describe('AdministrativeLogoutComponent', () => {
  let component: AdministrativeLogoutComponent;
  let fixture: ComponentFixture<AdministrativeLogoutComponent>;
  let service:RequestHttpService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
			declarations: [AdministrativeLogoutComponent],
			providers: [RequestHttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeLogoutComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RequestHttpService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should close the session ', () => {

    let resJson = {
      body:{
      "message": "access_token borrado "  
      }
    }
		spy = spyOn(service, 'requestHttpToServer').and.returnValue(Observable.of(resJson));
		component.ngOnInit();

		fixture.detectChanges();

		fixture.whenStable().then((response) => {
			expect(JSON.stringify(response.body.message)).toBe(JSON.stringify(resJson.body.message));
		});
  });

  it('should not close the session', () => {

    let resJson = {
      body:{
      "message": "access_token borradow "  
      }
    }
		spy = spyOn(service, 'requestHttpToServer').and.returnValue(Observable.of(resJson));
		component.ngOnInit();

		fixture.detectChanges();

		fixture.whenStable().then((response) => {
			expect(JSON.stringify(response.body.message)).toBe(JSON.stringify(resJson.body.message));
		});
  });
  
  let errorMessage = { "error": "message" };
  it('should be a conection error', () => {
    spy = spyOn(service, 'requestHttpToServer').and.returnValue(Observable.throw(errorMessage));
    component.ngOnInit();
    fixture.whenStable().catch((error) => {
      expect(error).toBe(errorMessage);
    });
  });
  
});
