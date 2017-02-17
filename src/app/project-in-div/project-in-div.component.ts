import { CategoryInProject } from './../models/category-in-project';
import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-in-div',
  templateUrl: './project-in-div.component.html',
  styleUrls: ['./project-in-div.component.scss']
})
export class ProjectInDivComponent implements OnInit {
  @Input()
  myProject: ProjectJoin;
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();
  constructor() { }

  ngOnInit() {
  }

  emitCategory(arg) {
    let outCat = new CategoryInProject();
    outCat.project = this.myProject.name;
    outCat.category = arg.name;
    outCat.pcu_id = arg.pcu_id;
    outCat.color = this.myProject.background;
    this.outCategory.emit(outCat);
  }

}
