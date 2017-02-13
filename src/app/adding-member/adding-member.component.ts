import { EmployeePost, Employee } from './../models/employee';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adding-member',
  templateUrl: './adding-member.component.html',
  styleUrls: ['./adding-member.component.scss']
})
export class AddingMemberComponent implements OnInit {
  classDiv: string = 'hidden';
  searchName: string = 'Add more people...';
  @Input()
  set employeePosts(para){
    this._employeePosts = para;
    this.employeePostsSearch = this._employeePosts;
  }
  get employeePosts() {
    return this._employeePosts;
  }
  _employeePosts: EmployeePost[] = [];
  employeePostsSearch: EmployeePost[] = [];
  searchVar;
  employeesToAdd: Employee[] = [];

  constructor() { }

  ngOnInit() {
    this.employeePostsSearch = this._employeePosts;
  }

}
