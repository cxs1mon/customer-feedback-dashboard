import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData} from 'chart.js';

@Component({
  selector: 'app-feedback-kpi',
  imports: [NgIf, BaseChartDirective, NgForOf],
  templateUrl: './feedback-kpi.component.html',
  styleUrl: './feedback-kpi.component.scss',
})
export class FeedbackKpiComponent implements OnChanges {
  @Input() avgRating: number = 0;
  @Input() avgProduct: object = {};
  @Input() pctSentiment: object = {};

  protected readonly Object = Object;
  avgProductLabels: string[] = [];
  avgProductValues: number[] = [];
  pctSentimentLabels: string[] = [];
  pctSentimentValues: number[] = [];
  barChartData: ChartData<'bar'> | undefined;
  pieChartData: ChartData<'pie'> | undefined;
  barChartOptions: object = {};
  pieChartOptions: object = {};

  ngOnChanges(changes: SimpleChanges): void {
    // calculate barChart data
    if (changes['avgProduct'] && this.avgProduct) {
      this.avgProductLabels = Object.keys(this.avgProduct);
      this.avgProductValues = Object.values(this.avgProduct);
      this.createCharts()
    } else console.warn('Daten konnten nicht geladen werden.');

    //calculate pieChart data
    if (changes['pctSentiment'] && this.pctSentiment) {
      this.pctSentimentLabels = Object.keys(this.pctSentiment);
      this.pctSentimentValues = Object.values(this.pctSentiment);
      console.log(this.pctSentimentValues);
      console.log('Labels aktuell:', this.pctSentimentLabels);
      this.pctSentimentValues = Object.values(this.pctSentiment).map(Number);
      this.createCharts()
    } else console.warn('Daten konnten nicht geladen werden.');
  }

  createCharts() {

    this.pieChartData = {
      labels: this.pctSentimentLabels,
      datasets: [
        {
          data: this.pctSentimentValues,
          label: "Sentiment Verteilung in %",
          hoverOffset: 4,
          backgroundColor: ['#A6E9AB', '#FF7569', '#FFF773'],
          borderColor: [
            'rgb(37,37,37)'
          ],
          borderWidth: 1
        }
      ]
    }

    this.barChartData = {
      labels: this.avgProductLabels,
      datasets: [
        {
          data: this.avgProductValues,
          backgroundColor: '#91bfe3',
        }
      ]
    }

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

  }

}
