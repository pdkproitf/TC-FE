import { CategoryInProject } from './../models/category-in-project';
import { ProjectJoinService } from './../services/project-join-service';
import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-field-list',
  templateUrl: './project-field-list.component.html',
  styleUrls: ['./project-field-list.component.scss']
})
export class ProjectFieldListComponent implements OnInit {
  projectJoins: ProjectJoin[] = [];
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();
  currentCategory = new CategoryInProject();
  constructor(private projectJoinService: ProjectJoinService) { }

  ngOnInit() {
    this.projectJoinService.getProjectJoin()
    .then(res => {
      this.projectJoins = res;
      console.log(this.projectJoins);
    })
    .catch(err => {
      console.log(err);
    });
  }

  selectCategory(arg) {
    this.outCategory.emit(arg);
    this.currentCategory = arg;
  }

}
