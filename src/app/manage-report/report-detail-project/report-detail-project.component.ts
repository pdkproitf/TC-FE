import { ReportService } from '../../services/report-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';

declare let jsPDF;
declare let html2canvas;
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
  ],
})
export class ReportDetailProjectComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
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
  // displayMembers = [];
  spanMemberClass = [];
  spanCategoryClass = [];
  isLoaded = false;
  from: string = '';
  to: string = '';
  // idMember = null;
  // hoursTracked = 0;
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
        events: {},
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
    this.project.id = para.id;
    let begin = para.begin;
    let end = para.end;
    this.from = begin;
    this.to = end;
    this.newRange([begin, end]);
    /*this.items = [
      {label: 'PDF', icon: 'fa-file-pdf-o', command: (event) => {
        this.preparePdf();
      }},
      {label: 'DOC', icon: 'fa-file-text-o'},
      {label: 'XSL', icon: 'fa-file-excel-o', command: (event) => {
        console.log('XSL');
        }
      }
    ];*/
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
    let type = (Object.keys(this.charts[0])[0].length < 8) ? 0 : 1; // 0 for year - 1 for month-week
    console.log(type);
    for (let i = 0; i < len; i++) {
      let key = Object.keys(this.charts[i])[0];
      let date = new Date(key);
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
  isLoading = false;
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
    this.from = begin;
    this.to = end;
    this.isLoaded = false;
    this.router.navigate(['report-detail-project', id, begin, end]);
    this.isLoading = true;
    this.reportService.getReportDetailProject(begin, end, id)
    .then(res => {
      console.log(res);
      this.sources = res;
      this.project = this.findProject(id, this.sources);
      // this.hoursTracked = this.project.tracked_time;
      this.charts = this.project.chart;
      this.categories = this.project.categories;
      this.client_name = this.project.client.name;
      this.background = this.project.background;
      this.members = [];
      this.generateLabels();
      this.generateValues();
      this.generateMembers();
      // this.filterMemberInCategories();
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
      this.isLoading = false;
    })
    .catch(error => {
      console.log(error);
      this.isLoading = false;
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
    console.log(idEvent);
    let para = this.route.params['_value'];
    let begin = para.begin;
    let end = para.end;

    this.labels = [];
    this.billables = [];
    this.unbillables = [];
    this.data.labels = this.labels;
    this.data.datasets[0].data = this.billables;
    this.data.datasets[1].data = this.unbillables;

    this.isLoaded = false;
    this.router.navigate(['report-detail-project', idEvent, begin, end]);
    this.project = this.findProject(idEvent, this.sources);
    // this.hoursTracked = this.project.tracked_time;
    this.charts = this.project.chart;
    this.categories = this.project.categories;
    this.client_name = this.project.client.name;
    this.background = this.project.background;
    this.members = [];
    this.generateLabels();
    this.generateValues();
    this.generateMembers();
    // this.filterMemberInCategories();
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

  detailMember(idMember) {
    let para = this.route.params['_value'];
    this.project.id = para.id;
    let begin = para.begin;
    let end = para.end;
    this.router.navigate(['report-detail', idMember, begin, end]);
    /*this.displayMembers = [];
    for (let mem of this.members) {
      if (mem.id === idMember) {
        this.displayMembers.push(mem);
        this.hoursTracked = mem.tracked_time;
        break;
      }
    }
    this.idMember = idMember;
    this.filterMemberInCategories();*/
  }

  /*filterMemberInCategories() {
    if (this.idMember == null) {
      for (let category of this.categories) {
        category.displayMembers = [];
        for (let mem of category.members){
          category.displayMembers.push(mem);
        }
        category.displayTrackedTime = category.tracked_time;
      }
    } else {
      for (let category of this.categories) {
        category.displayMembers = [];
        for (let mem of category.members){
          if (mem.id === this.idMember) {
            category.displayMembers.push(mem);
            category.displayTrackedTime = mem.tracked_time;
            break;
          }
        }
      }
    }
  }*/

  generateMembers() {
    this.spanMemberClass = [];
    this.spanCategoryClass = [];
    for (let category of this.categories) {
      this.spanCategoryClass.push('fa fa-plus icon left');
      let len = category.members.length;
      for (let i = 0; i < len; i++) {
        let j = this.isInMemberList(category.members[i]);
        if (j < 0) {
          console.log(category.members[i]);
          let mem = Object.create(category.members[i]);
          mem.tracked_time = category.members[i].tracked_time;
          mem.id = category.members[i].id;
          this.members.push(mem);
          // this.displayMembers.push(mem);
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

  intervalVar;
  public preparePdf() {
    this.isLoading = true;
    this.navClass[0] = 'choosing';
    this.navClass[1] = 'choosing';
    this.intervalVar = setInterval(() => {
      if (document.getElementById('by-people') != null &&
      document.getElementById('by-categories') != null) {
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
    let peopleLoaded: boolean[] = [];
    let categoriesLoaded: boolean[] = [];
    html2canvas(document.getElementById('project-info'), {
      onrendered: function(canvas) {
        let scale = canvas.height / canvas.width;
        let img = canvas.toDataURL('image/png');
        doc.addImage(img, 'JPEG', 0, 25, 200, 200 * scale );
        isLoaded1 = true;
      }
    });
    html2canvas(document.getElementById('report-search'), {
      onrendered: function(canvas) {
        let scale = canvas.height / canvas.width;
        let img = canvas.toDataURL('image/png');
        doc.addImage(img, 'JPEG', 5, 5, 200, 200 * scale );
        isLoaded2 = true;
      }
    });
    html2canvas(document.getElementById('chart-report'), {
      onrendered: function (canvas) {
        let scale = canvas.height / canvas.width;
        let img = canvas.toDataURL('image/png');
        doc.addImage(img, 'JPEG', 5, 45, 200, 200 * scale );
        doc.text(5, yAnchor, 'By People:');
        yAnchor += 5;
        isLoaded3 = true;
      }
    });
    let divByPeople = document.getElementById('by-people');
    let divByCategories = document.getElementById('by-categories');

    let lenPeople = this.members.length;
    if (lenPeople === 0) {
      peopleLoaded.push(true);
    } else {
      for (let i = 0; i < lenPeople; i++) {
        this.spanMemberClass[i] = 'fa fa-minus icon left';
        peopleLoaded.push(false);
      }
    }
    let currentPerson = 0;

    let lenCategories = this.categories.length;
    if (lenCategories === 0) {
      categoriesLoaded.push(true);
    } else {
      for (let i = 0; i < lenCategories; i++) {
        this.spanCategoryClass[i] = 'fa fa-minus icon left';
        categoriesLoaded.push(false);
      }
    }
    let currentCategory = 0;
    interval = setInterval(() => {
      if (currentPerson < lenPeople && lenPeople > 0) {
        if (currentPerson === 0 || peopleLoaded[currentPerson - 1]) {
          html2canvas(divByPeople.getElementsByClassName('person')[currentPerson], {
            current: currentPerson,
            onrendered: function(canvas) {
              let scale = canvas.height / canvas.width;
              let img = canvas.toDataURL('image/png');
              if ((yAnchor + 200 * scale) > pageHeight) {
                doc.addPage();
                yAnchor = 5;
              }
              doc.addImage(img, 'JPEG', 0, yAnchor, 200, 200 * scale);
              yAnchor += 200 * scale;
              peopleLoaded[this.current] = true;
            }
          });
          currentPerson++;
        }
      } else {
        lenPeople = 1;
        currentPerson = 1;
      }

      if (peopleLoaded[lenPeople - 1]) {
        if (currentCategory < lenCategories && lenCategories > 0) {
          if (currentCategory === 0 || categoriesLoaded[currentCategory - 1]) {
            if (currentCategory === 0) {
              yAnchor += 10;
              if (yAnchor > pageHeight) {
                doc.addPage();
                yAnchor = 5;
              }
              doc.text(5, yAnchor, 'By Categories:');
              let yPos = yAnchor + 3;
              yAnchor += 5;
            }
            html2canvas(divByCategories.getElementsByClassName('category')[currentCategory], {
              current: currentCategory,
              onrendered: function(canvas) {
                let scale = canvas.height / canvas.width;
                let img = canvas.toDataURL('image/png');
                if ((yAnchor + 200 * scale) > pageHeight) {
                  doc.addPage();
                  yAnchor = 5;
                }
                doc.addImage(img, 'JPEG', 0, yAnchor, 200, 200 * scale );
                yAnchor += 200 * scale;
                categoriesLoaded[this.current] = true;
              }
            });
            currentCategory ++;
          }
        } else {
          lenCategories = 1;
          currentCategory = 1;
        }
      }

      if (isLoaded1 && isLoaded2 && isLoaded3 && categoriesLoaded[lenCategories - 1]) {
        doc.save('report-for-project-' + this.project.name + '.pdf');
        this.navClass[1] = '';
        this.isLoading = false;
        clearInterval(interval);
      } else {}
    }, 100);
  }
  @ViewChild('reportSearch') reportSearch;
  reportSearchMouseHandle(event) {
    this.reportSearch.showEvent(event);
  }
}
