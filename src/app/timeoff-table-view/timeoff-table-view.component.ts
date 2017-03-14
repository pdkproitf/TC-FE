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

    // constraint list timeoffs of each member
    hash_timeoff: Map<Number, Array<TimeOff>>;
    // hash constraint member_id and day to get class for table cel
    hash_member_day_status: Map<string, string>;

    distionary_member: Array<Member>;
    list_members: Array<Member>;

    @Input()
    set startDay(date: Date){
        this.start_date = date;
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
        this.hash_member_day_status  = new Map<string, string>();
        this.distionary_member  = [];
        this.list_members  = [];

        this.getTimeOff();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['startDay'] || changes['endDay']) this.ngOnInit();
    }

    getTimeOff(){
        this.timeoffService.getPhaseTimeOffsMemberOrdinal(this.start_date, this.end_date).then(
            (result) => {
                this.distionary_member = result.members;

                for(var i = 0; i < result.timeoffs.length; i++){
                    this.hash_timeoff.set(result.members[i].id, result.timeoffs[i])
                }

                (this.selectedValues.length > 0)? this.initializeSelectedValues(): (this.searchPattern.length > 0)? this.initializeSearchValues():this.initializeAllValues();
                this.initializeHashMemberDayStatus();
            },
            (error) => {
                console.log('error');
            }
        )
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

    initializeHashMemberDayStatus(){
        this.hash_member_day_status = new Map<string, string>();
        for (let member of this.distionary_member){
            for(let day of this.days){
                this.hash_member_day_status.set(member.id+'-'+day.getDate(), this.computeClassDayCel(day, member.id));
            }
        }
    }

    computeClassDayCel(_day: Date, id: number){
        var status = "cel-";
        if(this.isWeekend(_day))
        return 'cel-weekend'
        var day = _day.getTime();
        for (let timeoff of this.hash_timeoff.get(id)) {
            var start_date = new Date(timeoff.start_date.toString());
            var end_date = new Date(timeoff.end_date.toString());
            // console.log('id', id, 'day', _day, 'start_date', timeoff.start_date, 'end_date', timeoff.end_date, 'status ** ** ', timeoff.status, 'compare', (start_date <= day && day <= end_date))
            // console.log('id', id, 'day', day, 'start_date', start_date, 'end_date', end_date, 'status ** ** ', timeoff.status, 'compare', (start_date <= day && day <= end_date))

            if(start_date <= _day && _day <= end_date && timeoff.status != 'rejected'){
                // console.log('status', timeoff.status)
                status += timeoff.status;
                return status;
            }
        }
        return status;
    }

    isWeekend(day: Date){
        return (day.getDay()%6 == 0)
    }

    ableToModify(string: string){
        var status = this.hash_member_day_status.get(string);
        if(status == 'cel-pending' || status == 'cel-approved')
            return true;
        return false;
    }

    getmemberStatus(id: number){
        for (var day of this.days){
            var status = this.hash_member_day_status.get(id+'-'+day.getDate());
            if(status == 'cel-pending' || status == 'cel-approved')
                return status.slice(4, status.length);
        }
        return '';
    }

    checked(arg, id) {
        console.log(this.selectedValues);
        (this.selectedValues.length > 0)? $('.messages').css({'display': 'block'}) : $('.messages').css({'display': 'none'});
    }

    search(){
        this.list_members = [];
        this.initializeSearchValues();
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

    answerTimeoff(id: number, day: Date){
        console.log('answer id ', id, 'day', day);
    }
}
