import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCartComponent } from './manager-cart.component';

describe('ManagerCartComponent', () => {
  let component: ManagerCartComponent;
  let fixture: ComponentFixture<ManagerCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
