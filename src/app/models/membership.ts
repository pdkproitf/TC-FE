export class Membership {
    email: string;
}

export class MembershipPost {
    membership: Membership;
}

export class MembershipConfirm {
    email: string;
    token: string;
}
