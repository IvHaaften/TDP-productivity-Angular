import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import{Project} from '../../models/project';
import{ProjectService} from '../../project.service';

import { UserListComponent } from '../../user-components/user-list/user-list.component';

import{ProjectModalComponent} from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { SelectionFormComponent } from '../../selection-components/selection-form/selection-form.component';
import { ThemeService } from '../../theme.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login.service';
import { ProjectUser } from 'src/app/models/projectuser';
import { ProjectUserService } from 'src/app/project-user.service';

export interface ProjectModalData {
  projectEdit: Project;
}


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})


export class ProjectListComponent implements OnInit, AfterContentInit {
  
  projects: Project[];
  theme:string;
  
  //selectedProjects: Array<Project> = [];
  //projectSelected: Observable<any>;
  
  userID : number;
  
  /* @Input()
  userIdProject: UserListComponent */
  
  @Input()
  projectUpdate:SelectionFormComponent
  
  constructor(private projectService: ProjectService, public dialog: MatDialog,private themeService: ThemeService, private projectUserService : ProjectUserService) {
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }
  
  displayedColumns: string[] = ['id', 'projectName', 'deadline', 'actions'];
  
  ngOnInit(){
    this.projects;
    this.projectUpdate;
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    this.reloadAll();
    //this.selectProjects(this.userID)
    // this.loginService.getProject().subscribe(
    //     input => {
    //       this.reloadAll();
    //       this.selectProjects(input.projNum);}) 
  }
  
  ngAfterContentInit(){
    this.reloadAll();
    //this.selectProjects(this.userID)
  }
  
  reloadAll(){
    this.projectService.findAll().subscribe(projects => {
      this.projects=projects;
      let filter = new Array;
      for (let indexp = 0; indexp < this.projects.length; indexp++){ 
        for (let indexu =0; indexu < this.projects[indexp].users.length; indexu++){
          if (this.projects[indexp].users[indexu].user.id === this.userID){
            filter.push(this.projects[indexp]);
          }
        }
      }
      this.projects = filter;
      //this.projectUpdate.projects = filter
    });
    //this.projectService.findAll().subscribe(projects => this.projects = projects);
    //this.projectService.findAll().subscribe(projects => this.projectUpdate.projects = projects);
  }
  
  delete(id: number) {
    this.projectService.delete(id).subscribe(() => this.reloadAll());
  }
  
  
  editProject(project: Project) {
    this.theme = this.themeService.currentActive();
    this.projectUserService.findAll().subscribe(projectUsers => {
      let projectUser = projectUsers.find(projectUser=> projectUser.project.id===project.id && projectUser.user.id === this.userID)
      const dialogRef = this.dialog.open(ProjectModalComponent, {
        width: '50%',
        data: {projectEdit : projectUser},
        panelClass: this.theme,
      });
      
      dialogRef.afterClosed().subscribe(result=>{
        if(result!= null){
        console.log(result);
        console.log(result.project);
        this.projectService.patchProject(result.project.id, result.project).subscribe(() => this.reloadAll());
      }
      })
    });
  }
  
  /*  selectProjects(IdProject){
    this.selectedProjects = [];
    
    for (let index = 0; index < this.projects.length; index++){
      if (this.projects[index].id == IdProject){
        
        this.selectedProjects.push(this.projects[index]);
      }
    }
  } */
  
  /* printingfunction(input){
    console.log("print method called from the login service with selected project=" + input)
  } */
  
  
}
