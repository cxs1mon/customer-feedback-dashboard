import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf, TitleCasePipe} from '@angular/common';
import {FeedbackDataModel} from '../../../model/feedbackData.model';

@Component({
  selector: 'app-feedback-overview',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './feedback-overview.component.html',
  styleUrl: './feedback-overview.component.scss'
})
export class FeedbackOverviewComponent {
  @Input() feedbacks:FeedbackDataModel[] = [];
  protected readonly Math = Math;
}
