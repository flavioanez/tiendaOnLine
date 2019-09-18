import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesMayoristaComponent } from './invoices-mayorista.component';

describe('InvoicesMayoristaComponent', () => {
  let component: InvoicesMayoristaComponent;
  let fixture: ComponentFixture<InvoicesMayoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesMayoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesMayoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
