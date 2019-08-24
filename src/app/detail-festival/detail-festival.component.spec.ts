import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFestivalComponent } from './detail-festival.component';

describe('DetailFestivalComponent', () => {
  let component: DetailFestivalComponent;
  let fixture: ComponentFixture<DetailFestivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFestivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
