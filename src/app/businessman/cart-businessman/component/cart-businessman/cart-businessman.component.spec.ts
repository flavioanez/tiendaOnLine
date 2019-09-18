import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBusinessmanComponent } from './cart-businessman.component';

describe('CartBusinessmanComponent', () => {
  let component: CartBusinessmanComponent;
  let fixture: ComponentFixture<CartBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
