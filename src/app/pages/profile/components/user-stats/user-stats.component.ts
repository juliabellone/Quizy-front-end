import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {
  private _stats: any;
  radarChartData: any;
  pieChartData: any;
  radarChart: any;
  pieChart: any;

  @Input() userPoints: number;
  @Input()
  set stats(stats: any) {
    this.radarChartData = {
      labels: stats.map((stat, index) => stat._id),
      datasets: [{
        data: stats.map(stat => Math.round(stat.markAvg * 100) / 100)
      }]
    };
    this.pieChartData = {
      labels: stats.map(stat => stat._id),
      datasets: [{
        data: stats.map(stat => stat.count),
        backgroundColor: stats.map((stat, index) => this.getColor(index))
      }]
    };
    this.newPieChart();
    this.newRadarChart();
    this._stats = stats;
  }

  constructor() {
  }

  ngOnInit() {
  }

  newRadarChart() {
    this.radarChart = new Chart('user-radar-chart', {
      type: 'radar',
      data: this.radarChartData,
      options: {
        responsive: true,
        legend: {
          display: false
        }
      }
    })
  }

  newPieChart() {
    this.radarChart = new Chart('user-pie-chart', {
      type: 'doughnut',
      data: this.pieChartData,
      options: {
        legend: {
          display: false
        }
      }
    })
  }

  getColor(index) {
    switch(index) {
      case 0:
        return '#0074D9';
      case 1:
        return '#FF4136';
      case 2:
        return '#FFDC00';
      case 3:
        return '#2ECC40';
      case 4:
        return '#FF851B';
      case 5:
        return '#85144b';
      case 6:
        return '#7FDBFF';
      case 7:
        return '#F012BE';
      case 8:
        return '#39CCCC';
      case 9:
        return '#001f3f';
      case 10:
        return '#4D4D4D'; 
      case 11:
        return '#5DA5DA';
      case 12:
        return '#FAA43A';
      case 13:
        return '#60BD68';
      case 14:
        return '#F17CB0';
      case 15:
        return '#B2912F';
      case 16:
        return '#B276B2';
      case 17:
        return '#DECF3F';
      case 18:
        return '#F15854';
      case 19:
        return '#F596C1'
      case 20:
        return '#9FB3E2';
      case 21:
        return '#57C4BF';
      case 22:
        return '#84C37F';
      case 23:
        return '#C8B35D';
      default:
        return '#F49F77';
    }
  }

  computeClass(categoryPoints) {
    var classNames = [];  
    classNames.push('percentage-'+ Math.floor(categoryPoints*100/this.userPoints).toString());
    return classNames;
  }
}
