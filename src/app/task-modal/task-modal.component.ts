import { Component, OnInit, Inject, Input} from '@angular/core';
import { Task } from '../task';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

    
  @Input()
  taskEdit: Task;

  minDate: Date;
  
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>,@Inject(MAT_DIALOG_DATA) public data: TaskModalData) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate;
  }

  ngOnInit(){}
}
