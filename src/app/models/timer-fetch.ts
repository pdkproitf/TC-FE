export class TimerFetch {
    id: number;
    task: Task;
    start_time: Date;
    stop_time: Date;
    task_name: string;
    category_member_id: number;
    project_name: string;
    category_name: string;
    background: string;
}

export class Task {
    id: number;
    name: string;
}
