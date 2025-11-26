import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FilterValuesModel} from '../../../model/filtervalues.model';

@Component({
  selector: 'app-feedback-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './feedback-filter.component.html',
  styleUrl: './feedback-filter.component.scss'
})
export class FeedbackFilterComponent {
  @Output() filter = new EventEmitter<FilterValuesModel>();
  searchProduct = "ALL";
  searchRating = "ALL";
  searchSort = "ASC";

  form = new FormGroup({
    product: new FormControl(this.searchProduct),
    rating: new FormControl(this.searchRating),
    dateSort: new FormControl(this.searchSort),
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null)
  });

  onFilter():void {
    this.filter.emit(this.form.value as FilterValuesModel);
  }

}
