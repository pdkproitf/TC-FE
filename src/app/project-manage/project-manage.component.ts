import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createNewProject() {
    this.router.navigate(['/new-project']);
  }
}
