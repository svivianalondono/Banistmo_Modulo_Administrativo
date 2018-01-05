import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeErrorComponent } from './administrative-error.component';

describe('AdministrativeErrorComponent', () => {
  let component: AdministrativeErrorComponent;
  let fixture: ComponentFixture<AdministrativeErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
