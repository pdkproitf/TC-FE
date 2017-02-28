import { CategoryInProject } from './../models/category-in-project';
import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-project-field',
  templateUrl: './project-field.component.html',
  styleUrls: ['./project-field.component.scss']
})
export class ProjectFieldComponent implements OnInit {
  @Input()
  myProject: ProjectJoin;
  _currentCategory = new CategoryInProject();
  @Input()
  set currentCategory(arg) {
    this._currentCategory = arg;
    /* if (this._currentCategory.project !== this.myProject.name) {
      let len = this.classBtns.length;
      for (let j = 0; j < len; j++) {
        this.classBtns[j] = 'play-btn';
      }
    }*/
  }
  get currentCategory() {
    return this._currentCategory;
  }
  classBtns = [];
  hidden = false;
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();

  constructor() { }

  ngOnInit() {
    let len = this.myProject.category.length;
    for (let i = 0; i < len; i++) {
      this.classBtns.push('play-btn');
    }
  }

  changeClass(i): void {
    /* let len = this.classBtns.length;
    for (let j = 0; j < len; j++) {
      if (j !== i) {
        this.classBtns[j] = 'play-btn';
      }
    }
    this.classBtns[i] = this.classBtns[i] === 'play-btn' ? 'stop-btn' : 'play-btn';*/
    let outCat = new CategoryInProject();
    outCat.category = this.myProject.category[i].name;
    outCat.project = this.myProject.name;
    outCat.category_member_id = this.myProject.category[i].category_member_id;
    outCat.color = this.myProject.background;
    this.outCategory.emit(outCat);
  }

  hideProj() {
    this.hidden = true;
  }

  showProj() {
    this.hidden = false;
  }
}
