export class Employee {
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    image: string;
    last_name: string;
    provider: string;
    uid: string;
    update_at: string;
}

export class EmployeePost {
    employee: Employee;
}
