import { Holiday, HolidaySchedule } from '../models/holiday';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { HolidayService }    from './../services/holiday-service';
import { Message }           from 'primeng/primeng';

@Component({
    selector: 'app-manage-holiday',
    templateUrl: './manage-holiday.component.html',
    styleUrls: ['./manage-holiday.component.scss']
})
export class ManageHolidayComponent implements OnInit {
    events: any[];
    headerConfig: any;
    dialogVisible: boolean = false;
    holidays: HolidaySchedule[] = [];
    holiday: HolidaySchedule;
    msgs: Message[] = [];

    constructor(private holidayService: HolidayService) {
        holidayService.getHolidays().then(
            (result) => {
                result.data.forEach((holiday) => {
                    this.holidays.push(this.getHoliday(holiday));
                })
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    ngOnInit() {

        this.events = [
            {
                'id':  1,
                "title": "All Day Event",
                "start": "2017-04-01",
                "end": "2017-0430"
            },
            {
                'id':  2,
                "title": "Long Event",
                "start": "2017-04-07",
                "end": "2017-04-10"
            },
            {
                'id':  3,
                "title": "Repeating Event",
                "start": "2017-04-09T16:00:00",
                "end": "2017-04-09T16:00:00"
            },
            {
                'id':  4,
                "title": "Repeating Event",
                "start": "2017-04-16T16:00:00",
                "end": "2017-04-16T16:00:00"
            },
            {
                'id':  5,
                "title": "Conference",
                "start": "2017-04-11",
                "end": "2017-04-13"
            }
        ];

        this.headerConfig = {
            left: 'prev today',
            center: 'title',
            right: 'next'
        };
        this.holiday = new HolidaySchedule();

    }

    handleDayClick(event) {
        console.log('onEventDragStop holiday', this.holiday.end);
        this.holiday = new HolidaySchedule();
        this.showDialog();
    }

    handleEventClick(event){
        this.initCurrentDate(event.calEvent);
        console.log('handleEventClick', event);
        // this.event.id = event.calEvent.id;
        // this.event.title = event.calEvent.title;
        // this.event.start = event.calEvent.start._d;
        // this.event.end = event.calEvent.end._d;
        this.showDialog();
    }

    onEventDragStop(event) {
        this.initCurrentDate(event.event);
        console.log('onEventDragStop holiday', this.holiday.end);
    }

    onEventResizeStop(event){
        this.initCurrentDate(event.event);
        console.log('onEventResizeStop event event', event.event._end);
    }

    showDialog(){
        this.dialogVisible = true;
    }

    deleteEvent(event){

    }

    saveEvent(event){
        event.prev();
    }

    getHoliday(object: Object): HolidaySchedule{
        var holiday: HolidaySchedule = new HolidaySchedule();
        holiday.id = object['id'];
        holiday.title = object['name'];
        holiday.start = this.convertdateToString(new Date(object['begin_date']));
        holiday.end = this.convertdateToString(new Date(object['end_date']));

        return holiday;
    }

    initCurrentDate(event){
        if(event){
            this.holiday.id = event.id;
            this.holiday.title = event.title;
            this.holiday.start = event._start._d;
            this.holiday.end = event._end._d;
            console.log('this.event', this.holiday);
        }
    }

    findEvent(id){
        this.holiday = this.holidays.find(x => x.id == id)
    }

    convertdateToString(date: Date){
        var year = date.getFullYear();
        var month = date.getUTCMonth() > 9 ? (date.getUTCMonth() + 1) : '0' + (date.getUTCMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        return year + '-' + month + '-' + day;
    }

    noticeMessage(content: string, is_error: boolean = true){
        this.msgs = [];
        is_error?
            this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content}) :
            this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: content})
    }
}
