import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesInvitedComponent } from './invoices-invited.component';

describe('InvoicesInvitedComponent', () => {
  let component: InvoicesInvitedComponent;
  let fixture: ComponentFixture<InvoicesInvitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesInvitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesInvitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
