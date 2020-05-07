import { Component, OnInit, Inject, Input} from '@angular/core';
import{Project} from '../../models/project';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ProjectModalData {
  projectEdit: Project;
}

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit{
  
  @Input()
  projectEdit: Project;

  minDate: Date;
  
  constructor(public dialogRef: MatDialogRef<ProjectModalComponent>,@Inject(MAT_DIALOG_DATA) public data: ProjectModalData) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate;
  }

  ngOnInit(){}
}