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
  items: any;
  upDeco = 1.0;
  navClass = ['choosing', '', ''];
  choosing: number = 0;
  constructor() {
  }
  ngOnInit() {
    this.data = {
      labels: [['Mon', 'Feb 6'], ['Tue', 'Feb 7'], ['Wed', 'Feb 8'], ['Thu', 'Feb 9'],
      ['Fri', 'Feb 10'], ['Sat', 'Feb 11'], ['Sun', 'Feb 12']],
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
        },
        legend: {
            display: false
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              fontColor: 'rgba(54,54,54,0.7);',
              fontSize: 14,
              fontStyle: 'normal',
              fontFamily: 'Lato',
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
                    max: 12,
                    min: 0,
                    stepSize: 2
                }
          }]
        },
        hover: {
            mode: 'index'
        },
        events: {

        },
        animation: {
        duration: 1,
        onComplete: function () {
            let chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 14px Lato';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            let sum = this.data.datasets[1].data;
            this.data.datasets.forEach(function (dataset, i) {
              if (i === 0) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index] + sum[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 20);
                    ctx.fillStyle = '#FFFFFF';
                    let toFull = 208 - bar._model.y;
                    if  (dataset.data[index] > 0)  {
                      ctx.fillText('$', bar._model.x, bar._model.y + (toFull / 2) + 8);
                    }
                    ctx.fillStyle = '#000000';
                });
              }
            });
        },
    }
    };
    this.items = [
      {label: 'PDF', icon: 'fa-file-pdf-o'},
      {label: 'DOC', icon: 'fa-file-text-o'},
      {label: 'XSL', icon: 'fa-file-excel-o', command: (event) => {
        console.log('XSL');
        }
      }
    ];
  }
  chooseNavClass(a) {
    let len = this.navClass.length;
    for (let i = 0; i < len; i++ ) {
      this.navClass[i] = '';
    }
    this.navClass[a] = 'choosing';
    this.choosing = a;
  }
}
