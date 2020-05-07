import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  globalLoginId: number;

  constructor() {
  }

  private subject = new Subject<any>();

  sendProject(projNum: number) {
    this.subject.next({projNum: projNum})
  }

  getProject(): Observable<any> {
    return this.subject.asObservable();
    console.log("printed get function in service");
  }
}
