import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { Observable } from 'rxjs/';
import {TaskFormComponent} from './task-components/task-form/task-form.component';
import {TaskService} from './task.service';
import {Task} from './task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TDP-productivity-Angular';

  user: number;


  //projectIdUser: number;
  LoginId: number;


  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }




/*
  setUserID(value): void {
    this.user = value;
}
*/
}
