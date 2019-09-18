import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoreMayoristaComponent } from './sub-store-mayorista.component';

describe('SubStoreMayoristaComponent', () => {
  let component: SubStoreMayoristaComponent;
  let fixture: ComponentFixture<SubStoreMayoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubStoreMayoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStoreMayoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
