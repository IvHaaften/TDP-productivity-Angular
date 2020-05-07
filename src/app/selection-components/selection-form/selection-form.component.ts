import { Component, OnInit,Input } from '@angular/core';
import{Selection} from '../../selection';
import {SelectionListComponent} from '../selection-list/selection-list.component';
import {Task} from '../../task'
import { TaskService } from '../../task.service';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';
import {LoginService} from '../../login.service'

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css'],
  providers: [TaskService]
})
export class SelectionFormComponent implements OnInit {

  @Input()
  list:SelectionListComponent

  projectNumber: number;
  timeWindow: number;

  projects: Project[];
  tasks: Task[];

  important: Task[];

  availableProject: number;

  constructor(private projectService: ProjectService, private taskService:TaskService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.projects
    this.projectNumber
    this.timeWindow
    this.reloadAll()
    this.priority()
    this.availableProject = this.loginService.globalLoginId;
  }

  reloadAll(){
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }

  priority(){
    this.taskService.findAll().subscribe(tasks => {
      this.important = tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
      this.important = this.important.slice(0,2);
    });
  }

  clear(){
    this.list.selectedProjectID = this.projectNumber;
    this.list.selectedTimeWindow = this.timeWindow;
    this.projectNumber = 0;
    this.timeWindow = null;
    this.list.reloadAll();
    }

    delete(){
      this.list.selectedProjectID = 0;
      this.list.selectedTimeWindow = 0;
      this.list.reloadAll();
    }
}
