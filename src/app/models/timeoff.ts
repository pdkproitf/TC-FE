import { Member }   from './member'
export class TimeOff{
    id: number;
    sender: Member;
    start_date: Date;
    end_date: Date;
    is_start_half_day: boolean;
    is_end_half_day: boolean;
    description: string;
    created_at: Date;
    updated_at: Date;
    approver: Member;
    sender_id: number
    approver_messages: string;
    status: string;
    future_dayoff: number;
    nearest_future_dateoff: Date;
    furlough_total: number;
}

export class TimeOffPost{
    timeoff: TimeOff;
    constructor(timeoff: TimeOff){
        this.timeoff = timeoff;
    }
}

export class TimeOffGetAll{
    off_requests: TimeOff[];
    pending_requests: TimeOff[];
    constructor(){
        this.off_requests = [];
        this.pending_requests = [];
    }
}

export class TimeOffAnswer{
    answer_timeoff_request: {
        status: string;
        approver_messages: string;
    }
    constructor(){
        this.answer_timeoff_request = {
            status: '',
            approver_messages: ''
        };
    }
}

export class PersonNumTimeOff{
    total: number;
    offed: number;
    approver: string[];
    constructor(){
        this.total = 0;
        this.offed = 0;
    }
}
export class TimeOffArray{
    timeoffs: TimeOff[] = [
        // {
        //     id: 1,
        //     sender_id: 1,
        //     start_date: new Date('Wed Feb 22 2017'),
        //     end_date: new Date(),
        //     is_start_half_day: true,
        //     is_end_half_day: true,
        //     description:    "Dear Mr. Smith, At the current time, all of my work is completed. I will also make sure that all pending." +
        //                     "We will use a lot of white space and thin line icon. It will attract user’s attention to conten." +
        //                     "Dear Mr. Smith, At the current time, all of my work is completed. I will also make sure that all pending." +
        //                     "We will use a lot of white space and thin line icon. It will attract user’s attention to conten." +
        //                     "Dear Mr. Smith, At the current time, all of my work is completed. I will also make sure that all pending." +
        //                     "We will use a lot of white space and thin line icon. It will attract user’s attention to conten.",
        //     create_at: new Date('Wed Feb 22 2017 00:00:00 GMT+0700 (ICT)'),
        //     update_at: new Date('Wed Feb 22 2017 00:00:00 GMT+0700 (ICT)'),
        //     approver_id: null,
        //     is_approved: false,
        //     total_day: 3
        // },
        // {
        //     id: 1,
        //     sender_id: 1,
        //     start_date: new Date('Fri Mar 17 2017 00:00:00 GMT+0700 (ICT)'),
        //     end_date: new Date('Wed Mar 21 2017 00:00:00 GMT+0700 (ICT)'),
        //     is_start_half_day: true,
        //     is_end_half_day: true,
        //     description:    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        //                     "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
        //                     "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
        //                     "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //     create_at: new Date('Wed Feb 21 2016 00:00:00 GMT+0700 (ICT)'),
        //     update_at: new Date(),
        //     approver_id: null,
        //     is_approved: true,
        //     total_day: 3
        // },
        // {
        //     id: 1,
        //     sender_id: 1,
        //     start_date: new Date('Wed Feb 20 2017 00:00:00 GMT+0700 (ICT)'),
        //     end_date: new Date(),
        //     is_start_half_day: true,
        //     is_end_half_day: true,
        //     description:    "Dear Mr. Smith, At the current time, all of my work is completed. I will also make sure that all pending." +
        //                     "We will use a lot of white space and thin line icon. It will attract user’s attention to conten." +
        //                     "Dear Mr. Smith, At the current time, all of my work is completed. I will also make sure that all pending." +
        //                     "We will use a lot of white space and thin line icon. It will attract user’s attention to conten." +
        //                     "Dear Mr. Smith, At the current time, all of my work is completed. I will also make sure that all pending." +
        //                     "We will use a lot of white space and thin line icon. It will attract user’s attention to conten.",
        //     create_at: new Date('Wed Jan 20 2017 00:00:00 GMT+0700 (ICT)'),
        //     update_at: null,
        //     approver_id: null,
        //     is_approved: false,
        //     total_day: 3
        // }
    ];
}
