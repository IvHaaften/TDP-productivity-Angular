import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  user: number;

  projectIdUser: number;

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.projectIdUser = this.loginService.globalLoginId
  }

}
