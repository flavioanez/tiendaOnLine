import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubtreeComponent } from './my-subtree.component';

describe('MySubtreeComponent', () => {
  let component: MySubtreeComponent;
  let fixture: ComponentFixture<MySubtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
