import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { TimeoffService }       from '../services/timeoff-service';
import { TimeOff }              from '../models/timeoff';
import { Member }               from '../models/member';
declare var $ :any;

@Component({
    selector: 'app-timeoff-table-view',
    templateUrl: './timeoff-table-view.component.html',
    styleUrls: ['./timeoff-table-view.component.scss']
})
export class TimeoffTableViewComponent implements OnInit, OnChanges {
    days :Date[] = [];
    selectedValues: Number[] = [];
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
        var current_day ;
        for(var i = 0; i < 15; i++){
            current_day = new Date();
            current_day.setTime(this.start_date.getTime());
            current_day.setDate(this.start_date.getDate() + i);
            current_day = new Date(current_day.getFullYear(), current_day.getMonth(), current_day.getDate());
            this.days.push(current_day);
        }

        this.hash_timeoff = new Map<Number, Array<TimeOff>>();
        this.hash_created = new Map<Number, Map<Number, TimeOff>>();
        this.distionary_member  = [];
        this.list_members  = [];

        this.getTimeOff();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['startDay'] || changes['endDay']) this.ngOnInit();
    }

    checked(){
        (this.selectedValues.length > 0)? $('.messages').css({'display': 'block'}) : $('.messages').css({'display': 'none'});
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
                        temp = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
                        hash_created_timeoff.set(temp.getTime(), timeoff);
                        this.hash_created.set(member.id, hash_created_timeoff);
                    })
                });
                (this.selectedValues.length > 0)? this.initializeSelectedValues(): (this.searchPattern.length > 0)? this.initializeSearchValues():this.initializeAllValues();
            },
            (error) => {
                console.log('error');
            }
        )
    }

    search(){
        this.list_members = [];
        this.initializeSearchValues();
    }

    print(){
        this.days.forEach(day => console.log(day));
        this.distionary_member.forEach(member => {
        })
    }

    hidenMessage(){
        $('.messages').find('.action').css({'display': 'block'});
        $('.messages').find('.clear').css({'display': 'none'});
        $('.messages').css({'display': 'none'});
        this.searchPattern = '';
        this.selectedValues = [];
        this.list_members = this.distionary_member;
    }

    showSelected(){
        $('.messages').find('.action').css({'display': 'none'});
        $('.messages').find('.clear').css({'display': 'block'});
        this.initializeSelectedValues();
    }

    initializeAllValues(){
        this.list_members = this.distionary_member;
    }

    initializeSelectedValues(){
        this.list_members = [];
        for(var i = 0; i < this.selectedValues.length; i ++){
            for(var j = 0; j < this.distionary_member.length; j++){
                if(this.distionary_member[j].id == this.selectedValues[i]){
                    this.list_members.push(this.distionary_member[j]);
                    break;
                }
            }
        }
    }

    initializeSearchValues(){
        this.distionary_member.forEach((member) =>{
            var name = member.user.first_name + ' '+ member.user.last_name;
            if ((name.toUpperCase().indexOf(this.searchPattern.toUpperCase()) > -1) || (name.toLowerCase().indexOf(this.searchPattern.toLowerCase()) > -1)) {
                this.list_members.push(member);
            }
        })
    }

    answerTimeoff(timeoff: TimeOff){
        console.log('timeoff ', timeoff);
    }
}
