import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOfficeComponent } from './header-office.component';

describe('HeaderOfficeComponent', () => {
  let component: HeaderOfficeComponent;
  let fixture: ComponentFixture<HeaderOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
