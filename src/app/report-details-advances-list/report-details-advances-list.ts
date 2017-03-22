import { MemberTrackTime }   from '../models/member'
export class Project {
    id: Number;
    name: string;
    client: Client;
    members: MemberTrackTime[]; //constraint member id
    categories: Category[];
}

export class Client {
    id: number;
    name: string;
}

export class Category {
    id: number;
    name: string;
    category_members: CategoryMember[];
}

export class CategoryMember{
    member_id: number;
    tasks: Task;
}

export class Task{
    id: number;
    name: string;
    timers: Timer;
}

export class Timer {
    id: number;
    start_time: string;
    stop_time: string;
    tracked_time: number;
}
