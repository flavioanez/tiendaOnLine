import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneralComponent } from './password-general.component';

describe('PasswordGeneralComponent', () => {
  let component: PasswordGeneralComponent;
  let fixture: ComponentFixture<PasswordGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
