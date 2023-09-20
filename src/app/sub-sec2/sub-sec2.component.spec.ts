import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSec2Component } from './sub-sec2.component';

describe('SubSec2Component', () => {
  let component: SubSec2Component;
  let fixture: ComponentFixture<SubSec2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSec2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSec2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
