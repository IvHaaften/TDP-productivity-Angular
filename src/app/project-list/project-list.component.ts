import {Component, OnInit} from '@angular/core';
import{Project} from '../project';
import{ProjectService} from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(){
    this.reloadAll();
  }

  reloadAll(){
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }

  delete(id) {
    this.projectService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }

}
