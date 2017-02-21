import { Pipe, PipeTransform } from '@angular/core';

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

        if(h < 10) time += '0'+h;
        else time += ''+h;

        if(m < 10) time += ':0'+m;
        else time += ':' + m;

        return time;
    }

}
