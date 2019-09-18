import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBusinessmanComponent } from './search-businessman.component';

describe('SearchBusinessmanComponent', () => {
  let component: SearchBusinessmanComponent;
  let fixture: ComponentFixture<SearchBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
