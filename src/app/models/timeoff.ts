export class TimeOff {
    start_date: string;
    end_date: string;
    is_start_half_day: boolean;
    is_end_half_day: boolean;
    description: string;
    create_at: string;
    update_at: string;
}

export class TimeOffPost{
    timeoff: TimeOff;
    constructor(timeoff: TimeOff){
        this.timeoff = timeoff;
    }
}
