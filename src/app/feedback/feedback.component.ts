import { Component, inject, OnInit } from '@angular/core';
import { FeedbackService } from '../service/feedback.service';
import { FeedbackOverviewComponent } from '../feedback-overview/feedback-overview.component';
import { FeedbackDataModel } from '../../../model/feedbackData.model';
import { FeedbackFilterComponent } from '../feedback-filter/feedback-filter.component';
import { FilterValuesModel } from '../../../model/filtervalues.model';
import { FeedbackKpiComponent } from '../feedback-kpi/feedback-kpi.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    FeedbackOverviewComponent,
    FeedbackFilterComponent,
    FeedbackKpiComponent,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent implements OnInit {
  private service: FeedbackService = inject(FeedbackService);
  private router = inject(Router);
  allFeedbacks: FeedbackDataModel[] = [];
  filteredFeedbacks: FeedbackDataModel[] = [];
  numOfDisplayedFeedbacks = 0;
  numOfAllFeedbacks = 0;
  averageRating = 0;
  averageProduct: Record<string, number> = {};
  pctSentiment: Record<string, number> = {};
  numDisplayedNumAll: { disp: number; all: number } = { disp: 0, all: 0 };

  ngOnInit() {
    this.loadFeedbacks();
  }

  private loadFeedbacks() {
    this.service.getFeedbacks().subscribe({
      next: (feedbacks) => {
        if (!feedbacks || feedbacks.length <= 0) {
          console.warn('No data found, redirecting to not found page');
          this.router.navigate(['/not-found']);
          return;
        }
        this.allFeedbacks = feedbacks;
        this.filteredFeedbacks = feedbacks;
        this.numOfAllFeedbacks = feedbacks.length;
        this.numOfDisplayedFeedbacks = feedbacks.length;
        this.calculateKpi();
      },
      error: () => {
        console.warn('No Data found, redirecting to not found page!');
        this.router.navigate(['/not-found']);
      },
    });
  }

  onFilterChange(filterValues: FilterValuesModel): void {
    this.filteredFeedbacks = this.filterFeedbacks(filterValues);
    this.numOfDisplayedFeedbacks = this.filteredFeedbacks.length;
    this.calculateKpi();
  }

  filterFeedbacks(filter: FilterValuesModel): FeedbackDataModel[] {
    let result: FeedbackDataModel[] = this.allFeedbacks.filter((f) => {
      const minRating = filter.rating === 'ALL' ? 1 : +filter.rating;
      const matchesRating = f.rating >= minRating;

      const matchesProduct =
        filter.product === 'ALL' || f.productCategory === filter.product;

      const created = new Date(f.createdAt).getTime();
      const dateFrom = filter.dateFrom
        ? new Date(filter.dateFrom).getTime()
        : null;
      const dateTo = filter.dateTo ? new Date(filter.dateTo).getTime() : null;

      const matchesDate =
        (!dateFrom || created >= dateFrom) && (!dateTo || created <= dateTo);

      return matchesRating && matchesProduct && matchesDate;
    });

    if (filter.dateSort === 'DESC') {
      result = result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else {
      result = result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    return result;
  }

  calculateKpi(): void {
    // calculate average rating of filtered feedbacks
    let sumOfRatings = 0;
    for (const fb of this.filteredFeedbacks) {
      sumOfRatings += fb.rating;
    }
    if (this.numOfDisplayedFeedbacks > 0) {
      this.averageRating = sumOfRatings / this.numOfDisplayedFeedbacks;
      this.averageRating = +this.averageRating.toFixed(2);
    } else {
      this.averageRating = 0;
    }
    console.log('Average rating (filtered): ', this.averageRating);

    // calculate average rating per category
    // HAUSHALT
    let sumHaushalt = 0;
    const hh: FeedbackDataModel[] = this.allFeedbacks.filter(
      (f) => f.productCategory === 'HAUSHALT',
    );
    hh.forEach((f) => {
      sumHaushalt += f.rating;
    });
    this.averageProduct['Haushalt'] = sumHaushalt / hh.length;
    // LEBEN
    let sumLeben = 0;
    const l: FeedbackDataModel[] = this.allFeedbacks.filter(
      (f) => f.productCategory === 'LEBEN',
    );
    l.forEach((f) => {
      sumLeben += f.rating;
    });
    this.averageProduct['Leben'] = sumLeben / l.length;
    // HAFTPFLICHT
    let sumHaftpflicht = 0;
    const hp: FeedbackDataModel[] = this.allFeedbacks.filter(
      (f) => f.productCategory === 'HAFTPFLICHT',
    );
    hp.forEach((f) => {
      sumHaftpflicht += f.rating;
    });
    this.averageProduct['Haftpflicht'] = sumHaftpflicht / hp.length;
    // REISEN
    let sumReisen = 0;
    const r: FeedbackDataModel[] = this.allFeedbacks.filter(
      (f) => f.productCategory === 'REISE',
    );
    r.forEach((f) => {
      sumReisen += f.rating;
    });
    this.averageProduct['Reise'] = sumReisen / r.length;
    // FAHRZEUG
    let sumFahrzeug = 0;
    const f: FeedbackDataModel[] = this.allFeedbacks.filter(
      (f) => f.productCategory === 'FAHRZEUG',
    );
    f.forEach((f) => {
      sumFahrzeug += f.rating;
    });
    this.averageProduct['Fahrezug'] = sumFahrzeug / f.length;
    // KRANKEN
    let sumKranken = 0;
    const k: FeedbackDataModel[] = this.allFeedbacks.filter(
      (f) => f.productCategory === 'KRANKEN',
    );
    k.forEach((f) => {
      sumKranken += f.rating;
    });
    this.averageProduct['Kranken'] = sumKranken / k.length;

    console.log(this.averageProduct);

    // calculate sentiments in percents
    let allCounter = 0;
    let posCounter = 0;
    let negCounter = 0;
    let neuCounter = 0;

    for (const f of this.filteredFeedbacks) {
      allCounter++;
      if (f.sentiment == 'POSITIVE') {
        posCounter++;
      } else if (f.sentiment == 'NEGATIVE') {
        negCounter++;
      } else {
        neuCounter++;
      }
    }
    this.pctSentiment['Positiv'] = Math.floor((posCounter / allCounter) * 100);
    this.pctSentiment['Negativ'] = Math.floor((negCounter / allCounter) * 100);
    this.pctSentiment['Neutral'] = Math.floor((neuCounter / allCounter) * 100);

    console.log(this.pctSentiment);

    // display number of displayed vs number of all feedbacks
    this.numDisplayedNumAll.disp = this.numOfDisplayedFeedbacks;
    this.numDisplayedNumAll.all = this.numOfAllFeedbacks;

    console.log(this.numDisplayedNumAll);
  }
}
