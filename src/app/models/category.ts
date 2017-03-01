export class Category {
    id: number;
    name: string;
    category_member_id: number;
}

export class CategoryPost {
    category: Category;
}

export class CategoryTrackedTime {
    category: Category;
    tracked_time: number;
}
