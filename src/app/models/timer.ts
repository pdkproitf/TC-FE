import { CategoryAdvance }  from './category'
import { CategoryMember }   from './category-member'
import { TaskAdvance }      from './task'
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

export class TimerAdvance {
    id: Number;
    start_time: string;
    stop_time: string;
    tracked_time: number;
    task: TaskAdvance;
    category_member:CategoryMember;
    category: CategoryAdvance;
}
