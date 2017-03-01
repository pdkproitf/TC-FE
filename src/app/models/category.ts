import { Member } from './member';
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
}

export class CategoryPost {
    category: Category;
}

export class CategoryTrackedTime {
    category: Category;
    tracked_time: number;
}
