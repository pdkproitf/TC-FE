import { Timer }    from './timer'

export class Task {
    id: number;
    name: string;
    project_name: string;
    category_name: string;
    background: string;
    last_stop_time: string;
    category_member_id: number;
}

export class TaskAdvance {
    id: number;
    name: string;
    tracked_time: number;
}
