import { Component, OnInit } from '@angular/core';
import { AutoCompleteModule, InputTextModule, ButtonModule } from 'primeng/primeng';

@Component({
  selector: 'app-time-track-bar',
  templateUrl: './time-track-bar.component.html',
  styleUrls: ['./time-track-bar.component.scss']
})
export class TimeTrackBarComponent implements OnInit {
  classBtn: String = 'playBtn';
  constructor() { }
  ngOnInit() {
  }
  changeClass(): void {
    this.classBtn = this.classBtn === 'playBtn' ? 'stopBtn' : 'playBtn';
  }
}
