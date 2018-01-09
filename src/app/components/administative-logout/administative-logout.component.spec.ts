import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministativeLogoutComponent } from './administative-logout.component';

describe('AdministativeLogoutComponent', () => {
  let component: AdministativeLogoutComponent;
  let fixture: ComponentFixture<AdministativeLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministativeLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministativeLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
