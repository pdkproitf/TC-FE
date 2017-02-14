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
  classBtns = [];
  private _sharedVar = '';
  @Input()
  set sharedVar(name: string){
    this._sharedVar = name;
    console.log('Changed');
  }
  get sharedVar(){
    return this._sharedVar;
  }
  @Output() sharedVarChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    let len = this.myProject.category.length;
    for (let i = 0; i < len; i++) {
      this.classBtns.push('play-btn');
    }
  }

  changeClass(i): void {
    for (let j = 0; j < 3; j++) {
      if (j !== i) {
        this.classBtns[j] = 'play-btn';
      }
    }
    this.classBtns[i] = this.classBtns[i] === 'play-btn' ? 'stop-btn' : 'play-btn';
  }

  change(newValue) {
    console.log('newvalue', newValue);
    this._sharedVar = newValue;
    this.sharedVarChange.emit(newValue);
  }
}
