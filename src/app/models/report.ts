import { ProjectGetOne } from './project';
import { Member } from './member';
export class Report {
    people: Member[] = [];
    projects: ProjectGetOne[] = [];
}
