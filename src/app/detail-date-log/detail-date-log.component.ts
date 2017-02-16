import { TimerFetch } from './../models/timer-fetch';
import { TimerFetchService } from './../services/timer-fetch-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-date-log',
  templateUrl: './detail-date-log.component.html',
  styleUrls: ['./detail-date-log.component.scss']
})
export class DetailDateLogComponent implements OnInit {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total'];
  classDay: string[] = ['', '', '', '', '', '', '', '', ''];
  time: string[] = ['0:00', '8:00', '8:00', '8:00', '8:00', '8:00', '0:00', '40:00'];
  fullWeekTimer;
  currentTimers;
  constructor(private timerFetchService: TimerFetchService) { }

  ngOnInit() {
    let curr = new Date();
    this.classDay[curr.getDay()] = 'active';
    this.timerFetchService.getTimerFetch('2017-02-12', '2017-02-18')
    .then(res => {
      this.fullWeekTimer = res;
      let chooseString = this.dateToShortString(curr);
      this.currentTimers = this.fullWeekTimer[chooseString];
    })
    .catch(err => {
      console.log(err);
    });
  }
  setActiveDay(a) {
    for (let i = 0; i < 8; i++) {
      if ( i !== a) {
        this.classDay[i] = '';
      }
    }
    this.classDay[a] = 'active';
  }
  dateToShortString(date: Date): string {
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    let res = yearString + '-' + monthString + '-' + dateString;
    return res;
  }

}
