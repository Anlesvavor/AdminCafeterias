import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinerCheckComponent } from './dinerCheck.component';

describe('DinerCheckComponent', () => {
  let component: DinerCheckComponent;
  let fixture: ComponentFixture<DinerCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinerCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinerCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
