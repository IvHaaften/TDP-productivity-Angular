import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from './models/project';
import { ProjectUser } from './models/projectuser';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }


  findAll(): Observable<Project[]>  {
    return this.http.get<any>('/project')
  }

  save(projectUser: ProjectUser) {
    return this.http.post('/project', projectUser)
  }

  delete(id:number) {
    return this.http.delete('/project/' + id)
  }

  //to edit the listing.
  patchProject(id:number, projectUser:ProjectUser){
    return this.http.patch('/project/' + id, projectUser)
  }

}
