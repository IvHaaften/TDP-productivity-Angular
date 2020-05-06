import { Component, OnInit, Input } from '@angular/core';
import{ProjectService} from '../project.service';
import {Project} from '../project';
import {ProjectListComponent} from '../project-list/project-list.component';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  providers: [ProjectService]
})

export class ProjectFormComponent implements OnInit {
  
  @Input()
  projectList: ProjectListComponent;

 
  
  project = new Project();
  theme: string;
  
  minDate: Date;
  
  constructor(private projectService: ProjectService, public dialog: MatDialog, private themeService: ThemeService) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate;
  }
  
  ngOnInit(){}
  
  public save() {
    this.projectService.save(this.project).subscribe(() => this.projectList.reloadAll());

  
  }
  
  newProject() {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '50%',
      data:{projectEdit: this.project},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.projectService.save(result).subscribe(() => this.projectList.reloadAll());
      this.clear();
    })
  }
  clear(){
    this.project.projectName = "";
    this.project.deadline = null;
    this.project.duration = null; 
  }  
}
