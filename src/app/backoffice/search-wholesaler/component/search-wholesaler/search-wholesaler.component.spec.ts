import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWholesalerComponent } from './search-wholesaler.component';

describe('SearchWholesalerComponent', () => {
  let component: SearchWholesalerComponent;
  let fixture: ComponentFixture<SearchWholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
