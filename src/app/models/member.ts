class Company {
    domain: string;
    id: number;
    name: string;
}
class RoleMember {
    name: string;
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
    furlough_total: number;
    id: number;
    role: RoleMember;
    user: UserMember;
    is_pm: boolean;
}

export class MemberTrackTime {
    company: Company;
    furlough_total: number;
    id: number;
    role: RoleMember;
    user: UserMember;
    is_pm: boolean = false;
    category_member_id: number = 0;
    tracked_time: number = 0;
    constructor(member: Member) {
        this.company = member.company;
        this.furlough_total = member.furlough_total;
        this.id = member.id;
        this.role = member.role;
        this.user = member.user;
    }
}
