import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../task.service';
import { UserListComponent } from '../../user-components/user-list/user-list.component';

import {MatDialog} from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ThemeService } from '../../theme.service';
import { ProjectUserService } from 'src/app/project-user.service';

export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:  [TaskService]
})


export class TaskListComponent implements OnInit, AfterContentInit {
  userID: number;
  projectIDs : number[];
  tasks: Task[];
  theme:string;
  displayedColumns: string[] = ['id', 'name', 'project.id','project.projectName','duration','description','status', 'actions'];
  tempTask: Task;
  
  constructor(private taskService: TaskService, public dialog: MatDialog, private themeService: ThemeService, private projectUserService : ProjectUserService) {
    this.reloadAll();
  }
  
  ngOnInit() {
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    this.projectIDs;
    this.tasks;
    this.reloadAll();
  }
  
  ngAfterContentInit(){
    this.reloadAll();
  }
  
  reloadAll() {
    this.projectUserService.findAll().subscribe(projectUsers => {
      let filterP = new Array;
      for(let i=0; i<projectUsers.length; i++){
        if(projectUsers[i].user.id===this.userID){
          filterP.push(projectUsers[i].project.id);
        }
      }
      this.projectIDs = filterP;
      //filter all tasks to projects connected to the current user
      this.taskService.findAll().subscribe(tasks => {
        this.tasks=tasks;
        let filter = new Array;
        for (let i = 0; i < this.tasks.length; i++){
          if (this.projectIDs.includes(this.tasks[i].project.id)){
            filter.push(this.tasks[i]);
          }
        }
        this.tasks = filter;
      });
    });
    
  }
  
  delete(id: number) {
    this.taskService.delete(id).subscribe(() => this.reloadAll());
  }
  
  startTask(startedTask: Task){
    startedTask.status="Started";
    this.taskService.patchTask(startedTask.id, startedTask).subscribe(() => this.reloadAll());
  }
  
  closeTask(closedTask: Task){
    closedTask.status="Closed";
    this.taskService.patchTask(closedTask.id, closedTask).subscribe(() => this.reloadAll());
    
  }
  
  editTask(task: Task) {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {taskEdit : task},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }
  
}