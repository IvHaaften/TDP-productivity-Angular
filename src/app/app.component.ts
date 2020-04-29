import { Component } from '@angular/core';
import {TaskFormComponent} from './task-form/task-form.component';
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

  projectIdUser: number;

  


/*
  setUserID(value): void {
    this.user = value;
}
*/
}
