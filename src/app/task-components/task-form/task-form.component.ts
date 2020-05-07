import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../models/task';
import {Project} from '../../models/project';
import {MatDialog} from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ThemeService } from '../../theme.service';


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
  
  theme:string;
  
  constructor(private taskService:TaskService, public dialog: MatDialog, private themeService: ThemeService) {
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
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data:{taskEdit: this.task},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.save(result).subscribe(() => {
        this.taskList.reloadAll();
        this.clear();});
        
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
  