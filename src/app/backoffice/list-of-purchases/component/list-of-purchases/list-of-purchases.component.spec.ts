import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPurchasesComponent } from './list-of-purchases.component';

describe('ListOfPurchasesComponent', () => {
  let component: ListOfPurchasesComponent;
  let fixture: ComponentFixture<ListOfPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
