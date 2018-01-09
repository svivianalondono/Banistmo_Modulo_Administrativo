import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeLogoutComponent } from './administrative-logout.component';

describe('AdministrativeLogoutComponent', () => {
  let component: AdministrativeLogoutComponent;
  let fixture: ComponentFixture<AdministrativeLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
