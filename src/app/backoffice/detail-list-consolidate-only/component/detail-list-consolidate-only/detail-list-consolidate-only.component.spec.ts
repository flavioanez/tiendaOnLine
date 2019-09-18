import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListConsolidateOnlyComponent } from './detail-list-consolidate-only.component';

describe('DetailListConsolidateOnlyComponent', () => {
  let component: DetailListConsolidateOnlyComponent;
  let fixture: ComponentFixture<DetailListConsolidateOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailListConsolidateOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListConsolidateOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
