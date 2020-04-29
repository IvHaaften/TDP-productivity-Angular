import {Project} from './project';

export class Task{
    id: number =0;
    name: string;
    duration: number;
    description: string;
    deadline: Date;
    status: number=0;
    project: Project;
}