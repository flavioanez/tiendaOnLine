import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMayoristaComponent } from './store-mayorista.component';

describe('StoreMayoristaComponent', () => {
  let component: StoreMayoristaComponent;
  let fixture: ComponentFixture<StoreMayoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMayoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMayoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
