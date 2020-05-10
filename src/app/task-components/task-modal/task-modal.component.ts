import { Component, OnInit, Inject, Input} from '@angular/core';
import { Task } from '../../models/task';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Project } from '../../models/project';
import { ProjectService } from '../../project.service';
import { ProjectUserService } from 'src/app/project-user.service';


export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  
  projects: Project[];
  @Input()
  taskEdit: Task;
  minDate: Date;
  userID : number;
  
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>,@Inject(MAT_DIALOG_DATA) public data: TaskModalData, private projectUserService: ProjectUserService) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate;
    // this.taskEdit.name = "default_Name"
  }
  
  ngOnInit(){
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    this.projects;
    this.reloadAll();
  }
  
  reloadAll(){
    this.projectUserService.findAll().subscribe(projectUsers => {
      let filterP = new Array;
      for(let i=0; i<projectUsers.length; i++){
        if(projectUsers[i].user.id===this.userID){
          filterP.push(projectUsers[i].project);
        }
      }
      this.projects = filterP;});
      
      //this.projectService.findAll().subscribe(projects => this.projects = projects);
    }
    
  }
  