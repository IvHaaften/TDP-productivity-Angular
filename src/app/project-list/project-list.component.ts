import {Component, OnInit, Inject, Input} from '@angular/core';
import{Project} from '../project';
import{ProjectService} from '../project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { UserListComponent } from '../user-list/user-list.component';


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


  @Input()
  userIdProject: UserListComponent
  
  constructor(private projectService: ProjectService, public dialog: MatDialog) {
   }

  
  
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
    const dialogRef = this.dialog.open(ProjectEditModal, {
      width: '50%',
      data: {projectEdit : project}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.projectService.patchProject(result.id, result).subscribe(() => this.reloadAll());
    })
  }
}


@Component({
  selector: 'project-edit-modal',
  templateUrl: 'project-edit-modal.html',
})
export class ProjectEditModal /* implements OnInit */ {

  @Input()
  projectEdit: Project;
  
  constructor(
    public dialogRef: MatDialogRef<ProjectEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModalData) {}
    
  }
  
  