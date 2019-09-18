import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceStoreBusinessmanComponent } from './invoice-store-businessman.component';

describe('InvoiceStoreBusinessmanComponent', () => {
  let component: InvoiceStoreBusinessmanComponent;
  let fixture: ComponentFixture<InvoiceStoreBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceStoreBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceStoreBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
