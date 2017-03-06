import { ProjectGetOne } from './../models/project';
import { ProjectService } from './../services/project-service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  currentProject: ProjectGetOne;
  constructor( private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    let para = this.route.params['_value'].id;
    console.log(para);
    this.projectService.getProject(para)
    .then(res => {
      this.currentProject = res;
      console.log(this.currentProject);
    })
    .catch(err => {
      console.log(err);
    });
  }

}
