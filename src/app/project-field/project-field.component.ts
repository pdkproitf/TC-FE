import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/project';
@Component({
  selector: 'app-project-field',
  templateUrl: './project-field.component.html',
  styleUrls: ['./project-field.component.scss']
})
export class ProjectFieldComponent implements OnInit {
  myProject: Project = {
    name: 'Temp Project',
    tasks: ['Task1', 'Task2', 'Task3'],
    company: 'My Company',
    color: '#EA4335',
  };
  classBtns = ['playBtn', 'playBtn', 'playBtn'];
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
  }
  changeClass(i): void {
    for (let j = 0; j < 3; j++) {
      if (j !== i) {
        this.classBtns[j] = 'playBtn';
      }
    }
    this.classBtns[i] = this.classBtns[i] === 'playBtn' ? 'stopBtn' : 'playBtn';
  }
  change(newValue) {
    console.log('newvalue', newValue);
    this._sharedVar = newValue;
    this.sharedVarChange.emit(newValue);
  }
}
