import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from './task';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<Task[]>  {
    return this.http.get<any>('http://localhost:8080/task')
  }
  
  save(task: Task) {
    return this.http.post('http://localhost:8080/task', task)
  }
  
  delete(id) {
    return this.http.delete('http://localhost:8080/task/' + id)
  }
  
  //to edit the listing.
  patchTask(id:number, task:Task){
    return this.http.patch('http://localhost:8080/task/' + id, task)
  }
  
}
