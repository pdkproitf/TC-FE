import { Client } from './client';
import { Employee } from './employee';

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

export class ProjectRecieve {
    default: ProjectDefault;
    client: Client;
    tracked_time: Number;
    members: Employee[];
}

export class ProjectPost {
    project: Project;
}
