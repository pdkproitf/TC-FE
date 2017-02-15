import { Client } from './client';
import { Employee } from './employee';
import { Category } from './category';
import { User } from './user';

export class MemberRole {
    user_id: number;
    role_id: number;
}

export class Member {
    user_id: number;
}

export class MemberList {
    members: Member[] = [];
}

export class ExistingCategory {
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
    existing: ExistingCategory[] = [];
    new_one: NewCategory[] = [];
}

export class ProjectCategory{
    id: number;
    category: Category;
    memberList: User[];
}

export class ProjectDefault{
    id: number;
    name: string;
    background: string;
    report_permission: number;
    tasks: string[] = [];
}

export class Project {
    name: string;
    client_id: number;
    background: string;
    report_permission: number;
    tasks: string[] = [];
    member_roles: MemberRole[] = [];
    category_members: CategoryMembers = new CategoryMembers();
}

// using for load all project from api
export class ProjectGetAll {
    default: ProjectDefault;
    client: Client;
    tracked_time: Number;
    members: Employee[];
}

export class ProjectGetOne {
    default: ProjectDefault;
    client: Client;
    tracked_time: Number;
    project_category: ProjectCategory[];
}

export class ProjectPost {
    project: Project;
}
