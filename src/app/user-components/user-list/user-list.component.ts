import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';
import { AppComponent } from 'src/app/app.component';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  @Input()
  appGlobal:AppComponent
  
  users:User[];
  
  
  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
    this.reloadAll();   
  }
  reloadAll() {
    this.userService.findAll().subscribe(users=> this.users = users);
  }
  
  delete(id: number) {
    this.userService.delete(id).subscribe(
      () => this.reloadAll()
      );
    }
    
    project: number=0;
    
    setUserProject(value): void {
      this.project = value;
      //this.appGlobal.projectIdUser = value;
    }
    
  }
  