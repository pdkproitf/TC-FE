import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateToStringWeekDay'
})
export class DateToStringWeekDayPipe implements PipeTransform {
    weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    transform(value: any): string {
        let date = new Date(value);
        let res = '';
        res += this.weekdays[date.getDay()] + ' ';
        res += date.getDate().toString() + '/';
        let month = (date.getMonth() < 10) ? '0' + date.getMonth().toString() : date.getMonth().toString();
        res += month + '/';
        res += date.getFullYear();
        return res;
    }
}
