import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGirlsComponent } from './users-girls.component';

describe('UsersGirlsComponent', () => {
  let component: UsersGirlsComponent;
  let fixture: ComponentFixture<UsersGirlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersGirlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersGirlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
