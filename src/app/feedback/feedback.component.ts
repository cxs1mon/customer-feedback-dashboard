import {Component, inject, OnInit} from '@angular/core';
import {FeedbackService} from '../service/feedback.service';
import {FeedbackOverviewComponent} from '../feedback-overview/feedback-overview.component';
import {FeedbackDataModel} from '../../../model/feedbackData.model';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    FeedbackOverviewComponent
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {

  private service = inject(FeedbackService);
  allFeedbacks:FeedbackDataModel[]= []

  ngOnInit() {
    this.loadFeedbacks();
  }

  private loadFeedbacks() {
    console.log("going to load feedbacks");
    this.service.getFeedbacks().subscribe(feedbacks => {
      this.allFeedbacks = feedbacks;
      console.log("feedbacks:", feedbacks);
    })
  }
}
