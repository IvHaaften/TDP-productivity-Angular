import {Component, OnInit, Input} from '@angular/core';
import{Project} from '../project';
import{ProjectService} from '../project.service';
import { UserListComponent } from '../user-list/user-list.component';
import{ProjectModalComponent} from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { SelectionFormComponent } from '../selection-form/selection-form.component';
import { ThemeService } from '../theme.service';
import{LoginService} from '../login.service';

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
  theme:string;
  
  selectedProjects: Array<Project> = [];
  selectionProjects: Project[]; 
  projectSelected:number;
  
  @Input()
  userIdProject: UserListComponent
  
  @Input()
  projectUpdate:SelectionFormComponent
  
  constructor(private projectService: ProjectService, public dialog: MatDialog,private themeService: ThemeService, private loginService:LoginService) {}
  
  displayedColumns: string[] = ['id', 'projectName', 'deadline', 'actions'];

  printingfunction(input){
    console.log("print method called from the login service with selected project=" + input)
  }
  
  ngOnInit(){
    this.reloadAll();
    this.userIdProject;
    this.loginService.getProject().subscribe(
      something => this.printingfunction(something.projNum)); 
    this.loginService.getProject().subscribe(
         input => this.projectSelected = input.projNum); 
  
  }
  
  reloadAll(){
    this.projectService.findAll().subscribe(projects => this.projects = projects);
    this.projectService.findAll().subscribe(projects => this.projectUpdate.projects = projects);
  }
  
  delete(id: number) {
    this.projectService.delete(id).subscribe(() => this.reloadAll());
  }
  
  editProject(project: Project) {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '50%',
      data: {projectEdit : project},
      panelClass: this.theme,
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

  selectButton(projectNumber: number){

  }
}
