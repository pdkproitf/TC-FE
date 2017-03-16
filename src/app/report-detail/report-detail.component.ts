import { ReportService } from './../services/report-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  data: any;
  options: any;
  items: any;
  navClass = ['choosing', '', ''];
  choosing: number = 0;
  member: any = {};
  projects: any[] = [];
  labels: any;
  billables: any;
  unbillables: any;
  isLoaded = false;
  constructor(private route: ActivatedRoute, private reportService: ReportService, private router: Router) {
  }
  ngOnInit() {
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
                    max: 10,
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
            let sum = this.data.datasets[1].data;
            this.data.datasets.forEach(function (dataset, i) {
              if (i === 0) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index] + sum[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 20);
                    ctx.fillStyle = '#FFFFFF';
                    let toFull = height - 50 - bar._model.y;
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
    let para = this.route.params['_value'];
    console.log(para);
    this.member.id = para.id;
    let begin = para.begin;
    let end = para.end;
    this.newRange([begin, end]);
    this.items = [
      {label: 'PDF', icon: 'fa-file-pdf-o'},
      {label: 'DOC', icon: 'fa-file-text-o'},
      {label: 'XSL', icon: 'fa-file-excel-o', command: (event) => {
        console.log('XSL');
        }
      }
    ];
  }

  newRange(arg) {
    this.labels = [];
    this.billables = [];
    this.unbillables = [];
    this.data.labels = this.labels;
    this.data.datasets[0].data = this.billables;
    this.data.datasets[1].data = this.unbillables;
    let id = this.member.id;
    let begin = arg[0];
    let end = arg[1];
    this.isLoaded = false;
    this.router.navigate(['report-detail', id, begin, end]);
    this.reportService.getReportDetailPerson(begin, end, id)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
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
