import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaringdialogComponent } from './waringdialog.component';

describe('WaringdialogComponent', () => {
  let component: WaringdialogComponent;
  let fixture: ComponentFixture<WaringdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaringdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaringdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
