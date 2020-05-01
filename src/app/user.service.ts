import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId:number;


  login(user: User){
    return this.http.get<number>('http://localhost:8080/user/login?user=' + user.username + '&password=' + user.password)
    console.log("log out:: user = " + user.username + ", password = " + user.password);
    
    
  }

  constructor(private http: HttpClient) { }

   findAll(): Observable<User[]>  {
    return this.http.get<any>('http://localhost:8080/user')
  }
  
  save(user: User) {
    return this.http.post('http://localhost:8080/user', user)
  }


  
  delete(id) {
    return this.http.delete('http://localhost:8080/user/' + id)
  }
  
  //to edit the listing.
  patchUser(id:number, user:User){
    return this.http.patch('http://localhost:8080/user/' + id, user)
  }
}
