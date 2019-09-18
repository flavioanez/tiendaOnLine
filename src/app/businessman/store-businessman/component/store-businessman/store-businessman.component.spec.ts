import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBusinessmanComponent } from './store-businessman.component';

describe('StoreBusinessmanComponent', () => {
  let component: StoreBusinessmanComponent;
  let fixture: ComponentFixture<StoreBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
