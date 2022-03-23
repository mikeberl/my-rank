import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewLeagueComponent } from './create-new-league.component';

describe('CreateNewLeagueComponent', () => {
  let component: CreateNewLeagueComponent;
  let fixture: ComponentFixture<CreateNewLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
