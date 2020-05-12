import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ProjectUser } from './models/projectuser';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<ProjectUser[]>  {
    return this.http.get<any>('http://localhost:8080/projectuser')
  }

  save(projectUser: ProjectUser) {
    return this.http.post('http://localhost:8080/projectuser', projectUser)
  }

  delete(id:number) {
    return this.http.delete('http://localhost:8080/projectuser/' + id)
  }

  //to edit the listing.
  patchProject(id:number, projectUser:ProjectUser){
    return this.http.patch('http://localhost:8080/projectuser/' + id, projectUser)
  }
}
