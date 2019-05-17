import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateformComponent } from './candidateform.component';

describe('CandidateformComponent', () => {
  let component: CandidateformComponent;
  let fixture: ComponentFixture<CandidateformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
