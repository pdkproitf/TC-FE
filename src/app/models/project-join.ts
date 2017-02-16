import { Category } from './category';
import { Client } from './client';
export class ProjectJoin {
    id: Number;
    name: string;
    background: string;
    client: Client;
    category: Category[] = [];
}
