import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStats2Component } from './user-stats2.component';

describe('UserStatsComponent', () => {
  let component: UserStats2Component;
  let fixture: ComponentFixture<UserStats2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStats2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStats2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
