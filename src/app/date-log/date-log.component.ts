import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-log',
  templateUrl: './date-log.component.html',
  styleUrls: ['./date-log.component.scss']
})
export class DateLogComponent implements OnInit {
  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Total'];
  time: string[] = ['8:00', '8:00', '8:00', '8:00', '8:00', '0:00', '0:00', '40:00'];
  
  constructor() { }

  ngOnInit() {
  }

}
