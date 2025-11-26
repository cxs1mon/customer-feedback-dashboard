import {Component, inject, OnInit} from '@angular/core';
import {FeedbackService} from '../service/feedback.service';
import {FeedbackOverviewComponent} from '../feedback-overview/feedback-overview.component';
import {FeedbackDataModel} from '../../../model/feedbackData.model';
import {FeedbackFilterComponent} from '../feedback-filter/feedback-filter.component';
import {FilterValuesModel} from '../../../model/filtervalues.model';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    FeedbackOverviewComponent,
    FeedbackFilterComponent
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {

  private service = inject(FeedbackService);
  allFeedbacks:FeedbackDataModel[]= []
  filteredFeedbacks:FeedbackDataModel[]= []

  ngOnInit() {
    this.loadFeedbacks();
  }

  private loadFeedbacks() {
    console.log("going to load feedbacks");
    this.service.getFeedbacks().subscribe(feedbacks => {
      this.allFeedbacks = feedbacks;
      this.filteredFeedbacks = feedbacks;
      console.log("feedbacks:", feedbacks);
    })
  }

  onFilterChange(filterValues: FilterValuesModel): void {
    this.filteredFeedbacks = this.filterFeedbacks(filterValues);
  }

  filterFeedbacks(filter: FilterValuesModel): FeedbackDataModel[] {
    let result = this.allFeedbacks.filter(f => {
      const matchesRating = filter.rating === "ALL" || f.rating === +filter.rating;
      const matchesProduct = filter.product === "ALL" || f.productCategory === filter.product;

      const created = new Date(f.createdAt).getTime();
      const dateFrom = filter.dateFrom ? new Date(filter.dateFrom).getTime() : null;
      const dateTo = filter.dateTo ? new Date(filter.dateTo).getTime() : null;

      const matchesDate =
        (!dateFrom || created >= dateFrom) &&
        (!dateTo || created <= dateTo);

      return matchesRating && matchesProduct && matchesDate;
    });

    if (filter.dateSort === "DESC") {
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result = result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return result;
  }


}
