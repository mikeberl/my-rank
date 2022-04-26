import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMessageViewComponent } from './report-message-view.component';

describe('ReportMessageViewComponent', () => {
  let component: ReportMessageViewComponent;
  let fixture: ComponentFixture<ReportMessageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMessageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
