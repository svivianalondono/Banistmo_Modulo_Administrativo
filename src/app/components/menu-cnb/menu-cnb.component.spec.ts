import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCnbComponent } from './menu-cnb.component';

describe('MenuCnbComponent', () => {
  let component: MenuCnbComponent;
  let fixture: ComponentFixture<MenuCnbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCnbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCnbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
