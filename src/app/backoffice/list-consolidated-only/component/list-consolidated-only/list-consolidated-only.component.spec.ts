import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsolidatedOnlyComponent } from './list-consolidated-only.component';

describe('ListConsolidatedOnlyComponent', () => {
  let component: ListConsolidatedOnlyComponent;
  let fixture: ComponentFixture<ListConsolidatedOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsolidatedOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsolidatedOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
