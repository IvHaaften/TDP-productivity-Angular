import {Component, OnInit} from '@angular/core';
import{Project} from '../project';
import{ProjectService} from '../project.service';
import{ProjectModalComponent} from '../project-modal/project-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {
  
  projects: Project[];
  
  constructor(private projectService: ProjectService, public dialog: MatDialog) { }
  
  displayedColumns: string[] = ['id', 'projectName', 'deadline', 'actions'];
  
  ngOnInit(){
    this.reloadAll();
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
}
  