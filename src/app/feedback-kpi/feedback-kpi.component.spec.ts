import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackKpiComponent } from './feedback-kpi.component';

describe('FeedbackKpiComponent', () => {
  let component: FeedbackKpiComponent;
  let fixture: ComponentFixture<FeedbackKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackKpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
