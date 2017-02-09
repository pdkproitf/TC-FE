export class MemberRole {
    user_id: number;
    role_id: number;
}

export class Member {
    user_id: number;
}

export class Category {
    category_id: number;
    members: Member[] = [];
    billable: boolean;
}

export class NewCategory {
    category_name: string;
    members: Member[] = [];
    billable: boolean;
}

export class CategoryMembers {
    existing: Category[] = [];
    new_one: NewCategory[] = [];
}

export class Project {
    name: string;
    client_id: number;
    background: string;
    report_permission: number;
    tasks: string[] = [];
    member_roles: MemberRole[] = [];
    category_members: CategoryMembers;
}

export class ProjectPost {
    project: Project;
}
