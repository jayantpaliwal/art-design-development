import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add2ProductComponent } from './add-sub1-product.component';

describe('Add2ProductComponent', () => {
  let component: Add2ProductComponent;
  let fixture: ComponentFixture<Add2ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Add2ProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Add2ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
