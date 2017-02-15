export class Category {
    id: number;
    name: string;
    pcu_id: number;
}

export class CategoryPost {
    category: Category;
}
