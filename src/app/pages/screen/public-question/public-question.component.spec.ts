import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuestionComponent } from './public-question.component';

describe('PublicQuestionComponent', () => {
  let component: PublicQuestionComponent;
  let fixture: ComponentFixture<PublicQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
