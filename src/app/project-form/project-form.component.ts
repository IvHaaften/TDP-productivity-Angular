import { Component, OnInit, Input } from '@angular/core';
import{ProjectService} from '../project.service';
import {Project} from '../project';
import {ProjectListComponent} from '../project-list/project-list.component';

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
  
  constructor(private projectService: ProjectService) { }

  ngOnInit(){}

  public save() {
    this.projectService.save(this.project).subscribe(
      () => this.projectList.reloadAll()
    );
  }

  clear(){
    this.project.projectName = '';
    this.project.deadline = null;
    }


}
