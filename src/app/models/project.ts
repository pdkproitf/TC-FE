import { Client } from './client';
import { Employee } from './employee';
import { Category } from './category';
import { User } from './user';
import { Role } from './role';

export class MemberRole {
    member_id: number;
    is_pm: boolean;
}

export class MemberCat {
    member_id: number;
}

export class MemberCatList {
    memberCats: MemberCat[] = [];
}

export class NewCategory {
    category_name: string;
    members: MemberCat[] = [];
    is_billable: boolean;
}

export class ProjectCategoryMember {
    user: User;
    roles: Role[];
    tracked_time: number;
}

export class ProjectCategory {
    id: number;
    category: Category;
    memberList: ProjectCategoryMember[];
    tracked_time: number;
}

export class ProjectDefault {
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
    is_member_report: boolean;
    tasks: string[] = [];
    member_roles: MemberRole[] = [];
    category_members: NewCategory[];
}

// using for load all project from api
export class ProjectGetAll {
    default: ProjectDefault;
    client: Client;
    tracked_time: number;
    members: Employee[];
}

export class ProjectGetOne {
    default: ProjectDefault;
    client: Client;
    tracked_time: number;
    project_category: ProjectCategory[];
}

export class ProjectPost {
    project: Project;
}
