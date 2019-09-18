import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPurchasesWholesalerComponent } from './list-purchases-wholesaler.component';

describe('ListPurchasesWholesalerComponent', () => {
  let component: ListPurchasesWholesalerComponent;
  let fixture: ComponentFixture<ListPurchasesWholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPurchasesWholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPurchasesWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
