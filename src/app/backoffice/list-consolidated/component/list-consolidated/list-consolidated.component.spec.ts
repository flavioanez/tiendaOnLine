import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsolidatedComponent } from './list-consolidated.component';

describe('ListConsolidatedComponent', () => {
  let component: ListConsolidatedComponent;
  let fixture: ComponentFixture<ListConsolidatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsolidatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
