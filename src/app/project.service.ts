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
    return this.http.get<any>('http://localhost:8080/project')
  }

  save(projectUser: ProjectUser) {
    return this.http.post('http://localhost:8080/project', projectUser)
  }

  delete(id:number) {
    return this.http.delete('http://localhost:8080/project/' + id)
  }

  //to edit the listing.
  patchProject(id:number, project:Project){
    return this.http.patch('http://localhost:8080/project/' + id, project)
  }

}
