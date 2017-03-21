import { ReportService } from './../services/report-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-report-detail-project',
  templateUrl: './report-detail-project.component.html',
  styleUrls: ['./report-detail-project.component.scss'],
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
  sources: any;
  project: any = new Object();
  client_name = '';
  charts: any;
  labels = [];
  billables = [];
  unbillables = [];
  sum = [];
  categories: any = [];
  members = [];
  spanMemberClass = [];
  spanCategoryClass = [];
  isLoaded = false;
  constructor(private route: ActivatedRoute, private reportService: ReportService, private router: Router) { }

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
        events: {},
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
    this.project.id = para.id;
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
      let bill = this.secondsToHours(this.charts[i][key].billable) || 0;
      let unbill = this.secondsToHours(this.charts[i][key].unbillable) || 0;
      this.billables.push(bill);
      this.unbillables.push(unbill);
    }
  }

  secondsToHours(sec): any {
    let hours = sec / 3600;
    hours = Math.round(hours * 100) / 100;
    return hours;
  }

  newRange(arg) {
    this.labels = [];
    this.billables = [];
    this.unbillables = [];
    this.data.labels = this.labels;
    this.data.datasets[0].data = this.billables;
    this.data.datasets[1].data = this.unbillables;
    let id = this.project.id;
    let begin = arg[0];
    let end = arg[1];
    this.isLoaded = false;
    this.router.navigate(['report-detail-project', id, begin, end]);
    this.reportService.getReportDetailProject(begin, end, id)
    .then(res => {
      console.log(res);
      this.sources = res;
      this.project = this.findProject(id, this.sources);
      this.charts = this.project.chart;
      this.categories = this.project.categories;
      this.client_name = this.project.client.name;
      this.background = this.project.background;
      this.members = [];
      this.generateLabels();
      this.generateValues();
      this.generateMembers();

      let len = this.data.labels.length;
      for (let i = 0; i < len; i++) {
        let d = this.data.datasets[0].data[i] + this.data.datasets[1].data[i];
        this.sum.push(d);
      }
      let maxSum = Math.max(...this.sum);
      let maxY = this.options.scales.yAxes[0].ticks.max;
      while (maxSum > maxY) {
        maxY += 2;
      }
      this.options.scales.yAxes[0].ticks.max = maxY;
      this.isLoaded = true;
    })
    .catch(error => {
      console.log(error);
    });
  }
  findProject(id, projects) {
    for (let project of projects) {
      if (parseInt(project.id, 10) === parseInt(id, 10)) {
        console.log(project);
        return project;
      }
    }
    return null;
  }

  changeProject(idEvent) {
    let para = this.route.params['_value'];
    this.project.id = idEvent;
    let begin = para.begin;
    let end = para.end;
    this.newRange([begin, end]);
  }

  generateMembers() {
    this.spanMemberClass = [];
    this.spanCategoryClass = [];
    for (let category of this.categories) {
      this.spanCategoryClass.push('fa fa-plus icon left');
      let len = category.members.length;
      for (let i = 0; i < len; i++) {
        let j = this.isInMemberList(category.members[i]);
        if (j < 0) {
          let mem = Object.create(category.members[i]);
          this.members.push(mem);
          this.spanMemberClass.push('fa fa-plus icon left');
        } else {
          this.members[j].tracked_time += category.members[i].tracked_time;
        }
      }
    }
    for (let mem of this.members) {
      mem.categories = [];
    }
    this.categoriesOfMember();
  }

  categoriesOfMember() {
    for (let category of this.categories) {
      let len = category.members.length;
      for (let i = 0; i < len; i++) {
        let j = this.isInMemberList(category.members[i]);
        if (j < 0) {
        } else {
          let cate = Object.create({name: category.name, tracked_time: category.members[i].tracked_time });
          this.members[j].categories.push(cate);
        }
      }
    }
  }

  isInMemberList(member) {
    let len = this.members.length;
    let res = -1;
    for (let i = 0; i < len; i++) {
      if (member.id === this.members[i].id) {
        res = i;
        break;
      }
    }
    return res;
  }

  getMemberTrackedTimeInCategory(category, member_id) {
    let len = category.members.length;
    let res = -1;
  }

  changeSpan(id) {
    this.spanMemberClass[id] = (this.spanMemberClass[id].includes('plus')) ? this.spanMemberClass[id].replace('plus', 'minus')
    : this.spanMemberClass[id].replace('minus', 'plus');
  }
  changeCategorySpan(id) {
    this.spanCategoryClass[id] = (this.spanCategoryClass[id].includes('plus')) ? this.spanCategoryClass[id].replace('plus', 'minus')
    : this.spanCategoryClass[id].replace('minus', 'plus');
  }

}
