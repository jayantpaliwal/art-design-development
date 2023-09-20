import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubsection2Component } from './update-subsection2.component';

describe('UpdateSubsection2Component', () => {
  let component: UpdateSubsection2Component;
  let fixture: ComponentFixture<UpdateSubsection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubsection2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubsection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
