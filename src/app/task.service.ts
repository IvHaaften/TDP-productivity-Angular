import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from './models/task';
import {Project} from './models/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<Task[]>  {
    return this.http.get<any>('/task')
  }
  
  save(task: Task) {
    return this.http.post('/task', task)
  }
  
  delete(id) {
    return this.http.delete('/task/' + id)
  }
  
  //to edit the listing.
  patchTask(id:number, task:Task){
    task.project.users=null;
    return this.http.patch('/task/' + id, task)

  }
  
}
