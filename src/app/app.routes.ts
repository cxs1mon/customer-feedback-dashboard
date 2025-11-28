import { Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { FeedbackErrorComponent } from './feedback-error/feedback-error.component';

export const routes: Routes = [
  { path: '', component: FeedbackComponent, title: 'Übersicht' },
  { path: 'not-found', component: FeedbackErrorComponent, title: 'Not Found' },
  {
    path: 'details/:id',
    component: FeedbackDetailsComponent,
    title: 'Details',
  },
  {
    path: '**',
    component: FeedbackErrorComponent,
    title: 'Not Found',
  },
];
