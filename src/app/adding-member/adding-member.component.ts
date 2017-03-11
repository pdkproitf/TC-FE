import { MemberCat } from './../models/project';
import { Member } from './../models/member';
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
  all: boolean = false;
  _existingMembers: Member[] = [];
  _existingSize: number;
  @Input()
  set existingMembers(para){
    this._existingMembers = para;
    this.fetchExistingMembers();
  }
  get existingMembers() {
    return this._existingMembers;
  }
  @Input()
  set existingSize(para){
    this._existingSize = para;
    this.fetchExistingMembers();
  }
  get existingSize() {
    return this._existingSize;
  }
  @Input()
  set employeePosts(para){
    this._employeePosts = para;
    this.employeePostsSearch = this._employeePosts;
  }
  get employeePosts() {
    return this._employeePosts;
  }
  _employeePosts: Member[] = [];
  _size: Number;
  @Input()
  set size(para) {
    this._size = para;
    for (let emp of this.employees) {
      let i = this.employeePostsSearch.indexOf(emp);
      if (i < 0) {
        let j = this.employees.indexOf(emp);
        if (j > -1) {
          //this.employees.splice(j, 1);
          this.removeEmployee(emp);
        }
      }
    }
    if (this.all) {
      for (let em of this.employeePostsSearch) {
        this.addEmployee(em);
      }
    }
    this.fetchExistingMembers();
  }
  get size() {
    return this._size;
  }
  @Output()
  onAdd = new EventEmitter<MemberCat>();
  @Output()
  onDelete = new EventEmitter<Number>();
  employeePostsSearch: Member[] = [];
  searchVar;
  employees: Member[] = [];

  constructor() { }

  ngOnInit() {
    this.employeePostsSearch = this._employeePosts;
    this.fetchExistingMembers();
  }

  fetchExistingMembers() {
    this.employees = [];
    if (this.existingMembers.length > 0) {
      for (let mem0 of this.existingMembers){
        for (let mem of this.employeePosts) {
          if (mem.id === mem0.id) {
            this.addEmployee(mem);
          }
        }
      }
    }
  }

  addEmployee(employee) {
    if (this.employees.indexOf(employee) < 0) {
      this.employees.push(employee);
      let member = new MemberCat;
      member.member_id = employee.id;
      this.onAdd.emit(member);
    }
  }

  removeEmployee(emp) {
    if (!this.all) {
      let i = this.employees.indexOf(emp);
      if (i > -1) {
        this.employees.splice(i, 1);
        this.onDelete.emit(emp);
      }
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
      if ( obj.user.first_name.indexOf(key) > -1 || obj.user.last_name.indexOf(key) > -1) {
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

  checkAll(arg) {
    this.all = arg;
    if (this.all) {
      for (let em of this.employeePostsSearch) {
        this.addEmployee(em);
      }
    }
  }
}
