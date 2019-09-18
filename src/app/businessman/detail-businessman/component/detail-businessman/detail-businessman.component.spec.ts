import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBusinessmanComponent } from './detail-businessman.component';

describe('DetailBusinessmanComponent', () => {
  let component: DetailBusinessmanComponent;
  let fixture: ComponentFixture<DetailBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
