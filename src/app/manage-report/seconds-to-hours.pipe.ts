import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'secondsToHours'
})
export class SecondsToHoursPipe implements PipeTransform {
    transform(seconds: number): any {
        let hours = seconds / 3600;
        hours = Math.round(hours * 100) / 100;
        return hours;
    }
}
