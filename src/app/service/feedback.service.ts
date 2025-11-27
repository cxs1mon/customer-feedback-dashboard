import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackDataModel } from '../../../model/feedbackData.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private http = inject(HttpClient);
  private feedbacksUrl = 'http://localhost:3000/feedbacks/';

  getFeedbacks(): Observable<FeedbackDataModel[]> {
    return this.http.get<FeedbackDataModel[]>(this.feedbacksUrl);
  }
  getFeedbackById(id: string): Observable<FeedbackDataModel> {
    return this.http.get<FeedbackDataModel>(`${this.feedbacksUrl}${id}`);
  }
}
