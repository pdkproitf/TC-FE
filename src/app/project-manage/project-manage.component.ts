import { UserService } from './../services/user-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {
  isHighPM: boolean = false;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.isHighPM = this.userService.isHighPM();
  }

  createNewProject() {
    this.router.navigate(['/new-project']);
  }
}
