import { Component, OnInit, Inject, Input} from '@angular/core';
import { Task } from '../task';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Project } from '../project';
import { ProjectService } from '../project.service';

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
  
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>,@Inject(MAT_DIALOG_DATA) public data: TaskModalData, private projectService: ProjectService) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate;
    // this.taskEdit.name = "default_Name"
  }

  ngOnInit(){
    this.reloadAll()
  }

  reloadAll(){
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }

}
