import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import{Project} from '../../models/project';
import{ProjectService} from '../../project.service';
import{ProjectModalComponent} from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { SelectionFormComponent } from '../../selection-components/selection-form/selection-form.component';
import { ThemeService } from '../../theme.service';
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
  userID : number;
  
  @Input()
  projectUpdate:SelectionFormComponent
  
  constructor(private projectService: ProjectService, public dialog: MatDialog,private themeService: ThemeService, private projectUserService : ProjectUserService) {
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }
  
  displayedColumns: string[] = ['projectName', 'deadline', 'actions'];
  
  ngOnInit(){
    this.projects;
    this.projectUpdate;
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    this.reloadAll();
  }
  
  ngAfterContentInit(){
    this.reloadAll();
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
    });
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
        if(result!= null && result!=projectUser){
          console.log("Triggered afterclose");
          this.projectService.patchProject(result.project.id, result.project).subscribe(() => this.reloadAll());
        }
      })
    });
  }
}
