import { ReportService } from './../services/report-service';
import { Router } from '@angular/router';
import { ProjectService } from './../services/project-service';
import { ProjectGetOne } from './../models/project';
import { Member } from './../models/member';
import { MembershipService } from './../services/membership-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  members: Member[] = [];
  projectLists: ProjectGetOne[]= [];
  firstWeekDay: Date;
  lastWeekDay: Date;
  firstString: string;
  lastString: string;
  constructor(private router: Router, private reportService: ReportService) { }

  ngOnInit() {
    this.generateLastWeek();
    this.reportService.getReportAll(this.firstString, this.lastString)
    .then(res => {
      console.log(res);
      this.members = res.people;
      this.projectLists = res.projects;
    })
    .catch(error => {
      console.log(error);
    });
  }

  detailReport(arg) {
    console.log(arg);
    this.router.navigate(['report-detail', arg, this.firstString, this.lastString]);
  }

  detailReportProject(id) {
    console.log(id);
    this.router.navigate(['report-detail-project', id, this.firstString, this.lastString]);
  }

  dateToShortString(date: Date): string {
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    let res = yearString + '-' + monthString + '-' + dateString;
    return res;
  }

  generateLastWeek() {
    let curr = new Date();
    let currDate = curr.getDate();
    currDate -= 7;
    curr.setDate(currDate);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr1.getDate() - curr1.getDay();
    this.firstWeekDay = new Date(curr1.setDate(first));
    this.lastWeekDay = new Date(curr2.setDate(first + 6));
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    console.log(this.firstString + '-' + this.lastString);
  }

  newRange(arg) {
    this.firstString = arg[0];
    this.lastString = arg[1];
    this.reportService.getReportAll(this.firstString, this.lastString)
    .then(res => {
      console.log(res);
      this.members = res.people;
      this.projectLists = res.projects;
    })
    .catch(error => {
      console.log(error);
    });
  }

}
