import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesStoreWholesalerComponent } from './invoices-store-wholesaler.component';

describe('InvoicesStoreWholesalerComponent', () => {
  let component: InvoicesStoreWholesalerComponent;
  let fixture: ComponentFixture<InvoicesStoreWholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesStoreWholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesStoreWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
