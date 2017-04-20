import { Job } from './job';
class Company {
    domain: string;
    id: number;
    name: string;
}
class RoleMember {
    name: string;
    id: number;
}
class UserMember {
    email: string;
    first_name: string;
    id: number;
    image: string;
    last_name: string;
}
export class Member {
    company: Company;
    total_day_off: number;
    id: number;
    role: RoleMember;
    user: UserMember;
    is_pm: boolean;
    jobs: Job[];
}

export class MemberTrackTime {
    company: Company;
    total_day_off: number;
    id: number;
    role: RoleMember;
    user: UserMember;
    is_pm: boolean = false;
    category_member_id: number = 0;
    tracked_time: number = 0;
    constructor(member: Member) {
        this.company = member.company;
        this.total_day_off = member.total_day_off;
        this.id = member.id;
        this.role = member.role;
        this.user = member.user;
    }
}
