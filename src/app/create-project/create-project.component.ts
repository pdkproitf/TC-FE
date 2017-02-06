import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  reportType: number = 1;
  classBtn: string[] = ['active', ''];
  constructor() { }

  ngOnInit() {
  }

  setTypeReport(num: number){
    this.reportType = num;
    num -= 1;
    if (this.classBtn[num] !== 'active') {
      this.classBtn[num] = 'active';
    }
    for (let i = 0; i < 2; i++ ){
      if (i !== num ) {
        this.classBtn[i] = '';
      }
    }
  }

}
