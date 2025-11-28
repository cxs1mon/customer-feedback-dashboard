import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../service/feedback.service';
import {
  FeedbackDataModel,
  initialFeedbackDataModel,
} from '../../../model/feedbackData.model';
import {
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-feedback-details',
  imports: [DatePipe, NgForOf, TitleCasePipe, NgClass, NgOptimizedImage, NgIf],
  templateUrl: './feedback-details.component.html',
  styleUrl: './feedback-details.component.scss',
})
export class FeedbackDetailsComponent implements OnInit {
  private service: FeedbackService = inject(FeedbackService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  protected feedback: FeedbackDataModel = initialFeedbackDataModel;

  id: string | null = '';
  validData = false;

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getFeedbackById(this.id).subscribe((feedback) => {
        this.feedback = feedback;
        console.log(this.feedback);
        this.validData = true;
      });
    } else {
      console.warn('No valid ID found!');
      this.validData = false;
    }
  }

  goToOverview() {
    this.router.navigate(['']);
  }

  protected readonly Math = Math;
}
