import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marketing-menu-bar',
  templateUrl: './marketing-menu-bar.component.html',
  styleUrls: ['./marketing-menu-bar.component.scss']
})
export class MarketingMenuBarComponent implements OnInit {
  @Input()
  typePage: number = -1;
  classType = ['', ''];

  constructor(private router: Router) { }
  
  ngOnInit() {
    let tmp = this.typePage;
    if (tmp > -1) {
      this.classType[tmp] = 'active';
    }
  }
}
