import { User } from './user';

export class Project {

    id:number=0;
    projectName: string;
    deadline: Date;
    duration: Date;
    users: User[];
    /* tasks: Task[];
    */
}
