import { UIChart } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  data: any;
  options: any;

  upDeco = 1.0;
  constructor() {
  }
  ngOnInit() {
    this.data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
      {
        label: 'Hours',
        backgroundColor: '#E88B37',
        borderColor: '#E88B37',
        data: [8.0, 8.7, 9.0, 7.8, 1.5, 3.0, 0.0]
      },
      {
        backgroundColor: '#F2BE90',
        borderColor: '#E88B37',
        data: [this.upDeco, this.upDeco, this.upDeco, this.upDeco, this.upDeco, this.upDeco, this.upDeco]
      }
      ]
    };
    this.options = {
        title: {
            display: false,
            text: 'My Title',
            fontSize: 16
        },
        legend: {
            position: 'bottom',
            display: false,
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 2
                }
          }]
        }
    };
  }
}
