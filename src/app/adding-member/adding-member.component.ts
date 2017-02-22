import { Member } from './../models/project';
import { EmployeePost, Employee } from './../models/employee';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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
  _employeePosts: Employee[] = [];
  _size: Number;
  @Input()
  set size(para) {
    this._size = para;
    for (let emp of this.employees) {
      let i = this.employeePostsSearch.indexOf(emp);
      if (i < 0) {
        this.removeEmployee(emp);
      }
    }
  }
  get size() {
    return this._size;
  }
  @Output()
  onAdd = new EventEmitter<Member>();
  @Output()
  onDelete = new EventEmitter<Number>();
  employeePostsSearch: Employee[] = [];
  searchVar;
  employees: Employee[] = [];

  constructor() { }

  ngOnInit() {
    this.employeePostsSearch = this._employeePosts;
  }

  addEmployee(employee: Employee) {
    if (this.employees.indexOf(employee) < 0) {
      this.employees.push(employee);
      let member = new Member;
      member.user_id = employee.id;
      this.onAdd.emit(member);
    }
  }

  removeEmployee(emp) {
    let i = this.employees.indexOf(emp);
    if (i > -1) {
      this.employees.splice(i, 1);
    }
  }

  keyUpSearch() {
    clearTimeout(this.searchVar);
    this.searchVar = setTimeout(() => {
      this.updateEmployeePostsSearch();
    }, 2000);
  }

  updateEmployeePostsSearch() {
    let key = this.searchName;
    let len = this.employeePosts.length;
    this.employeePostsSearch = [];
    console.log(key);
    for (let i = 0; i < len; i++) {
      let obj = this.employeePosts[i];
      if ( obj.first_name.indexOf(key) > -1 || obj.last_name.indexOf(key) > -1) {
        this.employeePostsSearch.push(obj);
      }
    }
  }

  displayDiv() {
    this.classDiv = 'member-to-add';
    this.searchName = '';
  }

  undisplayDiv() {
    this.classDiv = 'hidden';
    this.searchName = 'Add more people...';
    this.employeePostsSearch = this.employeePosts;
  }

  printSmth() {
    console.log('affected');
  }
}
