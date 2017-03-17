import { ReportService } from './../services/report-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ]),
  ]
})
export class ReportDetailComponent implements OnInit {
  monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  oTTypes = ['weekend', 'holiday', 'weekend', ''];
  data: any;
  options: any;
  items: any;
  navClass = ['choosing', '', ''];
  choosing: number = 0;
  member: any = {};
  projects: any[] = [];
  tasks: any[] = [];
  labels: any;
  billables: any;
  unbillables: any;
  isLoaded = false;
  spanClassProject = [];
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
            let len = this.data.labels.length;
            let sum = [];
            for (let i = 0; i < len; i++) {
              let d = this.data.datasets[0].data[i] + this.data.datasets[1].data[i];
              sum.push(d);
            }
            this.data.datasets.forEach(function (dataset, i) {
              if (i === 0) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index];
                    let display = sum[index];
                    ctx.fillStyle = '#FFFFFF';
                    let toFull = height - 50  - bar._model.y;
                    if  (data > 0)  {
                      ctx.fillText('$', bar._model.x, bar._model.y + (toFull / 2) + 8);
                    }
                    ctx.fillStyle = '#000000';
                });
              } else if (i === 1) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index];
                    let display = sum[index];
                    ctx.fillText(display, bar._model.x, bar._model.y - 10);
                    ctx.fillStyle = '#FFFFFF';
                    let toFull = height - 50  - bar._model.y;
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

  secondsToHours(sec): any {
    let hours = sec / 3600;
    hours = Math.round(hours * 100) / 100;
    return hours;
  }

  generateLabels() {
    let charts = this.projects[0].chart;
    let keys = Object.keys(charts);
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      let bill = this.secondsToHours(charts[keys[i]].billable);
      this.billables.push(bill);
      let unbill = this.secondsToHours(charts[keys[i]].unbillable);
      this.unbillables.push(unbill);
      let date = new Date(keys[i]);
      let dayLabel = this.dayStrings[date.getDay()];
      let dateLabel = this.monthStrings[(date.getMonth())] + ' ' + date.getDate().toString();
      let label = [dayLabel, dateLabel];
      this.labels.push(label);
    }
  }

  generateValues() {
    let len = this.projects.length;
    for (let i = 1; i < len; i++) {
      let charts = this.projects[i].chart;
      let keys = Object.keys(charts);
      let len0 = keys.length;
      for (let j = 0; j < len0; j++) {
        let bill = this.secondsToHours(charts[keys[j]].billable);
        this.billables[j] += bill;
        let unbill = this.secondsToHours(charts[keys[j]].unbillable);
        this.unbillables[j] += unbill;
      }
    }
    console.log(this.billables);
    console.log(this.unbillables);
  }

  generateProjects(sources: any[]) {
    for (let source of sources) {
      let project = Object.create(source);
      project.tracked_time = 0;
      this.projects.push(project);
      this.spanClassProject.push('fa fa-plus icon left');
    }

    for (let project of this.projects) {
      for (let category of project.category){
        project.tracked_time += category.tracked_time;
      }
    }
  }

  newRange(arg) {
    this.labels = [];
    this.billables = [];
    this.unbillables = [];
    this.projects = [];
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
      this.member = res;
      this.tasks = res.tasks;
      this.generateProjects(res.projects);
      this.generateLabels();
      this.generateValues();
      this.isLoaded = true;
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

  changeSpanProject(id) {
    this.spanClassProject[id] = (this.spanClassProject[id].includes('plus')) ? this.spanClassProject[id].replace('plus', 'minus')
    : this.spanClassProject[id].replace('minus', 'plus');
  }
}
