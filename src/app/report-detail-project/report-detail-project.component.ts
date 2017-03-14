import { ReportService } from './../services/report-service';
import { ActivatedRoute } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-detail-project',
  templateUrl: './report-detail-project.component.html',
  styleUrls: ['./report-detail-project.component.scss']
})
export class ReportDetailProjectComponent implements OnInit {
  monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  data: any;
  options: any;
  items: any;
  upDeco = 1.0;
  navClass = ['choosing', ''];
  choosing: number = 0;
  background= '#FFC259';
  project: any = new Object();
  client_name = '';
  charts: any;
  labels = [];
  billables = [];
  unbillables = [];
  isLoaded = false;
  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit() {
    let para = this.route.params['_value'];
    let id = para.id;
    let begin = para.begin;
    let end = para.end;
    this.reportService.getReportDetailProject(begin, end, id)
    .then(res => {
      console.log(res);
      this.project = res;
      this.charts = res.chart;
      this.client_name = res.client.name;
      this.generateLabels();
      this.generateValues();
      this.isLoaded = true;
    })
    .catch(error => {
      console.log(error);
    });

    this.data = {
      labels: this.labels,
      datasets: [
      {
        label: 'Hours',
        backgroundColor: '#E88B37',
        borderColor: '#E88B37',
        data: this.billables
      },
      {
        backgroundColor: '#F2BE90',
        borderColor: '#E88B37',
        data: this.unbillables
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
            let height = chartInstance.canvas.height;
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 14px Lato';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            let len = this.data.labels.length;
            let sum = [];
            for (let i = 0; i < len; i++){
              let d = this.data.datasets[0].data[i] + this.data.datasets[1].data[i];
              sum.push(d);
            }
            this.data.datasets.forEach(function (dataset, i) {
              if (i === 0) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index];
                    let display = sum[index];
                    ctx.fillText(display, bar._model.x, bar._model.y - 20);
                    ctx.fillStyle = '#FFFFFF';
                    let toFull = height - 50  - bar._model.y;
                    if  (data > 0)  {
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

  generateLabels() {
    let len = this.charts.length;
    for (let i = 0; i < len; i++) {
      let key = Object.keys(this.charts[i])[0];
      let date = new Date(key);
      let dayLabel = this.dayStrings[date.getDay()];
      let dateLabel = this.monthStrings[(date.getMonth())] + ' ' + date.getDate().toString();
      let label = [dayLabel, dateLabel];
      this.labels.push(label);
    }
  }

  generateValues() {
    let len = this.charts.length;
    for (let i = 0; i < len; i++) {
      let key = Object.keys(this.charts[i])[0];
      let bill = this.charts[i][key].billable;
      let unbill = this.charts[i][key].unbillable;
      this.billables.push(bill);
      this.unbillables.push(unbill);
    }
    console.log(this.billables);
    console.log(this.unbillables);
  }

}
