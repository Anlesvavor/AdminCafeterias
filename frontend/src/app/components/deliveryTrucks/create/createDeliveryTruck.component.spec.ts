import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryTruckComponent } from "./createDeliveryTruck.component";

describe('CreateDeliveryTruckComponent', () => {
  let component: CreateDeliveryTruckComponent;
  let fixture: ComponentFixture<CreateDeliveryTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeliveryTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliveryTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
