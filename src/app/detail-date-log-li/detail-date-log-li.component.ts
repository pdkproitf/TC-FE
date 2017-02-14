import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-date-log-li',
  templateUrl: './detail-date-log-li.component.html',
  styleUrls: ['./detail-date-log-li.component.scss']
})
export class DetailDateLogLiComponent implements OnInit {
  spanClass = 'hidden';
  constructor() { }

  ngOnInit() {
  }
  showSpan() {
    this.spanClass = 'aaa';
  }
  hideSpan() {
    this.spanClass = 'hidden';
  }
}
