import { Holiday, HolidaySchedule, HolidayPost } from '../models/holiday';
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

    constructor(private holidayService: HolidayService, private cd: ChangeDetectorRef) {
        holidayService.gets().then(
            (result) => {
                result.data.forEach((holiday) => {
                    this.holidays.push(this.convertToHolidaySchedule(holiday));
                })
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    ngOnInit() {
        this.headerConfig = {
            left: 'prev today',
            center: 'title',
            right: 'next'
        };
        this.holiday = new HolidaySchedule();
    }

    handleDayClick(event) {
        this.holiday = new HolidaySchedule();
        this.holiday.start = event.date._d;
        this.holiday.end = event.date._d;
        this.showDialog();
    }

    handleEventClick(event){
        this.initCurrentDate(event.calEvent);
        this.showDialog();
    }

    onEventDragStop($event) {
        setTimeout(()=> {
            this.initCurrentDate($event.event);
            this.edit();
        }, 500);
    }

    onEventResizeStop(event){
        this.initCurrentDate(event.event);
    }

    showDialog(show: boolean = true){
        this.dialogVisible = show;
    }

    saveEvent(){
        (this.holiday.id)? this.edit() : this.create();
        this.showDialog(false);
    }

    deleteEvent(){
        if(this.holiday.id) this.delete();
        this.showDialog(false);
    }

    create(){
        this.holidayService.create(this.getHolidayPost()).then(
            (result) => {
                this.holidays.push(this.convertToHolidaySchedule(result.data));
                this.noticeMessage('Create ' + result['status'] , true)
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    edit(){
        this.holidayService.update(this.getHolidayPost()).then(
            (result) => {
                this.noticeMessage('Update ' + result['status'] , true);
                this.deleteElement(this.holiday.id);
                this.holidays.push(this.convertToHolidaySchedule(result.data));
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    delete(){
        this.holidayService.delete(this.holiday.id).then(
            (result) => {
                this.deleteElement(this.holiday.id);
                this.noticeMessage('Delete ' + result['status'] , true)
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    convertToHolidaySchedule(object: Object): HolidaySchedule{
        var holiday: HolidaySchedule = new HolidaySchedule();
        holiday.id = object['id'];
        holiday.title = object['name'];
        holiday.start = this.convertdateToString(new Date(object['begin_date']));
        holiday.end = this.convertdateToString(new Date(object['end_date']));

        return holiday;
    }

    getHolidayPost(){
        var holidayPost = new HolidayPost();
        holidayPost.holiday = this.getHoliday();
        return holidayPost;
    }

    getHoliday(){
        var data = new Holiday();
        data.id = this.holiday.id;
        data.name = this.holiday.title;
        data.begin_date = new Date(this.holiday.start);
        data.end_date = new Date(this.holiday.end);
        return data;
    }

    initCurrentDate(event){
        this.holiday.id = event.id;
        this.holiday.title = event.title;
        this.holiday.start = event.start._d;
        this.holiday.end = event._end == null ? event.start._d : event.end._d;
    }

    findEvent(id){
        this.holiday = this.holidays.find(x => x.id == id)
    }

    convertdateToString(date: Date){
        var year = date.getFullYear();
        var month = date.getUTCMonth() > 9 ? (date.getUTCMonth() + 1) : '0' + (date.getUTCMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        return year + '-' + month + '-' + day + 'T16:00:00';
        // return date;
    }

    deleteElement(id: number){
        var index = this.holidays.findIndex(x => x.id == id);
        this.holidays.splice(index, 1);
    }

    noticeMessage(content: string, is_error: boolean = false){
        this.msgs = [];
        is_error?
            this.msgs.push({severity: 'success', summary: 'Success Message', detail: content}) :
            this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content})
    }
}
