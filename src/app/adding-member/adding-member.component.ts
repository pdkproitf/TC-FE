import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adding-member',
  templateUrl: './adding-member.component.html',
  styleUrls: ['./adding-member.component.scss']
})
export class AddingMemberComponent implements OnInit {
  searchName = 'Add more people...';
  constructor() { }

  ngOnInit() {
  }

}
