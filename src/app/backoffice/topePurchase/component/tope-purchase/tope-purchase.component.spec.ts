import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopePurchaseComponent } from './tope-purchase.component';

describe('TopePurchaseComponent', () => {
  let component: TopePurchaseComponent;
  let fixture: ComponentFixture<TopePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
