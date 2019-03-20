import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDinerDeliversComponent } from './list-diner-delivers.component';

describe('ListDinerDeliversComponent', () => {
  let component: ListDinerDeliversComponent;
  let fixture: ComponentFixture<ListDinerDeliversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDinerDeliversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDinerDeliversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
