import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMatchComponent } from './review-match.component';

describe('ReviewMatchComponent', () => {
  let component: ReviewMatchComponent;
  let fixture: ComponentFixture<ReviewMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
