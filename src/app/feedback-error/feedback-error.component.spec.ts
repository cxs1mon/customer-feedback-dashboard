import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackErrorComponent } from './feedback-error.component';

describe('FeedbackErrorComponent', () => {
  let component: FeedbackErrorComponent;
  let fixture: ComponentFixture<FeedbackErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
