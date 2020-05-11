import { Component, OnInit, Input } from '@angular/core';
import{ProjectService} from '../../project.service';
import {Project} from '../../models/project';
import {ProjectListComponent} from '../project-list/project-list.component';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { ThemeService } from '../../theme.service';
import { ProjectUser } from 'src/app/models/projectuser';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  providers: [ProjectService]
})

export class ProjectFormComponent implements OnInit {
  
  @Input()
  projectList: ProjectListComponent;

  projectUser = new ProjectUser();
  userID:number;

  theme: string;
  
  minDate: Date;
  
  constructor(private projectService: ProjectService, public dialog: MatDialog, private themeService: ThemeService, private loginService:LoginService) {
    const currentDate: Date = new Date; currentDate.getDate();
    this.minDate = currentDate;
  }
  
  ngOnInit(){
    this.userID = this.loginService.globalLoginId; 
    this.projectUser.project = new Project();
    this.projectUser.user = new User();
    this.projectUser.user.id=this.userID;
  }
  
  public save() {
    this.projectService.save(this.projectUser).subscribe(() => this.projectList.reloadAll());

  }
  
  newProject() {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '50%',
      data:{projectEdit: this.projectUser},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result!= null){
      this.projectService.save(result).subscribe(() => this.projectList.reloadAll());
      }
      this.clear();
    })
  }
  clear(){
    this.projectUser.project.projectName = "";
    this.projectUser.project.deadline = null;
    this.projectUser.project.duration = null; 
  }  
}
