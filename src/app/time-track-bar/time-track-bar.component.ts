import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-track-bar',
  templateUrl: './time-track-bar.component.html',
  styleUrls: ['./time-track-bar.component.scss']
})
export class TimeTrackBarComponent implements OnInit {
  classBtn: String = 'play-btn';
  
  constructor() { }

  ngOnInit() {
  }

  changeClass(): void {
    this.classBtn = this.classBtn === 'play-btn' ? 'stop-btn' : 'play-btn';
  }
}
