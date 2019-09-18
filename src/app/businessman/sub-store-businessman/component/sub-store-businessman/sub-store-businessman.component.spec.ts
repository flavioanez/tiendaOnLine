import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoreBusinessmanComponent } from './sub-store-businessman.component';

describe('SubStoreBusinessmanComponent', () => {
  let component: SubStoreBusinessmanComponent;
  let fixture: ComponentFixture<SubStoreBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubStoreBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStoreBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
