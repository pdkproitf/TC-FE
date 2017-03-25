import { MemberTrackTime, Member } from './member';
import { TaskAdvance } from './task';

export class Category {
    id: number;
    name: string;
    category_member_id: number;
}

export class CategoryGetOne {
    id: number;
    name: string;
    category_member_id: number;
    members: Member[];
    is_billable: boolean;
}

export class CategoryPost {
    category: Category;
}

export class CategoryTrackedTime {
    category: Category;
    tracked_time: number;
}

export class CategoryAdvance {
    id: number;
    name: string;
    tracked_time: number;
    is_billable: boolean;
}
