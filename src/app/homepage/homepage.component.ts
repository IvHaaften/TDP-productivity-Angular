import { Component, OnInit, OnDestroy } from '@angular/core';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  LoginId: number   // deze moet via een service naar alle andere componenten.

  

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
  } 

  ngOnDestroy(){
      this.loginService.globalLoginId = this.LoginId;
  }

}
