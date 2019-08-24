import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextfestivalComponent } from './nextfestival.component';

describe('NextfestivalComponent', () => {
  let component: NextfestivalComponent;
  let fixture: ComponentFixture<NextfestivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextfestivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextfestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
