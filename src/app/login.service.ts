import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  globalLoginId: number;

  _login = new Subject<boolean>();
  isLogin = this._login.asObservable();

  setLogin() {
    this._login.next(this.globalLoginId != null && this.globalLoginId >=0);
  }

  getLogin(): Observable<boolean>{
    return this.isLogin
  }


//stuk aangaande de select button update

  private subject = new Subject<any>();

  sendProject(projNum: number) {
    this.subject.next({projNum: projNum})
  }

  getProject(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
