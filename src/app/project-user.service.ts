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
    return this.http.get<any>('/projectuser')
  }

  save(projectUser: ProjectUser) {
    return this.http.post('/projectuser', projectUser)
  }

  delete(id:number) {
    return this.http.delete('/projectuser/' + id)
  }

  //to edit the listing.
  patchProject(id:number, projectUser:ProjectUser){
    return this.http.patch('/projectuser/' + id, projectUser)
  }
}
