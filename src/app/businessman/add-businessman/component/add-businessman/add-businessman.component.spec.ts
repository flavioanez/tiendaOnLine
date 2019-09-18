import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessmanComponent } from './add-businessman.component';

describe('AddBusinessmanComponent', () => {
  let component: AddBusinessmanComponent;
  let fixture: ComponentFixture<AddBusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
