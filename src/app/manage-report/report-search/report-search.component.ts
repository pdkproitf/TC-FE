import { CompanyService } from '../../services/company-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipService } from '../../services/membership-service';
import { ProjectService } from '../../services/project-service';
import { ProjectGetAll } from '../../models/project';
import { Member } from '../../models/member';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {
  options: string[][] = [['Yesterday', 'Last week', 'Last month', 'Last year'],
  ['Today', 'This week', 'This month', 'This year']];
  timeRange = 'Last week';
  firstWeekDay;
  lastWeekDay;
  @Input()
  firstString;
  @Input()
  lastString;
  fromChoosed: boolean = false;
  toChoosed: boolean = false;
  idMember: number = null;
  @Input()
  member: string = '';
  idProject: number = null;
  @Input()
  project: string = '';
  @Input()
  members: Member[] = [];
  membersSearch: Member[] = [];
  memberSearchTimeOut: any;
  @Input()
  projectLists: ProjectGetAll[]= [];
  projectListsSearch: ProjectGetAll[] = [];
  projectSearchTimeOut: any;
  @Output()
  emitRange = new EventEmitter<any>();
  @Output()
  emitRunReport = new EventEmitter<any>();
  @Output()
  emitProject = new EventEmitter<any>();
  @Output()
  emitMember = new EventEmitter<any>();
  classDiv = ['choose-time hide', 'choose-project hide', 'choose-member hide'];
  startWeekDay = 0;
  constructor(private projectService: ProjectService, private membershipService: MembershipService,
  private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.projectService.getProjects()
    .then(res => {
      this.projectLists = res;
      this.filterProjectsSearch('');
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
    this.membershipService.getAllMembership()
    .then(res => {
      this.members = res;
      this.filterMembersSearch('');
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
    this.companyService.getCompany()
    .then(res => {
      this.startWeekDay = res.begin_week;
    })
    .catch(err => {
      console.log(err);
    })
  }

  changeClassDiv(i) {
    if (i === 0) {
      // this.classDiv[i] = (this.classDiv[i] === 'choose-time') ? 'choose-time hide' : 'choose-time';
      if (this.classDiv[i] === 'choose-time hide') {
        this.classDiv[i] = 'choose-time';
      }
    }
  }

  showClassDiv(i) {
    if (i === 1) {
      this.classDiv[i] = 'choose-project';
    }
    if (i === 2) {
      this.classDiv[i] = 'choose-member';
    }
  }

  hideClassDiv(i) {
    this.classDiv[i] = this.classDiv[i] + ' hide';
  }

  selectDate(i, event) {
    console.log(new Date(event));
    if (i === 0) {
      this.firstWeekDay = new Date(event);
      this.fromChoosed = true;
    } else if (i === 1) {
      this.lastWeekDay = new Date(event);
      this.toChoosed = true;
    }
    if (this.fromChoosed && this.toChoosed) {
      this.firstString = this.dateToShortString(this.firstWeekDay);
      this.lastString = this.dateToShortString(this.lastWeekDay);
      this.timeRange = this.firstString + '-->' + this.lastString;
      this.toChoosed = false;
      this.fromChoosed = false;
      this.changeClassDiv(0);
      this.emitRange.emit([this.firstString, this.lastString]);
    }
  }

  chooseRange(row, col) {
    let res = 4 * row + col;
    console.log(res);
    switch (res) {
      case 0: {
        this.yesterdayChoosed();
        break;
      }
      case 1: {
        this.lastWeekChoosed();
        break;
      }
      case 2: {
        this.lastMonthChoosed();
        break;
      }
      case 3: {
        this.lastYearChoosed();
        break;
      }
      case 4: {
        this.todayChoosed();
        break;
      }
      case 5: {
        this.thisWeekChoosed();
        break;
      }
      case 6: {
        this.thisMonthChoosed();
        break;
      }
      case 7: {
        this.thisYearChoosed();
        break;
      }
    }
  }

  dateToShortString(date: Date): string {
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    let res = yearString + '-' + monthString + '-' + dateString;
    return res;
  }

  thisWeekChoosed() {
    this.timeRange = this.options[1][1];
    this.changeClassDiv(0);
    this.generateThisWeek(0);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  lastWeekChoosed() {
    this.timeRange = this.options[0][1];
    this.changeClassDiv(0);
    this.generateThisWeek(-1);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  generateThisWeek(i) {
    let curr = new Date();
    let currDate = curr.getDate() + (7 * i);
    curr.setDate(currDate);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr1.getDate() - curr1.getDay() + this.startWeekDay;
    this.firstWeekDay = new Date(curr1.setDate(first));
    this.lastWeekDay = new Date(curr2.setDate(first + 6));
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    console.log(this.firstString + '-' + this.lastString);
  }

  todayChoosed() {
    this.timeRange = this.options[1][0];
    this.changeClassDiv(0);
    this.generateDay(0);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  yesterdayChoosed() {
    this.timeRange = this.options[0][0];
    this.changeClassDiv(0);
    this.generateDay(-1);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  generateDay(i) {
    let curr = new Date();
    let currDate = curr.getDate() + (1 * i);
    curr.setDate(currDate);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    this.firstWeekDay = new Date(curr1);
    this.lastWeekDay = new Date(curr2);
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    console.log(this.firstString + '-' + this.lastString);
  }

  lastMonthChoosed() {
    this.timeRange = this.options[0][2];
    this.changeClassDiv(0);
    this.generateMonth(-1);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  thisMonthChoosed() {
    this.timeRange = this.options[1][2];
    this.changeClassDiv(0);
    this.generateMonth(0);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  generateMonth(i) {
    let curr = new Date();
    let currMonth = curr.getMonth() + (1 * i);
    curr.setMonth(currMonth);
    let curr1 = new Date(curr);
    curr1.setDate(1);
    let curr2 = new Date(curr);
    curr2.setMonth(currMonth + 1);
    curr2.setDate(0);
    this.firstWeekDay = new Date(curr1);
    this.lastWeekDay = new Date(curr2);
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    console.log(this.firstString + '-' + this.lastString);
  }

  lastYearChoosed() {
    this.timeRange = this.options[0][3];
    this.changeClassDiv(0);
    this.generateYear(-1);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  thisYearChoosed() {
    this.timeRange = this.options[1][3];
    this.changeClassDiv(0);
    this.generateYear(0);
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  generateYear(i) {
    let curr = new Date();
    let currYear = curr.getFullYear() + (1 * i);
    curr.setFullYear(currYear);
    let curr1 = new Date(curr);
    curr1.setMonth(0);
    curr1.setDate(1);
    let curr2 = new Date(curr);
    curr2.setMonth(11);
    curr2.setDate(31);
    this.firstWeekDay = new Date(curr1);
    this.lastWeekDay = new Date(curr2);
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    console.log(this.firstString + '-' + this.lastString);
  }

  setProject(id, name, client) {
    this.idProject = id;
    this.project = name + ' (' + client + ') ';
    this.emitProject.emit(id);
  }

  setMember(id, first, last) {
    this.idMember = id;
    this.member = first + ' ' + last;
    this.emitMember.emit(id);
  }

  runReport() {
    if (this.firstString === undefined || this.lastString === undefined) {
      this.generateThisWeek(-1);
    }
    if (this.member === '') {
      this.idMember = null;
    }
    if (this.project === '') {
      this.idProject = null;
    }
    let res = [this.firstString, this.lastString, this.idProject, this.idMember];
    console.log(res);
    this.router.navigate(['/report-advance']);
  }

  keyUpMemberSearch() {
    clearTimeout(this.memberSearchTimeOut);
    setTimeout(() => this.filterMembersSearch(this.member), 500);
  }

  filterMembersSearch(str: string) {
    this.membersSearch = [];
    for (let member of this.members) {
      if (member.user.first_name.indexOf(str) > -1 || member.user.last_name.indexOf(str) > -1) {
        this.membersSearch.push(member);
      }
    }
  }

  keyUpProjectSearch() {
    clearTimeout(this.projectSearchTimeOut);
    setTimeout(() => this.filterProjectsSearch(this.project), 500);
  }

  filterProjectsSearch(str: string) {
    this.projectListsSearch = [];
    for (let project of this.projectLists) {
      if (project.name.indexOf(str) > -1 || project.client.name.indexOf(str) > -1) {
        this.projectListsSearch.push(project);
      }
    }
  }

  showEvent(event) {
    let className = event.toElement.className;
    console.log(className);
    if (this.classDiv[0] === 'choose-time') {
      if (className === 'class-calendar' || className === 'choose-time' || className === 'fa fa-angle-left'
      || className === 'fa fa-angle-right' || className === 'ui-datepicker-next ui-corner-all ui-state-hover ui-datepicker-next-hover'
      || className === 'ui-datepicker-prev ui-corner-all ui-state-hover ui-datepicker-prev-hover'
      || className === 'ui-state-default ui-state-active ui-state-hover' || className === 'ui-datepicker-title'
      || className === 'ui-state-default ui-state-hover ui-state-highlight' || className === 'ui-state-default ui-state-hover'
      || className === 'ui-datepicker-year' || className === 'ui-datepicker-month' || className === 'option') {
        return;
      }else {
        this.classDiv[0] += ' hide';
      }
    }
  }
}
