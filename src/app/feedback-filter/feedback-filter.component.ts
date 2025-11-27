import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterValuesModel } from '../../../model/filtervalues.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-feedback-filter',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './feedback-filter.component.html',
  styleUrl: './feedback-filter.component.scss',
})
export class FeedbackFilterComponent {
  @Output() filter = new EventEmitter<FilterValuesModel>();
  searchProduct = 'ALL';
  searchRating = 'ALL';
  searchSort = 'ASC';
  filterOpen = false;

  form = new FormGroup({
    product: new FormControl(this.searchProduct),
    rating: new FormControl(this.searchRating),
    dateSort: new FormControl(this.searchSort),
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null),
  });

  onFilter(): void {
    this.filterOpen = false;
    this.filter.emit(this.form.value as FilterValuesModel);
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }
}
