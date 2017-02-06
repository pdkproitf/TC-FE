export class User {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export class UserPost {
    user: User;
}