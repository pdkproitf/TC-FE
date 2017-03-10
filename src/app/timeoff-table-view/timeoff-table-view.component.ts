import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { TimeoffService }       from '../services/timeoff-service';
import { TimeOff, TimeOffGetAll }   from '../models/timeoff';
import { Member }   from '../models/member';

@Component({
    selector: 'app-timeoff-table-view',
    templateUrl: './timeoff-table-view.component.html',
    styleUrls: ['./timeoff-table-view.component.scss']
})
export class TimeoffTableViewComponent implements OnInit, OnChanges {
    days :Date[] = [];
    selectedValues: string[] = [];
    searchPattern = '';
    start_date: Date;
    end_date: Date;

    hash_timeoff: Map<Number, Array<TimeOff>>;
    hash_created: Map<Number, Map<Number, TimeOff>>;

    distionary_member: Array<Member>;
    list_members: Array<Member>;

    @Input()
    set startDay(date: Date){
        this.start_date = date;
        console.log('startDay', date);
    }
    @Input()
    set endDay(date: Date){
        this.end_date = date;
    }

    constructor(private timeoffService :TimeoffService) {}

    ngOnInit() {
        this.days = [];
        var current_day = new Date();
        current_day.setDate(this.start_date.getDate());
        for(var i = 0; i < 15; i++){
            current_day = new Date();
            current_day.setDate(this.start_date.getDate() + i);
            current_day = new Date(current_day.getFullYear(), current_day.getMonth(), current_day.getDay());
            this.days.push(current_day);
        }

        this.hash_timeoff = new Map<Number, Array<TimeOff>>();
        this.hash_created = new Map<Number, Map<Number, TimeOff>>();
        this.distionary_member  = [];
        this.list_members  = [];
        this.getTimeOff();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('changes', changes);
        if(changes['startDay'] || changes['endDay']) this.ngOnInit();
    }

    showCheck(){
        console.log('checked', this.selectedValues);
    }

    getTimeOff(){
        this.timeoffService.getPhaseTimeOffsMemberOrdinal(this.start_date, this.end_date).then(
            (result) => {
                this.hash_timeoff = result.hash_timeoff;
                this.distionary_member = result.members;
                this.distionary_member.forEach(member =>{
                    var hash_created_timeoff = new Map<Number, TimeOff>();
                    this.hash_timeoff[member.id].forEach(timeoff =>{
                        var temp = new Date(timeoff.created_at);
                        temp = new Date(temp.getFullYear(), temp.getMonth(), temp.getDay());
                        hash_created_timeoff.set(temp.getTime(), timeoff);
                        this.hash_created.set(member.id, hash_created_timeoff);
                    })
                })
                this.print();
                this.list_members = this.distionary_member;
            },
            (error) => {
                console.log('error');
            }
        )
    }

    search(){
        console.log('vo day')
        this.list_members = [];
        this.distionary_member.forEach((member) =>{
            var name = member.user.first_name + ' '+ member.user.last_name;
            if ((name.toUpperCase().indexOf(this.searchPattern.toUpperCase()) > -1) || (name.toLowerCase().indexOf(this.searchPattern.toLowerCase()) > -1)) {
                this.list_members.push(member);
            }
        })
    }

    print(){
        this.days.forEach(day => console.log(day));
        this.distionary_member.forEach(member => {
            console.log('***************************');
            console.log('member', member.id);
            console.log('hash member', this.hash_created.get(member.id));
            // console.log('hash member', this.hash_created.get(member.id).get);
        })
    }
}
