import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityInvoiceComponent } from './visibility-invoice.component';

describe('VisibilityInvoiceComponent', () => {
  let component: VisibilityInvoiceComponent;
  let fixture: ComponentFixture<VisibilityInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisibilityInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
