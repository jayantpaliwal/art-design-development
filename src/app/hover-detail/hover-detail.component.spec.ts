import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverDetailComponent } from './hover-detail.component';

describe('HoverDetailComponent', () => {
  let component: HoverDetailComponent;
  let fixture: ComponentFixture<HoverDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
