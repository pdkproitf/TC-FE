import { Pipe, PipeTransform } from '@angular/core';

//input num of seconds -> out put is timeformat hh:mm
//show project tracked_time:  {{project_category.tracked_time | timeFromSeconds}}

@Pipe({
    name: 'timeFromSeconds'
})
export class TimeFromSecondsPipe implements PipeTransform {
    times = {
        hour: 3600,
        minute: 60,
    }
    transform(seconds: number): string {
        var h = Math.floor(seconds/3600);
        var m = Math.floor((seconds%(3600))/60);
        var time = '';

        time += (h < 10)?  ('0' + h) : ('' + h);

        time += (m < 10)? (':0' + m) : (':' + m);

        return time;
    }
}
