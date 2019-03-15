import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliveryTruckComponent } from './listDeliveryTruck.component';

describe('ListDeliveryTruckComponent', () => {
  let component: ListDeliveryTruckComponent;
  let fixture: ComponentFixture<ListDeliveryTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeliveryTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeliveryTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
