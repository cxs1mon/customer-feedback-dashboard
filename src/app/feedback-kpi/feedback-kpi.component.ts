import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-feedback-kpi',
  imports: [NgForOf],
  templateUrl: './feedback-kpi.component.html',
  styleUrl: './feedback-kpi.component.scss',
})
export class FeedbackKpiComponent {
  @Input() avgRating = {};
  @Input() avgProduct = {};
  @Input() pctSentiment = {};

  protected readonly Object = Object;
}
