export class Project {
    name: string;
    client_id: number;
    background: string;
    report_permission: number;
    tasks: string[];
}
export class ProjectPost {
    project: Project;
}
