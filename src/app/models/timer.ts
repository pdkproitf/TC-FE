export class Timer {
    task_id: Number;
    task_name: string;
    project_category_user_id: Number;
    start_time: string;
    stop_time: string;
}

export class TimerPost {
    timer: Timer;
}
