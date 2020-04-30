import {Component, OnInit, Input} from '@angular/core';
import{Project} from '../project';
import{ProjectService} from '../project.service';

import { UserListComponent } from '../user-list/user-list.component';

import{ProjectModalComponent} from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';


export interface ProjectModalData {
  projectEdit: Project;
}


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})


export class ProjectListComponent implements OnInit {
  
  projects: Project[];

  selectedProjects: Array<Project> = [];


  @Input()
  userIdProject: UserListComponent
  
  constructor(private projectService: ProjectService, public dialog: MatDialog) {
   }

  
  displayedColumns: string[] = ['id', 'projectName', 'deadline', 'actions'];
  
  ngOnInit(){
    this.reloadAll();
    
    this.userIdProject;
  }
  
  reloadAll(){
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }
  
  delete(id: number) {
    this.projectService.delete(id).subscribe(() => this.reloadAll());
  }
  
  
  editProject(project: Project) {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '50%',
      data: {projectEdit : project}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.projectService.patchProject(result.id, result).subscribe(() => this.reloadAll());
    })
  }

  selectProjects(IdProject){
    this.selectedProjects = [];
      
    for (let index = 0; index < this.projects.length; index++){
      if (this.projects[index].id == IdProject){
          
        this.selectedProjects.push(this.projects[index]);
      }

    }
  }


}
  