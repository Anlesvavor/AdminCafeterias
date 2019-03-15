import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryTrucksComponent } from './editDeliveryTrucks.component';

describe('EditDeliveryTrucksEditComponent', () => {
  let component: EditDeliveryTrucksComponent;
  let fixture: ComponentFixture<EditDeliveryTrucksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryTrucksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
