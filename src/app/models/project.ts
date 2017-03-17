import { Client } from './client';
import { Employee } from './employee';
import { Category, CategoryGetOne } from './category';
import { Member } from './member';
import { User } from './user';
import { Role } from './role';

export class MemberRole {
    member_id: number;
    id: number;
    is_pm: boolean;
}

export class MemberCat {
    member_id: number;
}

export class MemberCatList {
    memberCats: MemberCat[] = [];
}

export class NewCategory {
    id: number = null;
    category_name: string;
    name: string;
    members: MemberCat[] = [];
    member_ids: number[] = [];
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

export class Project {
    name: string;
    client_id: number;
    background: string;
    is_member_report: boolean;
    tasks: string[] = [];

    member_roles: MemberRole[] = [];
    category_members: NewCategory[];

    members: MemberRole[] = [];
    categories: NewCategory[] = [];

}

export class ProjectDefault {
    name: string;
    client_id: number;
    background: string;
    is_member_report: boolean;
    members_id: number;
    id: number;
    is_archived: boolean;
}

// using for load all project from api
export class ProjectGetAll {
    id: number;
    name: string;
    background: string;
    client: Client;
    members: Member[];
    tracked_time: number;
}

// using for load one project from api
export class ProjectGetOne {
    id: number;
    name: string;
    background: string;
    client: Client;
    members: Member[];
    tracked_time: number;
    categories: CategoryGetOne[];
    is_member_report: boolean;
}

export class ProjectPost {
    project: Project;
}
