import { TimerFetchService } from '../../services/timer-fetch-service';
import { TimerFetch } from '../../models/timer-fetch';
import { TimerService } from '../../services/timer-service';
import { TestBed } from '@angular/core/testing';
import { ReportService } from '../../services/report-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';
import {ElementRef} from '@angular/core';

declare let jsPDF;
declare let html2canvas;
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
  @ViewChild('chart') chart: UIChart;
  @ViewChild('container') el;
  monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  oTTypes = [/*'weekend', 'holiday', 'weekend', ''*/];
  totalTrackedTime = 0;
  overtimes = [];
  filteredOvertimes = [];
  otWeekend = 0;
  otRegular = 0;
  otHoliday = 0;
  data: any;
  options: any;
  items: any;
  navClass = ['choosing', '', '', ''];
  choosing: number = 0;
  member: any = {};
  sources: any;
  projects: any[] = [];
  tasks: any[] = [];
  filteredTasks = [];
  labels: any;
  billables: any;
  unbillables: any;
  sum = [];
  idProject = null;
  isLoaded = false;
  from: string = '';
  to: string = '';
  spanClassProject = [];
  userAllTimerFetchs: any[] = [];
  userAllTimerFetchKeys: any[] = [];
  timeLogExpand: string[] = [];
  divExpand: string[] = [];
  constructor(private route: ActivatedRoute, private reportService: ReportService, private router: Router,
  private timerFetchService: TimerFetchService, private timerService: TimerService) {
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
              fontSize: 12,
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
            ctx.font = 'bold 12px Lato';
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
                      ctx.fillText('$', bar._model.x, bar._model.y + (toFull / 2));
                    }
                    ctx.fillStyle = '#000000';
                });
              } else if (i === 1) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index];
                    let display = sum[index];
                    ctx.fillText(display, bar._model.x, bar._model.y - 2);
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
    // console.log(para);
    this.member.id = para.id;
    let begin = para.begin;
    let end = para.end;
    this.from = begin;
    this.to = end;
    if (para.idProject != null) {
      this.idProject = para.idProject;
    }
    this.newRange([begin, end]);
    this.timerFetchService.getTimerFetch(this.from, this.to)
    .then(res => {
      this.userAllTimerFetchs = res;
      this.userAllTimerFetchKeys = Object.keys(this.userAllTimerFetchs);
      console.log(this.userAllTimerFetchs);
      for (let key of this.userAllTimerFetchKeys) {
        this.timeLogExpand.push('fa fa-caret-right icon left');
        this.divExpand.push('date-title');
      }
    })
    .catch(err => {
      console.log(err);
    });
    /*this.items = [
      {label: 'PDF', icon: 'fa-file-pdf-o', command: (event) => {
        this.preparePDF();
      }},
      {label: 'DOC', icon: 'fa-file-text-o'},
      {label: 'XSL', icon: 'fa-file-excel-o', command: (event) => {
        console.log(event);
        }
      }
    ];*/
  }

  secondsToHours(sec): any {
    let hours = sec / 3600;
    hours = Math.round(hours * 100);
    let result = hours / 100;
    return result;
  }

  generateLabels() {
    let charts = this.projects[0].chart;
    let keys = Object.keys(charts);
    let len = keys.length;
    let type = (keys[0].length < 8) ? 0 : 1; // 0 for year - 1 for month-week
    console.log(type);
    for (let i = 0; i < len; i++) {
      let bill = this.secondsToHours(charts[keys[i]].billable);
      this.billables.push(bill);
      let unbill = this.secondsToHours(charts[keys[i]].unbillable);
      this.unbillables.push(unbill);
      let date = new Date(keys[i]);
      let dayLabel;
      let dateLabel;
      if (type === 0) {
        dayLabel = date.getFullYear().toString();
        dateLabel = this.monthStrings[(date.getMonth())];
      } else {
        dayLabel = this.dayStrings[date.getDay()];
        dateLabel = this.monthStrings[(date.getMonth())] + ' ' + date.getDate().toString();
      }
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
    this.from = begin;
    this.to = end;
    this.isLoaded = false;
    this.router.navigate(['report-detail', id, begin, end]);
    this.reportService.getReportDetailPerson(begin, end, id)
    .then(res => {
      this.member = res;
      this.totalTrackedTime = this.member.tracked_time;
      this.tasks = res.tasks;
      this.filteredTasks = this.tasks;

      this.sources = res.projects;

      this.overtimes = res.overtime;
      this.filteredOvertimes = this.overtimes;

      this.calOvertime();
      this.generateProjects(this.sources);
      this.generateLabels();
      this.generateValues();

      this.sum = [];
      let len = this.data.labels.length;
        for (let i = 0; i < len; i++) {
          let d = this.data.datasets[0].data[i] + this.data.datasets[1].data[i];
          this.sum.push(d);
        }
      let maxSum = Math.max(...this.sum);
      let maxY = 10;
      let step = 2;
      while (maxSum + 1 >= maxY) {
        maxY += step;
        if (Math.round(maxSum / 10) > step) {
          step = Math.round(maxSum / 10);
        }
      }
      this.options.scales.yAxes[0].ticks.max = maxY;
      this.options.scales.yAxes[0].ticks.stepSize = step;
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

  findProjectById(id: number, projects): number {
    let res = -1;
    let len = projects.length;
    for (let i = 0; i < len; i++) {
      if (projects[i].id === id) {
        res = i;
        break;
      }
    }
    return res;
  }

  chooseMember(memberId) {
    let para = this.route.params['_value'];
    this.member.id = memberId;
    let begin = para.begin;
    let end = para.end;
    this.newRange([begin, end]);
  }

  chooseProject(projectId) {
    this.labels = [];
    this.billables = [];
    this.unbillables = [];
    this.projects = [];
    this.data.labels = this.labels;
    this.data.datasets[0].data = this.billables;
    this.data.datasets[1].data = this.unbillables;
    this.isLoaded = false;
    let index = this.findProjectById(projectId, this.member.projects);
    this.sources = [this.member.projects[index]];

    console.log(this.sources);
    console.log(this.overtimes);
    this.generateProjects(this.sources);
    this.generateLabels();
    this.generateValues();
    this.totalTrackedTime = this.projects[0].tracked_time;
    this.filterTasks();
    this.filterOvertimes();

    this.sum = [];
    let len = this.data.labels.length;
      for (let i = 0; i < len; i++) {
        let d = this.data.datasets[0].data[i] + this.data.datasets[1].data[i];
        this.sum.push(d);
      }
    let maxSum = Math.max(...this.sum);
    console.log(maxSum);
    let maxY = 10;
    let step = 2;
    while (maxSum + 1 >= maxY) {
      maxY += step;
      if (Math.round(maxSum / 10) > step) {
        step = Math.round(maxSum / 10);
      }
    }
    this.options.scales.yAxes[0].ticks.max = maxY;
    this.options.scales.yAxes[0].ticks.stepSize = step;
    this.isLoaded = true;
    this.chart.refresh();
  }

  calOvertime() {
    this.otRegular = 0;
    this.otWeekend = 0;
    this.otHoliday = 0;
    this.oTTypes = [];
    for (let overtime of this.filteredOvertimes) {
      if (overtime.overtime_type === 'Normal') {
        this.otRegular += overtime.overtime;
      } else if (overtime.overtime_type === 'Weekend') {
        this.otWeekend += overtime.overtime;
      } else if (overtime.overtime_type === 'Holiday') {
        this.otHoliday += overtime.overtime;
      }
      this.oTTypes.push(overtime.overtime_type);
    }
  }

  filterTasks() {
    this.filteredTasks = [];
    let currentProject = this.sources[0];
    for (let task of this.tasks) {
      if (task.client.id === currentProject.client.id && task.project_name === currentProject.name) {
        this.filteredTasks.push(task);
      }
    }
  }

  filterOvertimes() {
    this.filteredOvertimes = [];
    let currentProject = this.sources[0];
    for (let ot of this.overtimes) {
      if (ot.project_name === currentProject.name) {
        this.filteredOvertimes.push(ot);
      }
    }
    this.calOvertime();
  }

  intervalVar;
  public preparePDF() {
    this.navClass[0] = 'choosing';
    this.navClass[1] = 'choosing';
    this.navClass[2] = 'choosing';
    this.intervalVar = setInterval(() => {
      if (document.getElementById('by-projects') != null && document.getElementById('by-tasks') != null
      && document.getElementById('overtime') != null)  {
        this.downloadPdf();
        clearInterval(this.intervalVar);
      }
    }, 100);
  }

  public downloadPdf() {
        let doc = new jsPDF();
        doc.setFontSize(16);
        doc.setFont('courier', 'bold');
        let interval;
        let pageHeight = 290;
        let yAnchor = 105;
        let isLoaded1 = false;
        let isLoaded2 = false;
        let isLoaded3 = false;
        let projectsLoaded: boolean[] = [];
        let tasksLoaded: boolean[] = [];
        let overtimeLoaded: boolean[] = [];
        html2canvas(document.getElementById('inforeport'), {
          onrendered: function (canvas) {
            let scale = canvas.height / canvas.width;
            let img = canvas.toDataURL('image/png');
            doc.addImage(img, 'JPEG', 5, 25, 200, 200 * scale );
            isLoaded1 = true;
          }
        });
        html2canvas(document.getElementById('report-search'), {
          onrendered: function (canvas) {
            let scale = canvas.height / canvas.width;
            let img = canvas.toDataURL('image/png');
            doc.addImage(img, 'JPEG', 5, 5, 200, 200 * scale );
            isLoaded2 = true;
          }
        });
        html2canvas(document.getElementById('chartreport'), {
          onrendered: function (canvas) {
            let scale = canvas.height / canvas.width;
            let img = canvas.toDataURL('image/png');
            doc.addImage(img, 'JPEG', 5, 45, 200, 200 * scale );
            doc.text(5, yAnchor, 'By Project:');
            isLoaded3 = true;
          }
        });
        let divByProjects = document.getElementById('by-projects');
        let divByTasks = document.getElementById('by-tasks');
        let divOvertime = document.getElementById('overtime');
        let lenProjects = this.projects.length;
        if (lenProjects === 0) {
          projectsLoaded.push(true);
        }else {
          for (let i = 0; i < lenProjects; i++) {
            this.spanClassProject[i] = 'fa fa-minus icon left';
            projectsLoaded.push(false);
          }
        }
        let currentProject = 0;

        let lenTasks = this.filteredTasks.length;
        if (lenTasks === 0) {
          tasksLoaded.push(true);
        }else {
          for (let i = 0; i < lenTasks; i++) {
            tasksLoaded.push(false);
          }
        }
        let currentTask = 0;

        let lenOvertime = this.filteredOvertimes.length;
        if (lenOvertime === 0) {
          overtimeLoaded.push(true);
        }else {
          for (let i = 0; i < lenOvertime; i++) {
            overtimeLoaded.push(false);
          }
        }
        let currentOvertime = 0;
        console.log(overtimeLoaded);
        interval = setInterval(() => {
          if (currentProject < lenProjects && lenProjects > 0) {
            if (currentProject === 0 || projectsLoaded[currentProject - 1]) {
              html2canvas(divByProjects.getElementsByClassName('project')[currentProject], {
                current: currentProject,
                onrendered: function(canvas) {
                  let scale = canvas.height / canvas.width;
                  let img = canvas.toDataURL('image/png');
                  if ((yAnchor + 200 * scale) > pageHeight){
                    doc.addPage();
                    yAnchor = 5;
                  }
                  doc.addImage(img, 'JPEG', 0, yAnchor, 200, 200 * scale );
                  yAnchor += 200 * scale;
                  projectsLoaded[this.current] = true;
                }
              });
              currentProject++;
            }
          } else {
            lenProjects = 1;
            currentProject = 1;
          }

          if (projectsLoaded[lenProjects - 1]) {
            if (currentTask < lenTasks && lenTasks > 0) {
              if (currentTask === 0 || tasksLoaded[currentTask - 1]) {
                if (currentTask === 0) {
                  yAnchor += 10;
                  if (yAnchor > pageHeight) {
                    doc.addPage();
                    yAnchor = 5;
                  }
                  doc.text(5, yAnchor, 'By Tasks:');
                  let yPos = yAnchor + 3;
                  console.log('before if: ' + yPos);
                  if (yPos + 7.2 > pageHeight) {
                    doc.addPage();
                    yPos = 5;
                  }
                  console.log('after if: ' + yPos);
                  yAnchor = yPos + 8;
                  html2canvas(divByTasks.getElementsByClassName('entry')[0], {
                    yPos: yPos,
                    onrendered: function(canvas) {
                      let scale = canvas.height / canvas.width;
                      let img = canvas.toDataURL('image/png');
                      console.log('entry: ' + 200 * scale );
                      doc.addImage(img, 'JPEG', 5, this.yPos, 200, 200 * scale );
                      }
                  });
                }
                html2canvas(divByTasks.getElementsByClassName('task')[currentTask], {
                  current: currentTask,
                  onrendered: function(canvas) {
                    let scale = canvas.height / canvas.width;
                    let img = canvas.toDataURL('image/png');
                    if ((yAnchor + 200 * scale) > pageHeight) {
                      doc.addPage();
                      yAnchor = 5;
                    }
                    doc.addImage(img, 'JPEG', 5, yAnchor, 200, 200 * scale );
                    yAnchor += 200 * scale;
                    tasksLoaded[this.current] = true;
                  }
                });
                currentTask++;
              }
            } else {
              lenTasks = 1;
              currentTask = 1;
            }
          }

          if (tasksLoaded[lenTasks - 1]) {
            if (currentOvertime < lenOvertime && lenOvertime > 0) {
              if (currentOvertime === 0 || overtimeLoaded[currentOvertime - 1]) {
                if (currentOvertime === 0) {
                  yAnchor += 10;
                  if (yAnchor > pageHeight) {
                    doc.addPage();
                    yAnchor = 5;
                  }
                  doc.text(5, yAnchor, 'Overtime:');
                  yAnchor += 5;
                  let yPos0 = yAnchor;
                  console.log('before if: ' + yPos0);
                  if (yPos0 + 33.4 > pageHeight) {
                    doc.addPage();
                    yPos0 = 5;
                  }
                  console.log('after if: ' + yPos0);
                  yAnchor = yPos0 + 13;
                  html2canvas(divOvertime.getElementsByClassName('summary')[0], {
                    yPos: yPos0,
                    onrendered: function(canvas) {
                      let scale = canvas.height / canvas.width;
                      let img = canvas.toDataURL('image/png');
                      console.log('summary: ' + 200 * scale );
                      doc.addImage(img, 'JPEG', 60, this.yPos, 80, 80 * scale );
                    }
                  });
                }
                html2canvas(divOvertime.getElementsByClassName('info')[currentOvertime], {
                  current: currentOvertime,
                  onrendered: function(canvas) {
                    let scale = canvas.height / canvas.width;
                    let img = canvas.toDataURL('image/png');
                    if ((yAnchor + 200 * scale) > pageHeight) {
                      doc.addPage();
                      yAnchor = 5;
                    }
                    doc.addImage(img, 'JPEG', 5, yAnchor, 200, 200 * scale );
                    yAnchor += 200 * scale;
                    overtimeLoaded[this.current] = true;
                  }
                });
                currentOvertime++;
              }
            } else {
              lenOvertime = 1;
              currentOvertime = 1;
            }
          }

          if (isLoaded1 && isLoaded2 && isLoaded3 && overtimeLoaded[lenOvertime - 1]) {
            doc.save('personal-report-' + this.member.user.first_name + '-' + this.member.user.last_name + '.pdf');
            this.navClass[1] = '';
            this.navClass[2] = '';
            clearInterval(interval);
          }else {}
        }, 100);
    }

    @ViewChild('reportSearch') reportSearch;
    reportSearchMouseHandle(event) {
      this.reportSearch.showEvent(event);
    }

    expandTimeLog(i) {
      if (this.timeLogExpand[i] === 'fa fa-caret-right icon left') {
        this.timeLogExpand[i] = 'fa fa-caret-down icon left';
        this.divExpand[i] = 'date-title expanded';
      } else {
        this.timeLogExpand[i] = 'fa fa-caret-right icon left';
        this.divExpand[i] = 'date-title';
      }
    }
}
