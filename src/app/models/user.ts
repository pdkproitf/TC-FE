export class User {
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    id: Number;
}
export class UserPost {
    user: User;
}

export class UserTrackTime {
    user: User;
    tracked_time: number;
}
