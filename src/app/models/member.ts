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


