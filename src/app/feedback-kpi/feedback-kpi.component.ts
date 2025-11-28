import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-feedback-kpi',
  imports: [NgForOf, NgIf],
  templateUrl: './feedback-kpi.component.html',
  styleUrl: './feedback-kpi.component.scss',
})
export class FeedbackKpiComponent {
  @Input() avgRating = {};
  @Input() avgProduct = {};
  @Input() pctSentiment = {};

  protected readonly Object = Object;
}
