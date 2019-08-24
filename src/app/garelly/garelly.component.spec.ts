import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarellyComponent } from './garelly.component';

describe('GarellyComponent', () => {
  let component: GarellyComponent;
  let fixture: ComponentFixture<GarellyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarellyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarellyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
