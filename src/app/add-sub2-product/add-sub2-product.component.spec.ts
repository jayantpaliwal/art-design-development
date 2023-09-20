import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSub2ProductComponent } from './add-sub2-product.component';

describe('AddSub2ProductComponent', () => {
  let component: AddSub2ProductComponent;
  let fixture: ComponentFixture<AddSub2ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSub2ProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSub2ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
