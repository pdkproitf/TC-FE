export class Timer {
    task_id: Number;
    task_name: string;
    category_member_id: Number;
    start_time: string;
    stop_time: string;
}

export class TimerPost {
    timer: Timer;
}

export class TimerPut {
    timer_update: Timer;
}
