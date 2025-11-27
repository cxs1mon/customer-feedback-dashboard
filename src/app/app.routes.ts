import { Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';

export const routes: Routes = [
  { path: '', component: FeedbackComponent, title: 'Übersicht' },
  {
    path: 'details/:id',
    component: FeedbackDetailsComponent,
    title: 'Details',
  },
];
