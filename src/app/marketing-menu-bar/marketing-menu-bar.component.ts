import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marketing-menu-bar',
  templateUrl: './marketing-menu-bar.component.html',
  styleUrls: ['./marketing-menu-bar.component.css']
})
export class MarketingMenuBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onClick() {
    this.router.navigate(['/sign-up']);
  }
}
