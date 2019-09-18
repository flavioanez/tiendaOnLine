import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInvitedComponent } from './store-invited.component';

describe('StoreInvitedComponent', () => {
  let component: StoreInvitedComponent;
  let fixture: ComponentFixture<StoreInvitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInvitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInvitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
