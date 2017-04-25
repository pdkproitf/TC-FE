import { CompanyService } from '../../services/company-service';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-manage-company',
    templateUrl: './manage-company.component.html',
    styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {
    msgs: Message[] = [];
    name: string = '';
    domain: string = '';
    beginWeek: number = 0;
    incre_dayoff: number = 0;
    year_dayoffs: number = 0;

    constructor(private router: Router, private companyService: CompanyService, private location: Location) { }

    ngOnInit() {
        this.companyService.getCompany()
        .then(res => {
            console.log('company', res);
            this.name = res.name;
            this.beginWeek = res.begin_week;
            this.domain = res.domain;
            this.incre_dayoff = (res['incre_dayoff'])? 1 : 0;
            this.year_dayoffs = res.year_dayoffs
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
                begin_week: this.beginWeek,
                incre_dayoff: this.incre_dayoff == 1,
                year_dayoffs: this.year_dayoffs
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

    checkFunc(event) {
        console.log(event.target.defaultValue);
        this.beginWeek = event.target.defaultValue;
    }

    changecModeDayoff(event) {
        this.incre_dayoff = event.target.defaultValue;
    }

    cancel() {
        this.location.back();
    }

}
