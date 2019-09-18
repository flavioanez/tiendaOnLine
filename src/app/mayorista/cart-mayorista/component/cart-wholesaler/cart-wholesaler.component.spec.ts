import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartWholesalerComponent } from './cart-wholesaler.component';

describe('CartWholesalerComponent', () => {
  let component: CartWholesalerComponent;
  let fixture: ComponentFixture<CartWholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartWholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
