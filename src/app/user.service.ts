import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId:number;
  
  login(user: User){
    return this.http.get<number>('/user/login?user=' + user.username + '&password=' + user.password)
  }
  
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<User[]>  {
    return this.http.get<any>('/user')
  }
  
  save(user: User) {
    return this.http.post('/user', user)
  }
  
  delete(id) {
    return this.http.delete('/user/' + id)
  }
  
  //to edit the listing.
  patchUser(id:number, user:User){
    return this.http.patch('/user/' + id, user)
  }
}
