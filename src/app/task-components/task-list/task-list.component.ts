import {Component, OnInit, AfterContentInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../task.service';
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
  tempTasks:  Array<Task> = [];
  tempTask: Task;
  temp:number;
  duration:number;
  displayedColumns: string[] = ['name', 'project.projectName','duration','description','status', 'actions'];
  
  constructor(private taskService: TaskService, public dialog: MatDialog, private themeService: ThemeService, private projectUserService : ProjectUserService) {
    this.reloadAll();    
    this.duration =0;
    this.temp = 0;
  }
  
  ngOnInit() {
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    this.projectIDs;
    this.tasks;
    this.tempTasks;
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
        this.durationCalc(this.tasks);
        console.log("the total duration of all the tasks= " + this.duration)
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
      if(result!= null){
        this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
      }
    })
  }
  
  durationCalc(selectedTasks:Array<Task>){
    this.tempTasks = this.tasks.filter(task => task.status === "New");
    this.tempTasks = this.tempTasks.filter(task => task.status === "Started");
    selectedTasks.forEach(element => {
      this.temp += element.duration
    });
    
    this.duration = this.temp;
    this.temp =0;
  }
}