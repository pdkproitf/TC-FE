import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'dateToMDY'
})
export class DateToMDYPipe implements PipeTransform {
    months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    transform(date: string): string {
        let dateInfos = date.split('-');
        let res = '';
        res = this.months[parseInt(dateInfos[1], 10)] + ' '
        + dateInfos[2] + ' ' + dateInfos[0];
        return res;
    }
}
