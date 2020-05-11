import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionComingComponent } from './selection-coming.component';

describe('SelectionComingComponent', () => {
  let component: SelectionComingComponent;
  let fixture: ComponentFixture<SelectionComingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionComingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionComingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
