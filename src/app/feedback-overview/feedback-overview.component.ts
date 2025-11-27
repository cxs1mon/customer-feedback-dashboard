import { Component, inject, Input } from '@angular/core';
import {
  DatePipe,
  NgForOf,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
import { FeedbackDataModel } from '../../../model/feedbackData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-overview',
  standalone: true,
  imports: [NgForOf, TitleCasePipe, DatePipe, NgOptimizedImage],
  templateUrl: './feedback-overview.component.html',
  styleUrl: './feedback-overview.component.scss',
})
export class FeedbackOverviewComponent {
  @Input() feedbacks: FeedbackDataModel[] = [];
  @Input() dispVsAll: { disp: number; all: number } = { disp: 0, all: 0 };
  private router = inject(Router);
  protected readonly Math = Math;

  goToDetailsView(id: string | undefined) {
    if (!id) {
      console.error('Feedback-ID is not defined!', id);
      return;
    }
    this.router.navigate(['details', id]);
  }
}
