import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackLoading } from './feedback-loading';

describe('FeedbackLoading', () => {
  let component: FeedbackLoading;
  let fixture: ComponentFixture<FeedbackLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
