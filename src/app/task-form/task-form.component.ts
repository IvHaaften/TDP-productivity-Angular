import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../task';
import {Project} from '../project';
import {MatDialog} from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [TaskService]
})
export class TaskFormComponent implements OnInit {
  
  @Input()
  taskList:TaskListComponent;
  
  minDate: Date;
  
  task = new Task();
  
  constructor(private taskService:TaskService, public dialog: MatDialog) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate; 
  }
  
  ngOnInit() {
    this.task.project = new Project();
  }
  
  public save(){
    this.taskService.save(this.task).subscribe(() => this.taskList.reloadAll());
  }
  
  newTask() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data:{taskEdit: this.task}
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.save(result).subscribe(() => this.taskList.reloadAll());
      this.clear();
    })
  }

  clear(){
    this.task.name = "";
    this.task.project = new Project;
    this.task.duration = null; 
    this.task.description = "";
    this.task.deadline = null;
  }

}
