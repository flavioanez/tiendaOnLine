import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMayoristaComponent } from './detail-mayorista.component';

describe('DetailMayoristaComponent', () => {
  let component: DetailMayoristaComponent;
  let fixture: ComponentFixture<DetailMayoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMayoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMayoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
