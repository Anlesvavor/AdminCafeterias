import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: ProductsCreateComponent;
  let fixture: ComponentFixture<ProductsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
