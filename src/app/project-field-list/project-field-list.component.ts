import { CategoryInProject } from './../models/category-in-project';
import { ProjectJoinService } from './../services/project-join-service';
import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-project-field-list',
  templateUrl: './project-field-list.component.html',
  styleUrls: ['./project-field-list.component.scss']
})
export class ProjectFieldListComponent implements OnInit {
  projectJoins: ProjectJoin[] = [];
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();
  @Output()
  outProjectJoins = new EventEmitter<ProjectJoin[]>();
  @Input()
  currentCategory = new CategoryInProject();
  constructor(private projectJoinService: ProjectJoinService) { }

  ngOnInit() {
    this.projectJoinService.getProjectJoin()
    .then(res => {
      this.projectJoins = res;
      this.outProjectJoins.emit(this.projectJoins);
    })
    .catch(err => {
      console.log(err);
    });
  }

  selectCategory(arg) {
    this.outCategory.emit(arg);
    // this.currentCategory = arg;
  }

}
