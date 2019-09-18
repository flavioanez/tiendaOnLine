import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoreInvitedComponent } from './sub-store-invited.component';

describe('SubStoreInvitedComponent', () => {
  let component: SubStoreInvitedComponent;
  let fixture: ComponentFixture<SubStoreInvitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubStoreInvitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStoreInvitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
