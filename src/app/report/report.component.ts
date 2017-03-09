import { ProjectService } from './../services/project-service';
import { ProjectGetAll } from './../models/project';
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
  projectLists: ProjectGetAll[]= [];
  constructor(private membershipService: MembershipService, private projectService: ProjectService) { }

  ngOnInit() {
    this.membershipService.getAllMembership()
    .then(res => {
      this.members = res;
    })
    .catch(err => {
      console.log(err);
    });

    this.projectService.getProjects()
    .then(res => {
      this.projectLists = res;
    })
    .catch(err => {
      console.log(err);
    });
  }

}
