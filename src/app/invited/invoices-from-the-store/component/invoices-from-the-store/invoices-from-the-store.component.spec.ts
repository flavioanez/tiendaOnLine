import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesFromTheStoreComponent } from './invoices-from-the-store.component';

describe('InvoicesFromTheStoreComponent', () => {
  let component: InvoicesFromTheStoreComponent;
  let fixture: ComponentFixture<InvoicesFromTheStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesFromTheStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesFromTheStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
