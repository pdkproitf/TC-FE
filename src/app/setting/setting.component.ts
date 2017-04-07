import { CompanyService } from './../services/company-service';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  msgs: Message[] = [];
  name: string = '';
  beginWeek: number = 0;
  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompany()
    .then(res => {
      console.log(res);
      this.name = res.name;
      this.beginWeek = res.begin_week;
    })
    .catch(error => {
      console.log(error);
      let content = JSON.parse(error['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }

  submitEditCompany() {
    let companyPut = {
      company:{
        name: this.name,
        begin_week: this.beginWeek
      }
    };
    this.companyService.putCompany(companyPut)
    .then(res => {
      console.log(res);
      let content = 'Edited Company';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
    })
    .catch(error => {
      console.log(error);
      let content = JSON.parse(error['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }
}
