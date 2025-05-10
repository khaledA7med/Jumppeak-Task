import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDataComponent } from './users-data.component';

describe('UsersDataComponent', () => {
  let component: UsersDataComponent;
  let fixture: ComponentFixture<UsersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersDataComponent]
    });
    fixture = TestBed.createComponent(UsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
